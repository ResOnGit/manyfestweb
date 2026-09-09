import { useEffect, useLayoutEffect, useRef } from "react";
import { publicUrl } from "~/lib/assets";
import type { Volume } from "~/data/catalog";

type OpenAnimationProps = {
  volume: Volume;
  onDone: () => void;
};

const DURATION_MS = 680;

export function OpenAnimation({ volume, onDone }: OpenAnimationProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current();
  }

  useLayoutEffect(() => {
    const book = bookRef.current;
    const source = document.querySelector<HTMLElement>(
      ".cover-card[data-active='true'] .cover-book",
    );
    if (!book || !source) return;

    const rect = source.getBoundingClientRect();
    book.style.position = "fixed";
    book.style.left = `${rect.left}px`;
    book.style.top = `${rect.top}px`;
    book.style.width = `${rect.width}px`;
    source.classList.add("cover-book--lifted");

    return () => source.classList.remove("cover-book--lifted");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(finish, reduced ? 0 : DURATION_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className="open-overlay"
      role="dialog"
      aria-label={`Opening ${volume.title}`}
      onClick={finish}
    >
      <div className="open-book" ref={bookRef}>
        <span className="cover-book cover-book--open">
          <span className="cover-spine" aria-hidden="true" />
          <span className="cover-stack">
            <img className="cover-face" src={publicUrl(volume.cover)} alt="" />
          </span>
          <span className="cover-block" aria-hidden="true" />
        </span>
      </div>
      <p className="open-skip pointer-events-none absolute bottom-8 text-xs tracking-widest text-[#b8a890]">
        tap to skip
      </p>
    </div>
  );
}
