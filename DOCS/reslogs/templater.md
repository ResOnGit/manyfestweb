# Session diary prompt

Paste the block below into Cursor when you want a recap of the session. Diary files land in `maybelogs/`. They are for Res, not a public changelog.

---

Write a personal diary entry for this Cursor session under `maybelogs/`.

**File:** `maybelogs/YYYY-MM-DD.md` using today's date from this conversation. If that file already exists, append a new section (include the time).

**Do not** edit app code, deps, Docker, Caddy, or the README. Only create or append the diary file.

Use git status / git diff plus this chat to see what actually changed. Skip noise (lockfile churn, generated files, things we only talked about and never did).

Format:

```md
# YYYY-MM-DD

## what have changed

- one short bullet per distinct change, commit-message energy: what and why, not a file list
- informal. this is a diary, not a PR
```

If this is an extra session on the same day, use:

```md
## what have changed (HH:MM)

- …
```
