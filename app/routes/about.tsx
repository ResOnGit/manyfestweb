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
        I did this because I wanted to. <br />
        This is the public comic shelf. <br />
        I'm too lazy to upload to webtoon.com, <br />
        so I'm just gonna leave it here.
      </p>
      <p className="text-sm text-[#8a7a68]">
        (p.s i have no idea what i'm doing) <br /> (that's the entire point of this project tho...)
      </p>
      <section className="flex flex-col gap-2">
  <p className="text-xs tracking-[0.35em] text-[#b8a890]">credits</p>
  <p className="text-sm text-[#8a7a68]">
    Reader UI uses react-comic-viewer (MIT)
    <br />
    Copyright (c) 2026 piro0919
    <br />
    <a
      href="https://github.com/piro0919/react-comic-viewer"
      target="_blank"
      rel="noreferrer"
      className="text-amber-200/80 underline-offset-4 hover:underline"
    >
      github.com/piro0919/react-comic-viewer
    </a>
  </p>
</section>
      <Link to="/" className="text-sm text-amber-200/80 hover:underline">
        ← back to the shelf
      </Link>
    </main>
  );
}
