# Anthropic Feedback Channels & Engagement Pattern

> Researched 2026-04-09. Anthropic doesn't publish an official channel guide, so this is assembled from docs, GitHub, and web research.

## Channels

| Channel | URL | Best For | Notes |
|---|---|---|---|
| **GitHub Issues** | github.com/anthropics/claude-code/issues | Bugs, docs gaps, feature requests | The channel Anthropic actually acts on. 9,500+ open issues. Engineers triage and close but rarely comment publicly. Docs issues get fixed fastest. Use `[DOCS]`, `[BUG]`, `[FEATURE]` templates. |
| **`/bug` command** | (in Claude Code session) | Bugs caught mid-session | Zero friction. Captures conversation context + diagnostics automatically. Black hole though -- no public tracking. |
| **`/feedback` command** | (in Claude Code session) | General "this should work differently" | Same black hole as `/bug`. |
| **Discord** | discord.com/invite/6PPFFzqPDZ | Real-time Q&A, "does anyone know?" | ~82k members. Anthropic staff participate. Fastest path to crowd-sourced answers. |
| **Reddit r/ClaudeAI** | reddit.com/r/ClaudeAI | "Am I the only one seeing this?" | ~688k members. Unofficial but very active. |
| **Support portal** | support.anthropic.com | Account/billing issues | Human escalation for account admins. |
| **Community Ambassadors** | claude.com/community/ambassadors | Direct feedback to product teams | Monthly API credits, pre-release access, feedback sessions. Worth it if you're hitting undocumented edges regularly. |

## Decision Pattern

| Situation | Do This |
|---|---|
| Bug mid-session, want it logged fast | `/bug` |
| Want public visibility + upvotes | GitHub issue |
| "Am I the only one?" | Reddit or Discord |
| Need a quick answer from another user | Discord |
| Want to track whether Anthropic acts on it | GitHub (only place with public status) |
| Minutiae not worth a full issue | `/bug` (one sentence, move on) |

## GitHub Tips

- **Search before filing:** github.com/anthropics/claude-code/issues -- use search bar with specific keywords
- **Upvote:** +1 reaction on existing issues. High-upvote requests do get implemented (one with 225 upvotes took ~6 months but shipped).
- **Issue templates:** Bug, Feature, Documentation, Model Behavior
- **Key labels to watch:** `area:docs`, `area:ui`, `enhancement`, `documentation`, `high-priority`
- **No Discussions tab** on claude-code -- issues only
- **No CONTRIBUTING.md** -- closed source, issue tracker is for feedback not code contributions
- **Response pattern:** Anthropic reads and acts, but often silently (close + lock, no comment). Don't expect a conversation.

## Changelog / Release Notes

- **Claude Code changelog:** code.claude.com/docs/en/changelog (also github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- **Platform release notes:** platform.claude.com/docs/en/release-notes/overview
- **GitHub releases:** github.com/anthropics/claude-code/releases

## What Doesn't Exist

- No public Slack
- No first-party forum (no Discourse)
- No "edit this page" on docs
- No open-source docs repo
- No developer email newsletter
