import { useEffect } from "react";
import { publicUrl } from "~/lib/assets";
import type { Volume } from "~/data/catalog";

type OpenAnimationProps = {
  volume: Volume;
  onDone: () => void;
};

const DURATION_MS = 1150;

export function OpenAnimation({ volume, onDone }: OpenAnimationProps) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(onDone, reduced ? 0 : DURATION_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDone]);

  return (
    <div
      className="open-overlay"
      role="dialog"
      aria-label={`Opening ${volume.title}`}
      onClick={onDone}
    >
      <div className="open-book">
        <span className="cover-book cover-book--open">
          <span className="cover-spine" aria-hidden="true" />
          <span className="cover-stack">
            <img className="cover-face" src={publicUrl(volume.cover)} alt="" />
          </span>
          <span className="cover-block" aria-hidden="true" />
        </span>
      </div>
      <div className="open-shine" />
      <p className="pointer-events-none absolute bottom-8 text-xs tracking-widest text-[#b8a890]">
        tap to skip
      </p>
    </div>
  );
}
