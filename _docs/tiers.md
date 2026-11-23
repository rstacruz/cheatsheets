# Review tiers

A sheet's `tier:` frontmatter is a reminder of how often its advice needs
checking. It is a guideline, not a guarantee: check any sheet when its tool
changes, whatever its tier.

| Tier      | Check cadence       | Typical sheets                                      |
| --------- | ------------------- | --------------------------------------------------- |
| `t1`      | About weekly        | Tools that ship changes weekly                      |
| `t2`      | About every 6 weeks | Stable tools, languages, standards                  |
| `snippet` | About every 6 weeks | Microsheets using the two-column snippet layout     |
| (none)    | Best effort         | Everything else                                     |

Tiers are not rendered, but they do change the authoring rules that apply:
`t1` and `t2` need `fragments` and `last_verified_with`; `snippet` needs
`last_verified_with` and the snippet layout. All tiered sheets need the
tiered-sheet section rules (see [content organisation](writing-guidelines.md#content-organisation)
and [frontmatter/h3-links](writing-guidelines.md#frontmatterh3-links)).

## Choosing a tier

- **T1** — the tool or spec changes weekly: AI coding agents, fast-moving CLIs,
  nightly-built tools. `claude-code`, `mise`, and `yt-dlp` are T1.
- **T2** — the surface is stable: shell utilities, long-lived languages, frozen
  specs, and CLIs whose patch releases do not change their commands. `bash`,
  `http-status`, and `xpath` are T2.
- **Snippet** — a microsheet for one tight command family. Use the two-column
  layout and check it on the T2 cadence. `git-rename-branch` is a snippet.
- **No tier** — best effort. Most sheets have no tier; check them when you touch
  them.

When in doubt, use T2. Move a sheet to T1 when its release notes regularly
change the commands, flags, or syntax the sheet documents.

## Snippet sheets

Set `tier: snippet`, mark the H2 with `.-snippets`, and mark every H3 with
`.-snippet`. The H2 keeps the cards full width. Each H3 opens with one fenced
code block and follows it with one paragraph that carries the upstream
documentation link.

````md
## Renaming
<!-- {: .-snippets} -->

### Current branch
<!-- {: .-snippet} -->

```bash
git branch -m new-name
```

Renames the checked-out branch; see the [git-branch manual](https://git-scm.com/docs/git-branch).
````

`pnpm test` checks the tier, the classes, the code-first body, and the
explanation link.

## Checking a sheet

Compare the examples with upstream docs, then update `last_verified_with` with
the versions checked and `updated` if the content changed. A check that finds
nothing new needs no edit. A cadence is a nudge, not a deadline: a breaking
release warrants a check the same day, even on an untiered sheet.
