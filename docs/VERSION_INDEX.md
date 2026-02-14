# Version index

This document describes the **reference package** in this repo. V001 and V002 were build-only snapshots and have been removed. The single canonical reference is **reference-app/**.

---

## reference-app

**Purpose:** Canonical Agent Artel reference UI: design system, agent assignments, and the full component library / app (dashboard, workflow list, execution history, credentials, settings, agent library, workflow editor with canvas, nodes, and builder UI).

**Format:** Markdown doc + full Vite/React/TypeScript app source.

**Location:** `reference-app/` at the repo root.

**Contents:**

### Document (reference-app root)

| File | Description |
|------|--------------|
| `AGENT_STORM_PLAN.md` | Design system (colors, typography, effects, animation) and agent assignments (dashboard, workflow list, execution, credentials, canvas, etc.). Canonical design reference. |
| `README.md` | How to run the app and how Lovable should integrate it (do not rebuild from scratch). |

### App config (reference-app root)

| File | Description |
|------|--------------|
| `vite.config.ts` | Vite config. |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | TypeScript config. |
| `tailwind.config.js` | Tailwind CSS. |
| `postcss.config.js` | PostCSS. |
| `eslint.config.js` | ESLint. |
| `components.json` | Component tooling (e.g. shadcn). |
| `package.json` | Dependencies (run `npm install && npm run dev`). |
| `index.html` | App entry HTML. |

### Pages

`reference-app/src/pages/`

| File | Description |
|------|--------------|
| `index.ts` | Page exports. |
| `Dashboard.tsx` | Dashboard & analytics. |
| `WorkflowList.tsx` | Workflow list & management. |
| `WorkflowEditorPage.tsx` | Workflow editor (canvas). |
| `ExecutionHistory.tsx` | Execution history & detail. |
| `Credentials.tsx` | Credentials manager. |
| `Settings.tsx` | Settings. |
| `AgentLibrary.tsx` | Agent template library. |
| `ShowcasePage.tsx` | Showcase. |

### Components

- **`reference-app/src/components/ui/`** — Shadcn-style primitives (50+).
- **`reference-app/src/components/ui-custom/`** — Custom design-system components.
- **`reference-app/src/components/workflow/`** — WorkflowCard, WorkflowFilters, SearchBar.
- **`reference-app/src/components/dashboard/`** — StatCard, ActivityFeed, WorkflowPreview, ExecutionChart.
- **`reference-app/src/components/credentials/`** — CredentialCard, CredentialModal.
- **`reference-app/src/components/canvas/`** — Canvas, CanvasNode, ConnectionLine, GridBackground, MiniMap, NodeSearchPalette, SelectionBox, ZoomControls, AlignmentGuides.
- **`reference-app/src/components/nodes/`** — AIAgentNode, CodeNode, HTTPRequestNode, MemoryNode, NodeCard, OpenAIChatNode, TriggerNode, WebhookNode.
- **`reference-app/src/components/execution/`**, **forms/**, **onboarding/**, **templates/** — Supporting components.
- Root-level components: BottomToolbar, ChatPanel, CodeEditor, CommandPalette, ConfigPanel, Header, LogsPanel, etc.

### Sync to Lovable

Updates to `reference-app/` are synced into the Lovable frontend repo (Agent-Artel-studio) via `scripts/sync-reference-to-lovable.sh`. See [SETUP_AND_WORKFLOW.md](SETUP_AND_WORKFLOW.md#reference-package-sync-this-repo---lovable).

---

## Other (not a version)

**`inspo_images/`** — Folder for reference/inspiration images. Not a versioned snapshot; may be empty or untracked.

---

*When you change the reference-app structure or add new top-level folders, update this index.*
