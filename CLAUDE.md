# GitHub Pages Site

> **Repo:** `karyandrew/pages` | **Default branch:** `main`

Deployment target only. Source files live in their origin repos. This repo hosts copies for GitHub Pages serving at `karyandrew.github.io/pages`.


## Dependencies
- `karyandrew/second-brain` — canonical cross-repo rules, sensitivity policy, and wiki. A SessionStart hook (`.claude/hooks/fetch-second-brain-rules.sh`) mirrors the second-brain repo into `.claude/.cache/second-brain/` at every session start (web or local). The agent MUST read `.claude/.cache/second-brain/rules/shared-rules.md` and `.claude/.cache/second-brain/rules/sensitivity.md` before acting.

## Deployment
- **Source:** Deploy from branch `main`, root (`/`)
- Changes pushed to `main` auto-deploy via GitHub Pages

## Git Workflow
Solo dev. Work on a `claude/*` branch, open a PR, merge it with a merge commit (not squash, not rebase), and delete the branch if auto-delete didn't. Canonical rule lives in `.claude/.cache/second-brain/rules/shared-rules.md` → Git Workflow.

## Merge Before Archive (MANDATORY)
Before every session archive, merge the current `claude/*` branch into main via PR. Never leave work stranded on an orphaned branch.

**Steps at end of every session:**
1. Commit and push any in-progress work
2. Open a PR: `gh pr create --base main --head <branch>`
3. Merge with a merge commit: `gh pr merge <num> --merge`
4. Head branch auto-deletes on merge (repo setting enabled). Run `git fetch --prune` locally to clean up stale remote-tracking refs.
5. Tell Andrew it's safe to archive

If the work should NOT be merged (dead end, abandoned), say so explicitly before archiving.

## Task Tracking
Repo-local TODO files are deprecated. Track follow-up work in the canonical second-brain/wiki system, not in this deployment repo.
