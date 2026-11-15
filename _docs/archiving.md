# Archiving cheatsheets

> **Status:** draft for review. This is a proposed policy, not a CI rule yet.

Archiving is for sheets whose advice no longer works. The sheet stays at its URL
and keeps its content, but gets a notice and drops out of the homepage, search,
sitemap, and related lists. It remains reachable from [the archive
page](https://devhints.io/archive).

The goal is not to prune old material. An old sheet that still teaches
something useful should stay listed.

## What is worth archiving

Archive when a reader following the sheet would hit a dead end.

| Signal                   | Examples                                        |
| ------------------------ | ----------------------------------------------- |
| The service is gone      | Divshot, legacy TestFlight, Vainglory           |
| The project is retired   | Enzyme, Modernizr, AngularJS                    |
| The platform removed it  | AppCache, Universal Analytics, Flash            |
| The instructions call dead endpoints | `rawgit.com`, `testflightapp.com`, `circle.yml` |
| The data is ephemeral    | phone directories, prices, local listings       |
| The sheet is a link list | curated links whose targets have rotted         |

Prefer dated proof: a shutdown notice, a last release, an archived repository,
or a browser-removal version. Put the reason in the note.

## What is not worth archiving

- **An old `updated` date.** Lots of evergreen material has a 2017 date: CLI
  flags, HTTP status codes, SQL joins, Vim motions.
- **Low traffic.** A niche sheet that is correct costs nothing.
- **An old version number**, when that version still works and is documented.
  Ruby 2.1 was archived because it reached end of life, not because it was old.
- **A sheet that just needs a refresh.** Dead links, moved docs, and new syntax
  are refresh work. Archiving would throw away a fixable page.
- **A sheet that needs a rewrite.** Keep it listed while someone plans to redo
  it; `html` was left alone for this reason.
- **Unmaintained but still usable.** A library with no release since 2019 can
  still have an accurate API. Archive only when following the sheet breaks.
  Examples from a 2026 sweep that stayed: `gremlins.js` (dormant, API matches
  the last release), `psd.rb` (idle since 2019, still installs), `101` (current
  release, 30k weekly downloads), and the UMD pattern (legacy, but still
  accurate).
- **A retired endpoint that still redirects.** `rawgit.com` is retired, but it
  still 301s to jsDelivr, so the Mocha HTML template loads. That is refresh
  work, not an archive.

## Choosing the right status

| Status    | Frontmatter                              | Use when                                        |
| --------- | ---------------------------------------- | ----------------------------------------------- |
| Keep      | —                                        | Accurate as written                             |
| Refresh   | `updated: YYYY-MM-DD`                    | Alive, but the sheet drifted                    |
| Deprecate | `deprecated_by: /newer-sheet`            | Superseded by another sheet on this site        |
| Hide      | `category: Hidden`                       | Unlisted, but not retired (drafts, internal)    |
| Archive   | `category: Hidden` + `archived: <note>`   | Following it would fail                         |

`archived:` alone also unlists the sheet; `category: Hidden` keeps the intent
explicit. `tags: [Archived]` is only a label.

## Checklist

- [ ] Find dated proof of the retirement (shutdown date, last release, repo
      archive, or removed feature).
- [ ] Add `category: Hidden`, a `#` comment with the reason, `tags: [Archived]`,
      and an `archived:` note.
- [ ] Link a replacement in the note when one exists.
- [ ] Leave the body untouched. Archiving is not a cleanup pass.
- [ ] Leave `updated` alone; it tracks content updates, not archive dates.
- [ ] Run `pnpm ci`.

```yaml
---
title: Enzyme
category: Hidden
# Last release 3.11.0 (2020); no React 18 or 19 adapter.
tags: [Archived]
archived: |
  Enzyme last shipped 3.11.0 in 2020 and has no adapter for React 18 or 19.
  New tests use [React Testing Library](https://testing-library.com/).
---
```

## Writing the note

The note is the only part a reader sees before deciding whether the sheet is
still useful. Name the reason and the replacement.

- **Good:** `Divshot shut down in 2015. Use Netlify or Vercel for static hosting.`
- **Good:** `This documents the pre-2016 Firebase API, removed in Firebase 3.`
- **Weak:** `This sheet may be outdated.` It leaves the reader guessing.
- **Weak:** `Old.` No reason, no alternative.

Two sentences is enough. If the note needs a paragraph, the sheet probably
needs a refresh instead.

## Questions to settle

- Does a retired endpoint that still redirects count as a dead end? This sweep
  kept `mocha-html` because `rawgit.com` still 301s to jsDelivr.
- Should unmaintained-but-usable libraries be archived, or kept with a warning?
- Should every archive note name a replacement, or is "no replacement" fine for
  retired products?
- Should the reason live in the `archived:` note, the `#` comment, or both?
  Today it is duplicated.
