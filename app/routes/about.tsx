import { Link } from "react-router";
import { SITE } from "~/config";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: `${SITE.name} — about` }];
}

export default function About() {
  return (
    <main className="shelf-shell mx-auto flex max-w-lg flex-col gap-6 px-6 py-16">
      <p className="text-xs tracking-[0.35em] text-[#b8a890]">{SITE.aka}</p>
      <h1 className="font-display text-4xl italic">{SITE.name}</h1>
      <p className="leading-relaxed text-[#d8ccb8]">
        I did this because I wanted to. This is the public comic shelf — not the
        lore vault, not a Webtoon, not a career. Pages go here when they exist.
        Until then, enjoy the stained paper.
      </p>
      <p className="text-sm text-[#8a7a68]">
        (placeholder voice. Farez will rewrite this later.)
      </p>
      <Link to="/" className="text-sm text-amber-200/80 hover:underline">
        ← back to the shelf
      </Link>
    </main>
  );
}
