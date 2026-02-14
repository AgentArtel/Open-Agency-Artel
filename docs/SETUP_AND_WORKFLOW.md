# Setup and workflow

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

## Design system

When changing the frontend or adding UI, follow **V003/AGENT_STORM_PLAN.md** for colors, typography, and components.
