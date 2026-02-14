#!/usr/bin/env bash
# Sync reference-app/ from Open-Agency-Artel into lovable-frontend/reference-app/
# and push to Agent-Artel-studio. Run from the Open-Agency-Artel repo root.

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF_APP="${REPO_ROOT}/reference-app"
LOVABLE="${REPO_ROOT}/lovable-frontend"
TARGET="${LOVABLE}/reference-app"

if [[ ! -d "$REF_APP" ]]; then
  echo "Error: reference-app/ not found at $REF_APP"
  exit 1
fi
if [[ ! -d "$LOVABLE" ]]; then
  echo "Error: lovable-frontend/ submodule not found at $LOVABLE"
  exit 1
fi

echo "Syncing reference-app/ -> lovable-frontend/reference-app/ ..."
mkdir -p "$TARGET"
rsync -a --delete \
  --exclude 'node_modules/' \
  --exclude 'dist/' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude 'package-lock.json' \
  "$REF_APP/" "$TARGET/"

echo "Committing and pushing from lovable-frontend/ ..."
cd "$LOVABLE"
git add reference-app/
if git diff --staged --quiet; then
  echo "No changes to reference-app in submodule; skipping commit."
else
  git commit -m "chore: sync reference-app from Open-Agency-Artel $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin main
fi

echo "Staging and committing submodule ref in parent repo ..."
cd "$REPO_ROOT"
git add lovable-frontend
if git diff --staged --quiet; then
  echo "No submodule ref change; skipping parent commit."
else
  git commit -m "chore: sync reference-app to Lovable"
fi

echo "Done. Push parent repo when ready: git push origin main"
