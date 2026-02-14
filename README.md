# Open-Agency-Artel

Repository for **Open Agent Artel**: planning, design system, versioned snapshots, and the Lovable-built frontend we review and develop here. The **project vision and roadmap** are the stated baseline for what we're building — see [docs/Project_Vision.md](docs/Project_Vision.md).

## What lives here

- **Design & planning** — Design system, agent storm plans, and versioned snapshots (e.g. V001, V002).
- **Lovable frontend** — The deployed app is built with [Lovable](https://lovable.dev). Its source will live in the `lovable-frontend/` folder so we can develop and review in this repo while the deployed version stays in sync with the Lovable/GitHub source. *(Add the frontend repo when you have the URL; see [Setup & workflow](docs/SETUP_AND_WORKFLOW.md).)*

## Repo structure

| Path | Purpose |
|------|--------|
| `lovable-frontend/` | The Lovable app (added as a Git submodule when the repo URL is available). This is the app we develop and that gets deployed. |
| `V001/`, `V002/`, … | Versioned snapshots or exports (e.g. past builds) for reference. See [docs/VERSION_INDEX.md](docs/VERSION_INDEX.md) for what’s in each version. |
| `V003/` | Current plan and reference implementation: `AGENT_STORM_PLAN.md`, component library app. |
| `inspo_images/` | Reference images. |
| `docs/` | Documentation for setup and workflow. |

## Getting started

1. Clone this repo. If/when `lovable-frontend` is added as a submodule, run:  
   `git submodule update --init --recursive`
2. See [docs/SETUP_AND_WORKFLOW.md](docs/SETUP_AND_WORKFLOW.md) for how to add the Lovable frontend and keep it in sync.
3. Design system and UI rules: see `V003/AGENT_STORM_PLAN.md`.
