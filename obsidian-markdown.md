---
title: Obsidian Markdown
subtitle: Wikilink, callout, and embed syntax
category: Apps
tier: t2
last_verified_with: "Obsidian 1.15.1."
fragments:
  - "[[Note]]"
  - "> [!note]"
  - "![[image.png]]"
  - "[[Note|Alias]]"
  - "^id"
  - "> [!tip]-"
  - "==highlight=="
  - "%%comment%%"
  - "#tag/subtag"
  - "- [ ] task"
  - "[^note]"
  - "---"
  - "![[Note#^id]]"
updated: 2026-11-22
keywords: [obsidian, obsidian markdown, wikilinks, callouts, embeds, block refs]
intro: |
  [Obsidian](https://obsidian.md/) stores notes as Markdown files. Its flavor adds wikilinks, callouts, embeds, properties, and other syntax on top of CommonMark and GFM.
links:
  - title: Obsidian Help
    url: https://help.obsidian.md/
  - title: Obsidian Flavored Markdown
    url: https://help.obsidian.md/obsidian-flavored-markdown
---

## Links

### Wikilinks

```md
[[Note]]
[[Projects/Launch]]
[[Note|Alias]]
```
<!-- {: data-highlight="[[Note|Alias]]"} -->

Links resolve by file name without an extension; folder paths start at the vault root. The pipe sets the display text.

See: [Internal links](https://help.obsidian.md/links)

### Link to headings

```md
[[#Heading]]
[[Note#Heading]]
[[Note#Heading#Details]]
```
<!-- {: data-highlight="[[#Heading]]; [[Note#Heading#Details]]"} -->

One `#` targets a heading in the current note; repeat it for each nested level.

See: [Internal links](https://help.obsidian.md/links)

### Markdown links and URIs

```md
[Launch](Projects/Launch%20plan.md)
[Note](obsidian://open?vault=MainVault&file=Note.md)
```
<!-- {: data-highlight="obsidian://"} -->

Markdown links work too; encode spaces as `%20`. An `obsidian://` URI can open a note in another vault.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)

## Callouts

### Basic callout

```md
> [!note] Release notes
> Version 1.15 is out.
> Supports **bold** and [[Note]].
```
<!-- {: data-highlight="[!note]"} -->

A callout is a blockquote whose first line is `[!type]`; text after the type is the title.

See: [Callouts](https://help.obsidian.md/callouts)

### Foldable callouts

```md
> [!tip]- Details
> Collapsed by default.

> [!warning]+ Caution
> Expanded by default.
```
<!-- {: data-highlight="> [!tip]-; > [!warning]+"} -->

`+` starts expanded, `-` starts collapsed.

See: [Callouts](https://help.obsidian.md/callouts)

### Nested callouts

```md
> [!question] Why nest?
> > [!todo] To group related notes.
> > > [!example] Up to many levels.
```
<!-- {: data-highlight="> > [!todo]"} -->

Each quote level adds one callout layer.

See: [Callouts](https://help.obsidian.md/callouts)

### Callout types

| Type | Aliases |
| --- | --- |
| `note` | — |
| `abstract` | `summary`, `tldr` |
| `info` | — |
| `todo` | — |
| `tip` | `hint`, `important` |
| `success` | `check`, `done` |
| --- | --- |
| `question` | `help`, `faq` |
| `warning` | `caution`, `attention` |
| `failure` | `fail`, `missing` |
| `danger` | `error` |
| `bug` | — |
| `example` | — |
| `quote` | `cite` |
<!-- {: .-headers} -->

Unknown types fall back to `note`; type names are case-insensitive.

See: [Callouts](https://help.obsidian.md/callouts)

## Embeds and blocks
<!-- {: .-three-column} -->

### Embed a note

```md
![[Note]]
```
<!-- {: data-highlight="![[Note]]"} -->

The `!` prefix renders the linked file inline; edits to the source show up here.

See: [Embed files](https://help.obsidian.md/embeds)

### Embed headings and blocks

```md
![[Note#Heading]]
![[Note#^id]]
```
<!-- {: data-highlight="#^id"} -->

Append `#Heading` or `#^id` to embed just that section or block.

See: [Embed files](https://help.obsidian.md/embeds)

### Embed images and PDFs

```md
![[image.png]]
![[image.png|320x200]]
![[Document.pdf#page=3&height=400]]
```
<!-- {: data-highlight="320x200; page=3"} -->

Width-only sizing keeps the aspect ratio; PDFs accept `#page=N` and `#height=N`.

See: [Embed files](https://help.obsidian.md/embeds)

### Block identifiers

```md
The key decision. ^id

> A quote worth keeping.

^quote-of-the-day
```
<!-- {: data-highlight="^id"} -->

Put `^id` at the end of a paragraph, or on its own line after a structured block. IDs allow letters, digits, and dashes.

Reference it with `[[Note#^id]]` or embed it with `![[Note#^id]]`.

See: [Internal links](https://help.obsidian.md/links)

## Properties and tags

### YAML properties

```yaml
---
title: Launch plan
aliases: []
tags:
  - project
  - planning
due: 2026-11-30
done: false
---
```
<!-- {: data-highlight="---"} -->

Properties are YAML at the top of a note. Each name must be unique in that note.

See: [Properties](https://help.obsidian.md/properties)

### Default properties

| Property | Type | Purpose |
| --- | --- | --- |
| `aliases` | List | Alternate names |
| `tags` | List | Note tags |
| `cssclasses` | List | Note styling |
<!-- {: .-headers} -->

Other names get a type on first use; the type is shared vault-wide.

See: [Properties](https://help.obsidian.md/properties)

### Tags in text

```md
#meeting #tag/subtag #Project_Apollo
```
<!-- {: data-highlight="#tag/subtag"} -->

Tags allow letters, digits, `_`, `-`, and `/` (nesting), but no spaces. They are case-insensitive.

See: [Tags](https://help.obsidian.md/tags)

### Tags as properties

```yaml
---
tags:
  - journal
  - personal
---
```
<!-- {: data-highlight="tags:"} -->

Property tags work like inline tags; `tag:inbox` also matches nested tags.

See: [Properties](https://help.obsidian.md/properties)

## Tasks

### Checkboxes

```md
- [ ] task
- [x] Write draft
  - [ ] Add citations
```
<!-- {: data-highlight="[ ]; [x]"} -->

List items starting with `[ ]` become checkboxes; indent to nest subtasks.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)

### Custom statuses

```md
- [x] Milk
- [?] Eggs
- [-] Skydiving
```
<!-- {: data-highlight="[?]; [-]"} -->

Any character inside the brackets counts as complete, while `[ ]` stays open.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)

## Formatting

### Highlights

```md
==highlight==

==🔴 Urgent==
```
<!-- {: data-highlight="==🔴 Urgent=="} -->

Six color emojis tint a highlight: 🔴 🟠 🟡 🟢 🔵 🟣; otherwise the theme color is used.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)

### Comments

```md
Visible %%comment%% text.

%%
A block comment can span lines.
%%
```
<!-- {: data-highlight="%%"} -->

Comments hide in Reading view. An unclosed block comment hides the rest of the note.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)

### Footnotes

#### Reference footnotes

```md
A claim with a note.[^note]

[^note]: Source text.
  Continues on the next line.
```
<!-- {: data-highlight="[^note]"} -->

#### Inline footnotes

```md
A claim with a note.^[Inline source text.]
```
<!-- {: data-highlight="^[Inline source text.]"} -->

Inline footnotes render in Reading view only.

See: [Basic formatting syntax](https://help.obsidian.md/syntax)
