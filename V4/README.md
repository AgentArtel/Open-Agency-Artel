# V4 — Review inbox

**Drop the latest Kimi Agent delivery (V4) here.** This folder is for review before we merge into the canonical reference app.

## Purpose

- **Compare** what’s in V4 with **reference-app/** (the current canonical app, built from V3).
- **Expand, don’t replace:** merge new and updated files from V4 into **reference-app/** so we keep all existing work and add on top of it. We should not overwrite or discard progress.
- After merging, **reference-app/** stays the single source of truth and can be synced to Lovable via `scripts/sync-reference-to-lovable.sh`.

## What to drop here

Put the full V4 export from Kimi in this folder — e.g. an `app/` directory (with `src/`, `package.json`, configs, etc.) and any design or plan docs (e.g. `AGENT_STORM_PLAN.md` or similar). Keep the same structure Kimi gave you so paths are easy to compare.

## Workflow

1. **Drop** the V4 contents into `V4/`.
2. **Review** — diff or compare `V4/` vs `reference-app/` (new files, changed components, updated design doc).
3. **Merge** — copy or merge new/changed files from V4 into `reference-app/`, resolving any conflicts so we keep both old and new work where it makes sense.
4. **Sync** (optional) — run `./scripts/sync-reference-to-lovable.sh` from the repo root to push the updated reference app to Lovable.

Once V4 is merged into **reference-app/**, you can clear or archive this folder; the canonical code lives in **reference-app/**.
