---
title: Sublime Text
category: Apps
---

### Select & Expand

| `⌘ D`       | select current word (repeat to include next instance of word) |
| `⌘ L`       | select current line (repeat to include next line) |
| `⌘ ⇧ L`     | split selection into multiple lines |
| `⌘ ⇧ A`     | select text inside tag (repeat to expand) |
| `Ctrl ⇧ M`  | select to curly or angle brackets (repeat to expand) |
{: .-shortcuts}

Replace ⌘ with Ctrl on Windows and Linux.

### Code Folding

| `⌘ Alt [`         | fold closest block                     |
| `⌘ Alt ]`         | unfold closest block                   |
| `⌘ K` `⌘ 1`       | fold all first level code blocks       |
| `⌘ K` `⌘ 2`       | fold all second level code blocks      |
| `⌘ K` `⌘ 3 (etc)` | fold all third level code blocks (etc) |
| `⌘ K` `⌘ T`       | fold all HTML attributes               |
| `⌘ K` `⌘ 0`       | unfold everything                      |
{: .-shortcuts}

### Editing

| `⌘ ⇧ D` | duplicate current line/selection |
| `⌘ ⇧ K` | delete current line/selection |
| `⇧ del` | delete current line/selection |
| `⌘ ⇧ ↑` | move line up   |
| `⌘ ⇧ ↓` | move line down |
{: .-shortcuts}

### Goto

| `⌘ P`         | goto anything |
| `⌘ G`         | goto line number |
| `⌘ R`         | goto symbol |
| `⌘ P, :`      | goto line number (enter number after `:`) |
| `⌘ P, #`      | goto and list fuzzy-matches of string (enter characters after `#`) |
| `⌘ P, @`      | goto and list symbol (begin typing symbol name after `@`) |
{: .-shortcuts}

### Command line

```sh
$ subl .
$ subl README.md
```

Use `subl` to open files in Sublime from the terminal.
