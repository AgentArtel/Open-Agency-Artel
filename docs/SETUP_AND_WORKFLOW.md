# Setup and workflow

This doc covers manual sync, **automated sync** (Lovable → here: on push to Agent-Artel-studio + daily schedule), and how to make edits here that stay in sync with Lovable.

## Baseline: what we're developing

The **project vision and roadmap** define what we're building here. Read [Project_Vision.md](Project_Vision.md) for the full picture (product goals, phases, and technical orientation).

- **Open Agent Artel** — the product/UI we're building.
- The **frontend** is created and deployed via [Lovable](https://lovable.dev). Its code is kept in this repo in the `lovable-frontend/` folder so we can:
  - Review and develop it here.
  - Keep it in sync with the repo Lovable uses for deployment ("the other repo").

## Two repos

1. **This repo (Open-Agency-Artel)** — Contains docs, plans, design system, and the folder that holds the Lovable app source.
2. **The Lovable frontend repo** — The other repo (e.g. on GitHub) that Lovable deploys from. We develop here and sync with that repo; deployment is driven from there.

## Adding the Lovable frontend (when you have the URL)

From the **root** of this repo, run:

```bash
git submodule add <LOVABLE_FRONTEND_REPO_URL> lovable-frontend
git submodule update --init --recursive
```

Then commit the new `.gitmodules` file and the `lovable-frontend` entry:

```bash
git add .gitmodules lovable-frontend
git commit -m "Add lovable-frontend as submodule"
```

## Keeping things in sync

### Pull latest from the deployed source

When the Lovable app changes (in Lovable or in the other repo), update this repo:

```bash
cd lovable-frontend
git pull origin main
cd ..
git add lovable-frontend
git commit -m "Update lovable-frontend to latest"
```

### Make changes here and push to the other repo

1. Edit files inside `lovable-frontend/`.
2. Commit and push from the submodule:
   ```bash
   cd lovable-frontend
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
3. Record the new submodule commit in this repo:
   ```bash
   cd ..
   git add lovable-frontend
   git commit -m "Bump lovable-frontend"
   ```

## Automated sync (Lovable → here)

Two mechanisms keep the `lovable-frontend` submodule in this repo updated when Agent-Artel-studio (Lovable’s repo) changes:

1. **Sync on push to Agent-Artel-studio** — When anyone (Lovable, you, or an agent) pushes to `main` on [Agent-Artel-studio](https://github.com/AgentArtel/Agent-Artel-studio), a workflow there triggers Open-Agency-Artel to run the sync. This repo then updates the submodule to the latest `main` and commits + pushes. **Requires one-time setup** below.
2. **Daily schedule** — A workflow in this repo runs every day at **8:00 AM UTC** and does the same sync. Use this as a fallback if the trigger isn’t set up or fails.

### One-time setup for “sync on push”

For the real-time trigger to work:

1. **Push the trigger workflow to Agent-Artel-studio**  
   The file `lovable-frontend/.github/workflows/trigger-parent-sync.yml` in this repo must exist in the Agent-Artel-studio repo. From this repo:
   ```bash
   cd lovable-frontend
   git add .github/workflows/trigger-parent-sync.yml
   git commit -m "chore: add workflow to trigger Open-Agency-Artel sync on push"
   git push origin main
   cd ..
   git add lovable-frontend
   git commit -m "chore: add trigger workflow to lovable-frontend"
   git push
   ```

2. **Add a secret in the Agent-Artel-studio repo**  
   In GitHub: **Agent-Artel-studio** → Settings → Secrets and variables → Actions → New repository secret:
   - **Name:** `OPEN_AGENCY_ARTEL_DISPATCH_TOKEN`
   - **Value:** A [Personal Access Token (classic)](https://github.com/settings/tokens) with `repo` scope (or “workflow” if you use fine-grained tokens), that has access to **Open-Agency-Artel**. It is used only to call the `repository_dispatch` API so Open-Agency-Artel runs the sync workflow.

After this, every push to `main` on Agent-Artel-studio will trigger a sync in Open-Agency-Artel within a short delay.

## Reference package sync (this repo → Lovable)

**What `reference-app/` is:** The canonical Agent Artel reference UI: 8 pages, 150+ components, and a full n8n-style workflow editor. Kimi Agent (or you) develops components here; this repo is the source of truth.

**How to push updates to Lovable:** From the **root** of Open-Agency-Artel, run:

```bash
./scripts/sync-reference-to-lovable.sh
```

The script:

1. Copies `reference-app/` into `lovable-frontend/reference-app/` (excluding `node_modules/`, `dist/`, `.env*`, `package-lock.json`).
2. In the submodule: stages, commits with a timestamped message, and pushes to `origin main`.
3. In the parent repo: stages the updated submodule ref and commits. You then push the parent repo when ready: `git push origin main`.

**What Lovable should do with `reference-app/`:** In Agent-Artel-studio they get a runnable prototype. They should run it with `npm install && npm run dev` inside `reference-app/`, then integrate by importing components/pages into their main app (path alias or copy into `src/`) and wiring to their backend/routes. They should not rebuild the canvas and shell from scratch.

### Changing the schedule

The daily run is defined in this repo in `.github/workflows/sync-lovable-frontend.yml` under `schedule`. Default is `0 8 * * *` (8 AM UTC). Edit the cron expression there if you want a different time.

## Design system

When changing the frontend or adding UI, follow **reference-app/AGENT_STORM_PLAN.md** for colors, typography, and components.
