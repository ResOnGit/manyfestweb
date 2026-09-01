import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SITE } from "~/config";
import { OpenAnimation } from "~/components/OpenAnimation";
import { VolumeSlider } from "~/components/VolumeSlider";
import { volumes, type Volume } from "~/data/catalog";
import {
  getLastPageIndex,
  hasSeenOpenAnimation,
  markOpenAnimationSeen,
} from "~/lib/progress";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${SITE.name} — shelf` },
    { name: "description", content: SITE.tagline },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [continuePage, setContinuePage] = useState<number | undefined>();
  const [opening, setOpening] = useState<Volume | null>(null);
  const [wipMessage, setWipMessage] = useState(false);
  const selected = volumes[selectedIndex];

  useEffect(() => {
    setContinuePage(getLastPageIndex(selected.id));
  }, [selected.id]);

  useEffect(() => {
    if (opening) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) => wrap(index - 1, volumes.length));
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => wrap(index + 1, volumes.length));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        openVolume(selected);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opening, selected]);

  const finishOpen = useCallback(() => {
    if (!opening) return;
    const id = opening.id;
    setOpening(null);
    navigate(`/read/${id}`);
  }, [navigate, opening]);

  function openVolume(volume: Volume) {
    if (volume.status === "wip") {
      setWipMessage(true);
      window.setTimeout(() => setWipMessage(false), 2200);
      return;
    }

    if (hasSeenOpenAnimation(volume.id)) {
      navigate(`/read/${volume.id}`);
      return;
    }

    markOpenAnimationSeen(volume.id);
    setOpening(volume);
  }

  return (
    <main className="shelf-shell flex flex-col items-center px-4 pb-16 pt-12">
      <header className="mb-10 text-center">
        <p className="text-xs tracking-[0.35em] text-[#b8a890]">{SITE.aka}</p>
        <h1 className="font-display mt-2 text-6xl italic sm:text-7xl">{SITE.name}</h1>
        <p className="mt-3 text-sm text-[#b8a890]">{SITE.tagline}</p>
      </header>

      <VolumeSlider
        volumes={volumes}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        onOpen={openVolume}
        continuePage={continuePage}
      />

      <p className="mt-10 max-w-sm text-center text-xs leading-relaxed text-[#8a7a68]">
        swipe the covers, use the arrows, or keyboard ← →. tap the front
        cover to open it. WIP covers sit on the shelf until they exist.
      </p>

      <Link
        to="/about"
        className="mt-8 text-xs tracking-widest text-[#8a7a68] underline-offset-4 hover:text-[#e8dcc8] hover:underline"
      >
        about
      </Link>

      {opening ? <OpenAnimation volume={opening} onDone={finishOpen} /> : null}

      {wipMessage ? (
        <p className="wip-toast" role="status">
          working on it!
        </p>
      ) : null}
    </main>
  );
}

function wrap(index: number, length: number): number {
  return ((index % length) + length) % length;
}
