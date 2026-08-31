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
        <img src={publicUrl(volume.cover)} alt="" />
      </div>
      <div className="open-shine" />
      <p className="pointer-events-none absolute bottom-8 text-xs tracking-widest text-[#b8a890]">
        tap to skip
      </p>
    </div>
  );
}
