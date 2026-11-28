# Review tiers

A sheet's `tier:` frontmatter is a reminder of how often its advice needs
checking. It is a guideline, not a guarantee: check any sheet when its tool
changes, whatever its tier.

| Tier   | Check cadence       | Typical sheets                                 |
| ------ | ------------------- | ---------------------------------------------- |
| `t1`   | 14 days             | Tools that ship changes weekly                 |
| `t2`   | 28 days (4 weeks)   | Stable tools, languages, standards             |
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

## Verification stamps

`last_verified_at: YYYY-MM-DD` records when the examples were last checked
against upstream. It is required on `t1` and `t2` sheets, optional elsewhere,
and must never precede `updated`. The 2026-11-28 backfill derived dates from
git history (50 content commits, 48 verification-note commits, and 5 bulk
metadata commits); these are proxies, not recorded checks. Recheck
`claude-code-headless-tasks`, `codex-headless-tasks`, `intl-numberformat`,
`opencode-headless-tasks`, and `paseo-scheduled-tasks` on the first sweep.

Run `pnpm sheets:due --tier t1` or `--tier t2` after pulling `origin/master`.
It prints a one-sentence summary, a blank line, then TSV rows under the
`slug`, `last_verified_at`, `age` header; `--json` prints a pure array instead.
A sheet is due when its stamp is 14 days (t1) or 28 days (t2) old or older,
oldest first. Sheets in open PRs labelled `sheet-refresh` are excluded by
default. Create the label once:

```sh
gh label create sheet-refresh --color 0E8A16 --description "Sheet refresh in progress"
```

`--exclude-label <label>` overrides the label, `--date YYYY-MM-DD` shifts the
as-of day, and `--limit N` caps the list.

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
the versions checked, `last_verified_at` with the check date, and `updated` if
the content changed. A clean check still needs a stamp-only PR on `t1` and
`t2`: recording the check is a change. A cadence is a nudge, not a deadline:
a breaking release warrants a check the same day, even on a `t3` or untiered
sheet.
