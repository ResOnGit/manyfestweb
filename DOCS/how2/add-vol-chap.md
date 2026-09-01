# HOW 2 ADD VOLUMES / PAGES

The shelf and reader already follow `app/data/catalog.ts`. You do **not** add a new route.

1. Put files in `public/comics/{id}/` — a cover (`cover.svg`, `cover1.png`, whatever you point at) and pages named `001.svg`, `002.svg`, …
2. Copy-paste a `volumes` entry in `app/data/catalog.ts`. `id` is the URL (`/manyfestweb/read/vol4`).
3. Rebuild (`npm run build` on the EliteBook, or `npm run dev` while drawing).

| you want | set this |
| --- | --- |
| readable book | `status: "available"` and `pages: pageRange("vol4", 1, 80)` |
| shelf teaser | `status: "wip"` and `pages: []` (reader sends people home) |

Cover, title, tagline, and `direction` (`ltr` / `rtl`) stay written by hand. `pageRange` only builds the numbered page paths so you are not listing `001.svg` eighty times.

---

This is a tiny static comic site (MNFST! / manyfest). It is **not** a typical Docker service. There is no database, no compose stack, no env secrets, and no API backend. Docker here is just a box around a Node process that serves the built site.

Two things that will surprise you if you treat it like “any other app”:

- It is a **SPA**. `react-router.config.ts` has `ssr: false`. Production does not render pages on the server.
- It does **not** live at `/`. Vite `base` and React Router `basename` are both `/manyfestweb/`. Open that path or you will think it is broken.

So “deploy” means: build the site, then either run Node (`react-router-serve`), wrap that in Docker, or copy `build/client` to a static file server (Caddy is already sketched in this repo).

Need **Node 24** (what the Dockerfile uses) or Docker. `npm` is the package manager.

---

## Node (`npm`)

From the repo root:

```bash
npm ci
npm run build
npm run start
```

Then open:

```text
http://localhost:3000/manyfestweb/
```

`npm run start` runs `react-router-serve ./build/server/index.js`. That is a small Node server that serves the SPA from `build/`. It is **not** the Vite dev server.

| env | default | what it does |
| --- | --- | --- |
| `PORT` | `3000` | listen port |

Example:

```bash
PORT=8080 npm run start
```

**Dev is not deploy.** `npm run dev` (optionally `-- --host`) is Vite on port **5173**. Use that while coding. Do not use it as production.

---

## Docker

The `Dockerfile` is a multi-stage React Router template:

1. install all deps
2. `npm run build`
3. install production deps only
4. copy `build/` + prod `node_modules`
5. `CMD ["npm", "run", "start"]`

Same process as the Node path above, just inside `node:24-alpine`.

```bash
docker build -t manyfestweb .
docker run --rm -p 3000:3000 manyfestweb
```

Then:

```text
http://localhost:3000/manyfestweb/
```

Map a different host port if you want (`-p 8080:3000`). The process inside the container still listens on 3000 unless you pass `PORT`:

```bash
docker run --rm -p 8080:8080 -e PORT=8080 manyfestweb
```

There is no `docker-compose.yml` and nothing to “link.” One image, one container, one port.

---

## Static files (Caddy)

Because this is a SPA, you do not *need* Node in production. `npm run build` writes the site into `build/client` (`index.html`, assets, comics from `public/`). Serve that folder at `/manyfestweb/`.

This repo already has a snippet at `deploy/Caddyfile` for the EliteBook:

```caddy
handle_path /manyfestweb/* {
	root * /home/farez/manyfestweb/build/client
	encode gzip
	try_files {path} /index.html
	file_server
}
```

`try_files` is the SPA fallback so `/manyfestweb/about` and `/manyfestweb/read/...` still hit `index.html`. `handle_path` strips `/manyfestweb` before looking up files, which matches Vite’s `/manyfestweb/` asset URLs.

Workflow:

1. `npm ci && npm run build` on the machine (or build elsewhere and copy `build/client`)
2. Point Caddy `root` at that `build/client` folder
3. Reload Caddy

---

## “It 404s / blank page”

You opened `/` instead of `/manyfestweb/`. The redirect from `/` → `/manyfestweb/` only exists in **dev** (`vite.config.ts`). Production Node/Docker/Caddy will not do that unless you add it yourself.
