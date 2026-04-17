# GitHub Pages Site

> **Repo:** `karyandrew/pages` | **Default branch:** `main`

Deployment target only. Source files live in their origin repos. This repo hosts copies for GitHub Pages serving at `karyandrew.github.io/pages`.

**Read `TODO.md` at session start for current active tasks.**

## Deployment
- **Source:** Deploy from branch `main`, root (`/`)
- Changes pushed to `main` auto-deploy via GitHub Pages

## Merge Before Archive (MANDATORY)
Before every session archive, merge the current `claude/*` branch into main. Never leave work stranded on an orphaned branch.

**Steps at end of every session:**
1. Commit and push any in-progress work
2. Update `TODO.md` — check off completed items, add new items discovered this session
3. Merge to main: `git checkout main && git merge <branch> && git push`
4. Delete the branch: `git push origin --delete <branch>` and `git branch -d <branch>`
5. Tell Andrew it's safe to archive

If the work should NOT be merged (dead end, abandoned), say so explicitly before archiving.

## git-graph.html

Static Mermaid gitGraph. **Always update the date in the `<p>` tag** whenever the graph content changes — it's the only freshness signal users see.

**Constraints learned the hard way:**
- Origin repos may be private — client-side GitHub API fetch returns 404 without auth. Dynamic fetching requires a server-side step (GitHub Actions). Don't attempt it client-side.
- Mermaid v11 rejects `/` in branch names. Use `-` instead (`claude-feature-x`, not `claude/feature-x`).
- Commit id strings: alphanumeric, spaces, hyphens only. No `:` `/` `.` `()` and do not use reserved words (`merge`, `commit`, `branch`, `checkout`) as id values.
- Merge commit ids: use `"3way"` / `"3way-2"` etc. for three-way merges, `"ff"` for fast-forward.

**To update the graph:** pull the commit log from the origin repo (via `mcp__github__list_commits`), reconstruct the branch topology from merge commit messages, rewrite the Mermaid block, update the date.
