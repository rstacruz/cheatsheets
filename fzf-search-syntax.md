---
title: How to use fzf search syntax
subtitle: Match exact and negated terms
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
updated: 2026-11-28
tier: t3
links:
  - title: Search syntax
    url: https://github.com/junegunn/fzf#search-syntax
---

## Search syntax
<!-- {: .-snippets} -->

### Fuzzy and exact
<!-- {: .-snippet} -->

```bash
printf 'foobar\nfoo bar\n' | fzf -f "'foo"
```
<!-- {: data-highlight="'foo"} -->

**Quotes make terms literal.** A leading `'` switches from fuzzy to exact matching. See [search syntax](https://github.com/junegunn/fzf#search-syntax).

### Anchor a term
<!-- {: .-snippet} -->

```bash
printf 'music.mp3\njazz.mp3\n' | fzf -f '^music'
```
<!-- {: data-highlight="^music"} -->

**Anchors at line edges.** `^` matches the start and `$` the end of a line. See [search syntax](https://github.com/junegunn/fzf#search-syntax).

### Exclude a term
<!-- {: .-snippet} -->

```bash
printf 'fire.mp3\nwater.mp3\n' | fzf -f '!fire'
```
<!-- {: data-highlight="!fire"} -->

**Removes matching lines.** `!` negates a term; space-separated terms are combined with AND. See [search syntax](https://github.com/junegunn/fzf#search-syntax).

### Combine with OR
<!-- {: .-snippet} -->

```bash
printf 'core.go\ncore.rb\n' |
  fzf -f 'core.go$ | core.rb$'
```
<!-- {: data-highlight="core.go$ | core.rb$"} -->

**Matches either term.** A single `|` term acts as OR between the terms around it. See [search syntax](https://github.com/junegunn/fzf#search-syntax).
