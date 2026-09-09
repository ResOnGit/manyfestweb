# HOW 2 ADD VOLUMES / PAGES

The shelf and reader already follow `app/data/catalog.ts`. You do **not** add a new route.

1. Put files in `public/comics/{id}/` — a cover (`cover.png`, whatever you point at) and pages named `001.png`, `002.png`, …
2. Copy-paste a `volumes` entry in `app/data/catalog.ts`. `id` is the URL (`/manyfestweb/read/vol4`).
3. Rebuild (`npm run build` on the EliteBook, or `npm run dev` while drawing).

The reader is just `<img>` tags. PNG, JPEG, WebP, SVG all work if the catalog path matches the filename.

| you want | set this |
| --- | --- |
| readable book (png, Procreate default) | `status: "available"` and `pages: pageRange("vol4", 1, 80)` |
| same, but svg/jpg | `pageRange("vol4", 1, 80, "svg")` or `"jpg"` |
| mixed last pages | `[...pageRange("vol1", 1, 3, "svg"), "comics/vol1/004.jpeg"]` |
| shelf teaser | `status: "wip"` and `pages: []` (reader sends people home) |

Cover, title, tagline, and `direction` (`ltr` / `rtl`) stay written by hand. `pageRange` only builds the numbered page paths so you are not listing `001.png` eighty times.


---