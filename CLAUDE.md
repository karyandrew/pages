# GitHub Pages Site

> **Repo:** `karyandrew/pages` | **Default branch:** `main`

Deployment target only. Source files live in their origin repos (e.g. kary-dental). This repo hosts copies for GitHub Pages serving at `karyandrew.github.io/pages`.

## Deployment
- **Source:** Deploy from branch `main`, root (`/`)
- Changes pushed to `main` auto-deploy via GitHub Pages

## Merge Before Archive (MANDATORY)
Before every session archive, merge the current `claude/*` branch into main. Never leave work stranded on an orphaned branch.

**Steps at end of every session:**
1. Commit and push any in-progress work
2. Merge to main: `git checkout main && git merge <branch> && git push`
3. Delete the branch: `git push origin --delete <branch>` and `git branch -d <branch>`
4. Tell Andrew it's safe to archive

If the work should NOT be merged (dead end, abandoned), say so explicitly before archiving.