# Review tiers

A sheet's `tier:` frontmatter is a reminder of how often its advice needs
checking. It is a guideline, not a guarantee: check any sheet when its tool
changes, whatever its tier.

| Tier   | Check cadence       | Typical sheets                                 |
| ------ | ------------------- | ---------------------------------------------- |
| `t1`   | About weekly        | Tools that ship changes weekly                 |
| `t2`   | About every 6 weeks | Stable tools, languages, standards             |
| `t3`   | Best effort         | Legacy sheets that still get the tiered checks |
| (none) | Best effort         | Everything else                                |

Tiers do not appear in the sheet body, but they change the authoring rules that
apply. Every tier (`t1`–`t3`) needs `last_verified_with`, plus the tiered-sheet
section rules (see [content organisation](writing-guidelines.md#content-organisation) and [frontmatter/h3-links](rules.md#frontmatterh3-links)).
Only `t1` and `t2` need `fragments`; `t3` has no scheduled check, so it skips
them.
A `t1` sheet's `<title>` ends with the month and year of its `updated` date, eg
`Bash scripting cheatsheet (Nov 2026)`; keep `updated` current so the stamp does
not go stale.

## Choosing a tier

- **T1** — the tool or spec changes weekly: AI coding agents, fast-moving CLIs,
  nightly-built tools. `claude-code`, `mise`, and `yt-dlp` are T1.
- **T2** — the surface is stable: shell utilities, long-lived languages, frozen
  specs, and CLIs whose patch releases do not change their commands. `bash`,
  `http-status`, and `xpath` are T2.
- **T3** — best effort, but still validated. Use it for legacy sheets that are
  kept current without a schedule; they need `last_verified_with` and H3 links,
  but no fragments.
- **No tier** — best effort. Most sheets have no tier; check them when you touch
  them.

When in doubt, use T2. Move a sheet to T1 when its release notes regularly
change the commands, flags, or syntax the sheet documents. Move a sheet to T3
when it is complete enough to validate but does not warrant a cadence.

## Layouts

Layouts are separate from review tiers. A snippet sheet sets
`layout: snippet`; check it on its tier's cadence. See
[snippet layout](writing-guidelines.md#snippet-layout) for the authoring rules.

## Checking a sheet

Compare the examples with upstream docs, then update `last_verified_with` with
the versions checked and `updated` if the content changed. A check that finds
nothing new needs no edit. A cadence is a nudge, not a deadline: a breaking
release warrants a check the same day, even on a `t3` or untiered sheet.
