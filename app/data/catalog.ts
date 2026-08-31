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

export const volumes: Volume[] = [
  {
    id: "vol1",
    title: "Volume 1",
    tagline: "The first stack of stained paper.",
    cover: "comics/vol1/cover1.png",
    status: "available",
    direction: "ltr",
    pages: [
      "comics/vol1/001.svg",
      "comics/vol1/002.svg",
      "comics/vol1/003.svg",
    ],
  },
  {
    id: "vol2",
    title: "Volume 2",
    tagline: "Still yellow. Still a bit of a lie.",
    cover: "comics/vol2/cover.svg",
    status: "available",
    direction: "ltr",
    pages: ["comics/vol2/001.svg", "comics/vol2/002.svg"],
  },
  {
    id: "vol3",
    title: "???",
    tagline: "WIP — the book that isn't a book yet.",
    cover: "comics/vol3/cover.svg",
    status: "wip",
    direction: "ltr",
    pages: [],
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((volume) => volume.id === id);
}
