---
title: Org Mode
tags: [WIP]
category: Apps
updated: 2018-02-19
intro: |
  [Org mode](https://orgmode.org/) is for keeping hierarchal notes (and more) in Emacs.
---

## Syntax
{: .-three-column}

### Headings

```org
* Welcome to Org mode

  Lines starting with * are headings.
  These lines without are notes.

** Sub-heading

   Two stars mark a 2nd-level subheading (h2).
```

### Lists

```org
* Lists

To buy:
1. Milk
2. Eggs
   - Organic
3. Cheese
   + Parmesan
   + Mozarella
```

### Inline styles

```org
*bold*
/italic/
_underline_
=verbatim=
~code~
+strike-through+
```

### To do

```org
* TODO buy airplane
```

Cycle by using `S-LEFT` / `S-RIGHT`. List all TODO's via `C-c C-v`.

## Shortcuts
{: .-three-column}

### Basic shortcuts

| Description    | Shortcut             |
| ---            | ---                  |
| (Un) fold      | `TAB` / `S-TAB`      |
| Move up        | `M-UP` / `M-DOWN`    |
| New headline   | `M-RET`              |
| Cycle workflow | `S-LEFT` / `S-RIGHT` |
| Cycle priority | `S-UP` / `S-DOWN` |
{:.-shortcuts-right}

### Timer

| Description     | Shortcut        |
| ---             | ---             |
| Start timer     | `C-c` `C-x` `0` |
| Stop timer      | `C-c` `C-x` `_` |
| Pause timer     | `C-c` `C-x` `,` |
| ---             | ---             |
| Start countdown | `C-c` `C-x` `;` |
{:.-shortcuts-right}

You can use this for Pomodoro!

### Agenda

| Description     | Shortcut        |
| ---             | ---             |
| Agenda menu     | `C-c` `a`       |
| ---             | ---             |
| Add document    | `C-c` `[`       |
| Remove document | `C-c` `]`       |
| ---             | ---             |
| Add date        | `C-c` `.`       |
| Add time & date | `C-u` `C-c` `.` |
{:.-shortcuts-right}

Start by adding the current file to the agenda (`C-c [`), then use the agenda menu to navigate.

### Export

| Description | Shortcut    |
| ---         | ---         |
| Export menu | `C-c` `C-e` |

Lets you export the document as Markdown, HTML, and others.

## References

- [Org for beginners](https://orgmode.org/worg/org-tutorials/org4beginners.html) _(orgmode.org)_
- [Org mode website](https://orgmode.org/) _(orgmode.org)_
