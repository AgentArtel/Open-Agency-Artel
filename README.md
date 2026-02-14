# Open-Agency-Artel

Repository for **Open Agent Artel**: planning, design system, versioned snapshots, and the Lovable-built frontend we review and develop here. The **project vision and roadmap** are the stated baseline for what we're building — see [docs/Project_Vision.md](docs/Project_Vision.md).

## What lives here

- **Design & planning** — Design system, agent storm plans, and the canonical reference app in `reference-app/`.
- **Lovable frontend** — The deployed app is built with [Lovable](https://lovable.dev). Its source is in the `lovable-frontend/` submodule (Agent-Artel-studio). We develop and review here; **automated sync** keeps this repo updated when Lovable or an agent pushes to Agent-Artel-studio (sync on push + daily schedule). See [Setup & workflow](docs/SETUP_AND_WORKFLOW.md).

## Repo structure

| Path | Purpose |
|------|--------|
| `lovable-frontend/` | The Lovable app (Git submodule → [Agent-Artel-studio](https://github.com/AgentArtel/Agent-Artel-studio)). Develop here; automated sync keeps it updated when changes are pushed there. |
| `reference-app/` | Canonical reference UI: canvas prototype, components, design system. Synced to Lovable via script. See [docs/VERSION_INDEX.md](docs/VERSION_INDEX.md). |
| `.github/workflows/` | Automation: syncs `lovable-frontend` from Agent-Artel-studio on push (trigger) and daily at 8 AM UTC. |
| `inspo_images/` | Reference images. |
| `docs/` | Documentation for setup, workflow, and automated sync. |

## Getting started

1. Clone this repo, then init the submodule:  
   `git submodule update --init --recursive`
2. See [docs/SETUP_AND_WORKFLOW.md](docs/SETUP_AND_WORKFLOW.md) for working in `lovable-frontend`, manual sync, and **automated sync** (on push to Agent-Artel-studio + daily schedule; one-time setup for the trigger is in that doc).
3. Design system and UI rules: see `reference-app/AGENT_STORM_PLAN.md`.
