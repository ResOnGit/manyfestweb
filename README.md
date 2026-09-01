# HOW 2 DEPLOY

## Most straightforward (do this)

You do **not** need Docker. The EliteBook already runs Caddy, and this site is static files after a build.

On the machine, from the repo:

```bash
git pull
npm ci
npm run build
```

That writes `build/client`. Caddy already serves that folder at `/manyfestweb/` (see `deploy/Caddyfile`). No `npm start`, no container, no extra process.

Open:

```text
https://<host>/manyfestweb/
```

Need **Node 24** and `npm` on that box. After the first Caddy snippet is in place, later deploys are just those three commands.

---

