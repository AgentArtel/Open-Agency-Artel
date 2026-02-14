# Version index

This document catalogs what each version folder in the repo contains. **Versions** here mean either **deployment snapshots** (built SPAs kept for reference) or the **current plan + reference app** (design system doc and full source). Use this index to see exactly what’s in V001, V002, and V003.

---

## V001

**Purpose:** First deployment snapshot of the Open Agent Artel frontend.  
**Format:** Production build (static SPA).  
**Location:** `V001/Kimi_Agent_Deployment_v1/`

**Contents:**

| File | Description |
|------|--------------|
| `index.html` | Entry HTML; title "Open Agent Artel", loads hashed JS/CSS. |
| `assets/index-DnIlU_sf.js` | Bundled JavaScript. |
| `assets/index-B6mi_m-s.css` | Bundled styles. |

Deployable as-is (e.g. static host).

---

## V002

**Purpose:** Second deployment snapshot (newer build than V001).  
**Format:** Production build (static SPA).  
**Location:** `V002/Kimi_Agent_Deployment_v2/`

**Contents:**

| File | Description |
|------|--------------|
| `index.html` | Entry HTML; loads hashed JS/CSS. |
| `assets/index-iGQEV4fZ.js` | Bundled JavaScript. |
| `assets/index-CQioPmzm.css` | Bundled styles. |

Same structure as V001; different asset hashes indicate a later build.

---

## V003

**Purpose:** Current plan and reference implementation: design system, agent assignments, and the full Agent Artel component library / app (dashboard, workflow list, execution history, credentials, settings, agent library, workflow editor with canvas, nodes, and builder UI).  
**Format:** Markdown doc + full Vite/React/TypeScript app source.  
**Location:** `V003/` (doc at root); app under `V003/Kimi_Agent_Open Agent Artel Component Library/app/`

**Contents:**

### Document (V003 root)

| File | Description |
|------|--------------|
| `AGENT_STORM_PLAN.md` | Design system (colors, typography, effects, animation) and agent assignments (dashboard, workflow list, execution, credentials, canvas, etc.). Canonical design reference. |

### App root config

`V003/Kimi_Agent_Open Agent Artel Component Library/app/`

| File | Description |
|------|--------------|
| `vite.config.ts` | Vite config. |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | TypeScript config. |
| `tailwind.config.js` | Tailwind CSS. |
| `postcss.config.js` | PostCSS. |
| `eslint.config.js` | ESLint. |
| `components.json` | Component tooling (e.g. shadcn). |
| `package.json`, `package-lock.json` | Dependencies. |
| `index.html` | App entry HTML. |
| `README.md` | App readme. |

### Pages

`app/src/pages/`

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

### Components (grouped)

**`app/src/components/ui/`** — Shadcn-style primitives (50):  
`accordion.tsx`, `alert-dialog.tsx`, `alert.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `button-group.tsx`, `button.tsx`, `calendar.tsx`, `card.tsx`, `carousel.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `empty.tsx`, `field.tsx`, `form.tsx`, `hover-card.tsx`, `input-group.tsx`, `input-otp.tsx`, `input.tsx`, `item.tsx`, `kbd.tsx`, `label.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `select.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `slider.tsx`, `sonner.tsx`, `spinner.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `toggle-group.tsx`, `toggle.tsx`, `tooltip.tsx`.

**`app/src/components/ui-custom/`** — Custom design-system components:  
`index.ts`, `Avatar.tsx`, `Chip.tsx`, `DataTable.tsx`, `EmptyState.tsx`, `FormInput.tsx`, `FormToggle.tsx`, `LoadingSpinner.tsx`, `Modal.tsx`, `ProgressBar.tsx`, `Sidebar.tsx`, `SidebarItem.tsx`, `StatusBadge.tsx`, `Toast.tsx`, `Tooltip.tsx`.

**`app/src/components/workflow/`** — `WorkflowCard.tsx`, `WorkflowFilters.tsx`, `SearchBar.tsx`.  
**`app/src/components/dashboard/`** — `StatCard.tsx`, `ActivityFeed.tsx`, `WorkflowPreview.tsx`, `ExecutionChart.tsx`.  
**`app/src/components/credentials/`** — `index.ts`, `CredentialCard.tsx`, `CredentialModal.tsx`.  
**`app/src/components/canvas/`** — `index.ts`, `Canvas.tsx`, `CanvasNode.tsx`, `ConnectionLine.tsx`, `GridBackground.tsx`, `MiniMap.tsx`, `NodeSearchPalette.tsx`, `SelectionBox.tsx`, `ZoomControls.tsx`, `AlignmentGuides.tsx`.  
**`app/src/components/nodes/`** — `index.ts`, `AIAgentNode.tsx`, `CodeNode.tsx`, `HTTPRequestNode.tsx`, `MemoryNode.tsx`, `NodeCard.tsx`, `OpenAIChatNode.tsx`, `TriggerNode.tsx`, `WebhookNode.tsx`.  
**`app/src/components/execution/`** — `ExecutionRow.tsx`.  
**`app/src/components/forms/`** — `index.ts`, `FormInput.tsx`, `FormSelect.tsx`, `FormTextarea.tsx`, `FormToggle.tsx`.  
**`app/src/components/onboarding/`** — `index.ts`, `OnboardingModal.tsx`, `OnboardingStep.tsx`.  
**`app/src/components/templates/`** — `TemplateCard.tsx`.

**Root-level components** (in `app/src/components/`):  
`BottomToolbar.tsx`, `ChatPanel.tsx`, `CodeEditor.tsx`, `CommandPalette.tsx`, `ConfigPanel.tsx`, `ConnectionLine.tsx`, `CreativitySlider.tsx`, `ExecutionLog.tsx`, `ExecutionOverlay.tsx`, `Header.tsx`, `LogsPanel.tsx`, `TestTriggerButton.tsx`.

### Other app source

| Path | Description |
|------|--------------|
| `app/src/App.tsx`, `App.css` | Root app component. |
| `app/src/main.tsx` | Entry point. |
| `app/src/index.css` | Global styles. |
| `app/src/types/index.ts` | Shared types. |
| `app/src/hooks/use-mobile.ts` | Mobile hook. |
| `app/src/lib/utils.ts` | Utilities. |

**Note:** A copy of `AGENT_STORM_PLAN.md` also exists inside the Component Library folder; the canonical file is `V003/AGENT_STORM_PLAN.md`.

---

## Other (not a version)

**`inspo_images/`** — Folder for reference/inspiration images. Not a versioned snapshot; may be empty or untracked.

---

*When you add a new version (e.g. V004) or change structure, update this index.*
