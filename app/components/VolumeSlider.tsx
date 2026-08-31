import { useEffect, useRef, useState, type PointerEvent } from "react";
import { publicUrl } from "~/lib/assets";
import type { Volume } from "~/data/catalog";

type VolumeSliderProps = {
  volumes: Volume[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onOpen: (volume: Volume) => void;
  continuePage?: number;
};

function wrap(index: number, length: number): number {
  return ((index % length) + length) % length;
}

function shortestStep(from: number, to: number, length: number): number {
  let step = to - from;
  const half = Math.floor(length / 2);
  if (step > half) step -= length;
  if (step < -half) step += length;
  return step;
}

export function VolumeSlider({
  volumes,
  selectedIndex,
  onSelect,
  onOpen,
  continuePage,
}: VolumeSliderProps) {
  const n = volumes.length;
  const copies = [...volumes, ...volumes, ...volumes];
  const [trackIndex, setTrackIndex] = useState(n);
  const [animate, setAnimate] = useState(false);
  const trackIndexRef = useRef(trackIndex);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  trackIndexRef.current = trackIndex;

  const selected = volumes[selectedIndex];

  useEffect(() => {
    const logical = wrap(trackIndexRef.current, n);
    if (logical === selectedIndex) return;
    const step = shortestStep(logical, selectedIndex, n);
    setAnimate(true);
    setTrackIndex((index) => index + step);
  }, [selectedIndex, n]);

  function finishSlide() {
    const current = trackIndexRef.current;
    if (current >= n && current < n * 2) return;
    setAnimate(false);
    setTrackIndex(wrap(current, n) + n);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    didSwipe.current = false;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return;
    didSwipe.current = true;
    onSelect(wrap(selectedIndex + (dx < 0 ? 1 : -1), n));
  }

  return (
    <section className="cover-stage flex w-full max-w-3xl flex-col items-center gap-3">
      <div
        className="cover-viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <div
          className="cover-track"
          data-animate={animate ? "true" : "false"}
          style={{
            transform: `translateX(calc(-1 * ${trackIndex} * (var(--cover-w) + var(--cover-gap))))`,
          }}
          onTransitionEnd={(event) => {
            if (event.propertyName !== "transform") return;
            finishSlide();
          }}
        >
          {copies.map((volume, index) => {
            const src = publicUrl(volume.cover);
            const isActive = index === trackIndex;
            return (
              <button
                key={`${volume.id}-${index}`}
                type="button"
                className="cover-card bg-transparent p-0 text-left"
                data-active={isActive}
                data-wip={volume.status === "wip"}
                aria-label={
                  isActive
                    ? volume.status === "wip"
                      ? `${volume.title}, work in progress`
                      : `Open ${volume.title}`
                    : `Select ${volume.title}`
                }
                onClick={() => {
                  if (didSwipe.current) return;
                  if (isActive) onOpen(volume);
                  else onSelect(wrap(index, n));
                }}
              >
                <img className="cover-face" src={src} alt="" />
                <img
                  className="cover-reflection"
                  src={src}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded border border-[#3a3028] px-3 py-1 text-sm text-[#b8a890] hover:border-[#e8dcc8] hover:text-[#e8dcc8]"
          aria-label="Previous volume"
          onClick={() => onSelect(wrap(selectedIndex - 1, n))}
        >
          ←
        </button>
        <div key={selected.id} className="cover-caption min-w-[12rem] text-center">
          <p className="font-display text-xl">{selected.title}</p>
          <p className="mt-1 text-sm text-[#b8a890]">{selected.tagline}</p>
          {selected.status === "available" && continuePage != null && continuePage > 0 ? (
            <p className="mt-2 text-xs tracking-wide text-amber-200/80">
              bookmark · page {continuePage + 1}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="rounded border border-[#3a3028] px-3 py-1 text-sm text-[#b8a890] hover:border-[#e8dcc8] hover:text-[#e8dcc8]"
          aria-label="Next volume"
          onClick={() => onSelect(wrap(selectedIndex + 1, n))}
        >
          →
        </button>
      </div>
    </section>
  );
}
