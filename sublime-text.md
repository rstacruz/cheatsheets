---
title: Sublime Text
subtitle: Text editor shortcuts
logo: { src: /assets/logos/sublimetext.svg }
category: Apps
intro: |
  Sublime Text is a cross-platform code editor.
links:
  - title: Key bindings
    url: https://www.sublimetext.com/docs/key_bindings.html
  - title: Command line interface
    url: https://www.sublimetext.com/docs/command_line.html
tier: t3
last_verified_with: "Sublime Text 4 build 4215."
created_at: 2016-06-18
updated: 2026-11-26
---

## Editing shortcuts

### Select & Expand

| Shortcut | Description |
| --- | --- |
| `⌘ D`       | select current word (repeat to include next instance of word) |
| `⌘ L`       | select current line (repeat to include next line) |
| `⌘ ⇧ L`     | split selection into multiple lines |
| `⌘ ⇧ A`     | select text inside tag (repeat to expand) |
| `Ctrl ⇧ M`  | select to curly or angle brackets (repeat to expand) |

<!-- {: .-shortcuts} -->

Replace ⌘ with Ctrl on Windows and Linux.

See: [Key bindings](https://www.sublimetext.com/docs/key_bindings.html)

### Code Folding

| Shortcut | Description |
| --- | --- |
| `⌘ Alt [`         | fold closest block                     |
| `⌘ Alt ]`         | unfold closest block                   |
| `⌘ K` `⌘ 1`       | fold all first level code blocks       |
| `⌘ K` `⌘ 2`       | fold all second level code blocks      |
| `⌘ K` `⌘ 3 (etc)` | fold all third level code blocks (etc) |
| `⌘ K` `⌘ T`       | fold all HTML attributes               |
| `⌘ K` `⌘ 0`       | unfold everything                      |

<!-- {: .-shortcuts} -->

See: [Key bindings](https://www.sublimetext.com/docs/key_bindings.html)

### Editing

| Shortcut | Description |
| --- | --- |
| `⌘ ⇧ D` | duplicate current line/selection |
| `⌘ ⇧ K` | delete current line/selection |
| `⇧ del` | delete current line/selection |
| `⌘ ⇧ ↑` | move line up   |
| `⌘ ⇧ ↓` | move line down |

<!-- {: .-shortcuts} -->

See: [Key bindings](https://www.sublimetext.com/docs/key_bindings.html)

## Find and open

### Goto

| Shortcut | Description |
| --- | --- |
| `⌘ P`         | goto anything |
| `⌘ G`         | goto line number |
| `⌘ R`         | goto symbol |
| `⌘ P, :`      | goto line number (enter number after `:`) |
| `⌘ P, #`      | goto and list fuzzy-matches of string (enter characters after `#`) |
| `⌘ P, @`      | goto and list symbol (begin typing symbol name after `@`) |

<!-- {: .-shortcuts} -->

See: [Key bindings](https://www.sublimetext.com/docs/key_bindings.html)

### Command line

```sh
$ subl .
$ subl README.md
```

Use `subl` to open files in Sublime from the terminal.

See: [Command line interface](https://www.sublimetext.com/docs/command_line.html)
