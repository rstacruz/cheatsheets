# Review tiers

A sheet's `tier:` frontmatter is a reminder of how often its advice needs
checking. It is a guideline, not a guarantee: check any sheet when its tool
changes, whatever its tier.

| Tier   | Check cadence       | Typical sheets                     |
| ------ | ------------------- | ---------------------------------- |
| `t1`   | About weekly        | Tools that ship changes weekly     |
| `t2`   | About every 6 weeks | Stable tools, languages, standards |
| (none) | Best effort         | Everything else                    |

Tiers are not rendered, but they do change the authoring rules that apply:
both tiers need `fragments` and `last_verified_with`, plus the tiered-sheet
section rules (see [content organisation](writing-guidelines.md#content-organisation) and [frontmatter/h3-links](writing-guidelines.md#frontmatterh3-links)).

## Choosing a tier

- **T1** — the tool or spec changes weekly: AI coding agents, fast-moving CLIs,
  nightly-built tools. `claude-code`, `mise`, and `yt-dlp` are T1.
- **T2** — the surface is stable: shell utilities, long-lived languages, frozen
  specs, and CLIs whose patch releases do not change their commands. `bash`,
  `http-status`, and `xpath` are T2.
- **No tier** — best effort. Most sheets have no tier; check them when you touch
  them.

When in doubt, use T2. Move a sheet to T1 when its release notes regularly
change the commands, flags, or syntax the sheet documents.

## Layouts

Layouts are separate from review tiers. A snippet sheet sets
`layout: snippet`; check it on the T2 cadence. See
[snippet layout](writing-guidelines.md#snippet-layout) for the authoring rules.

## Checking a sheet

Compare the examples with upstream docs, then update `last_verified_with` with
the versions checked and `updated` if the content changed. A check that finds
nothing new needs no edit. A cadence is a nudge, not a deadline: a breaking
release warrants a check the same day, even on an untiered sheet.
