/** Site flags that are safe to flip without touching routes. */
export const SITE = {
  name: "MNFST!",
  aka: "manyfest",
  tagline: "a webcomic shelf. mostly paper for now.",
  /** Keep search engines out until Farez says go. */
  noindex: true,
} as const;
