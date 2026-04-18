# GitHub Pages Site

> **Repo:** `karyandrew/pages` | **Default branch:** `main`

Deployment target only. Source files live in their origin repos. This repo hosts copies for GitHub Pages serving at `karyandrew.github.io/pages`.

**Read `TODO.md` at session start for current active tasks.**

## Dependencies
- `karyandrew/second-brain` — canonical cross-repo rules, sensitivity policy, and wiki. The agent MUST read `karyandrew/second-brain/rules/shared-rules.md` and `karyandrew/second-brain/rules/sensitivity.md` at session start. Local `.claude/rules/` is vestigial and superseded by second-brain — see the readiness-audit follow-up todo for the migration plan.

## Deployment
- **Source:** Deploy from branch `main`, root (`/`)
- Changes pushed to `main` auto-deploy via GitHub Pages

## Git Workflow
Solo dev. Work on a `claude/*` branch, open a PR, merge it with a merge commit (not squash, not rebase), and delete the branch if auto-delete didn't. Canonical rule lives in `karyandrew/second-brain/rules/shared-rules.md` → Git Workflow.

## Merge Before Archive (MANDATORY)
Before every session archive, merge the current `claude/*` branch into main via PR. Never leave work stranded on an orphaned branch.

**Steps at end of every session:**
1. Commit and push any in-progress work
2. Update `TODO.md` — check off completed items, add new items discovered this session
3. Open a PR: `gh pr create --base main --head <branch>`
4. Merge with a merge commit: `gh pr merge <num> --merge`
5. Head branch auto-deletes on merge (repo setting enabled). Run `git fetch --prune` locally to clean up stale remote-tracking refs.
6. Tell Andrew it's safe to archive

If the work should NOT be merged (dead end, abandoned), say so explicitly before archiving.

## git-graph.html

Static Mermaid gitGraph. **Always update the date in the `<p>` tag** whenever the graph content changes — it's the only freshness signal users see.

**Constraints learned the hard way:**
- Origin repos may be private — client-side GitHub API fetch returns 404 without auth. Dynamic fetching requires a server-side step (GitHub Actions). Don't attempt it client-side.
- Mermaid v11 rejects `/` in branch names. Use `-` instead (`claude-feature-x`, not `claude/feature-x`).
- Commit id strings: alphanumeric, spaces, hyphens only. No `:` `/` `.` `()` and do not use reserved words (`merge`, `commit`, `branch`, `checkout`) as id values.
- Merge commit ids: use `"3way"` / `"3way-2"` etc. for three-way merges, `"ff"` for fast-forward.

**To update the graph:** pull the commit log from the origin repo (via `mcp__github__list_commits`), reconstruct the branch topology from merge commit messages, rewrite the Mermaid block, update the date.
