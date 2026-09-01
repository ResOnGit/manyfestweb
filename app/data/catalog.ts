/**
 * This file is the comic shelf. Drop art in `public/comics/{id}/`, then add or
 * edit an entry below. No new route. See README: HOW 2 ADD VOLUMES / PAGES.
 */
export type VolumeStatus = "available" | "wip";

export type Volume = {
  id: string;
  title: string;
  tagline: string;
  cover: string;
  status: VolumeStatus;
  /** Manga-style RTL, or LTR for these English placeholders. */
  direction: "ltr" | "rtl";
  pages: string[];
};

/** `pageRange("vol1", 1, 3)` → comics/vol1/001.svg … 003.svg */
function pageRange(
  volId: string,
  from: number,
  to: number,
  ext = "svg",
): string[] {
  const pages: string[] = [];
  for (let n = from; n <= to; n++) {
    pages.push(`comics/${volId}/${String(n).padStart(3, "0")}.${ext}`);
  }
  return pages;
}

export const volumes: Volume[] = [
  {
    id: "vol1",
    title: "Volume 1",
    tagline: "The first stack of stained paper.",
    cover: "comics/vol1/cover.png",
    status: "available",
    direction: "ltr",
    pages: pageRange("vol1", 1, 4),
  },
  {
    id: "vol2",
    title: "Volume 2",
    tagline: "Still yellow. Still a bit of a lie.",
    cover: "comics/vol2/cover.jpg",
    status: "available",
    direction: "ltr",
    pages: pageRange("vol2", 1, 2),
  },
  {
    id: "vol3",
    title: "volume 3",
    tagline: "WIP — the book that isn't a book yet.",
    cover: "comics/vol3/cover.jpeg",
    status: "available",
    direction: "ltr",
    pages: pageRange("vol3", 1, 2),
  },


  //wip volume don't delete, they just get added to the end of the list
  {
    id: "wip",
    title: "new thing new",
    tagline: "WIP — the book that isn't a book yet.",
    cover: "comics/wip/svg.svg",
    status: "wip",
    direction: "ltr",
    pages: [],
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((volume) => volume.id === id);
}
