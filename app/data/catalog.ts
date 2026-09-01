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

/** `pageRange("vol1", 1, 3)` → comics/vol1/001.png … 003.png. Pass a 4th arg for svg/jpg/jpeg/webp. */
function pageRange(
  volId: string,
  from: number,
  to: number,
  ext = "png",
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
    tagline: "Take a deep breath.",
    cover: "comics/vol1/cover.png",
    status: "available",
    direction: "ltr",
    pages: [...pageRange("vol1", 1, 3, "svg"), "comics/vol1/004.jpeg"],
  },
  {
    id: "vol2",
    title: "Volume 2",
    tagline: "Fuck this all i'm running away. NOT A PLACEHOLDER!",
    cover: "comics/vol2/cover.jpg",
    status: "available",
    direction: "ltr",
    pages: pageRange("vol2", 1, 6),
  },
  {
    id: "vol3",
    title: "volume 3",
    tagline: "its a cover",
    cover: "comics/vol3/cover.jpeg",
    status: "available",
    direction: "ltr",
    pages: pageRange("vol3", 1, 2, "svg"),
  },


  //wip volume don't delete, they just get added to the end of the list
  {
    id: "wip",
    title: "Hello world!",
    tagline: "click for funny sounds",
    cover: "comics/wip/svg.svg",
    status: "wip",
    direction: "ltr",
    pages: [],
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((volume) => volume.id === id);
}
