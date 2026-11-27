---
title: rename
subtitle: Batch file renamer
logo: { set: icon-park-outline, name: edit-name }
category: CLI
intro: |
  Batch rename files with Perl-style regex substitutions, extension replacements, and options for simulation or interactive use.
links:
  - title: rename homepage
    url: http://plasmasturm.org/code/rename/
  - title: rename tutorial
    url: http://plasmasturm.org/code/rename/#TUTORIAL
tier: t3
last_verified_with: "rename 1.601."
updated: 2026-11-26
---

### Installation

```bash
brew install rename
```
<!-- {: data-highlight="brew install rename"} -->

See: [rename homepage](http://plasmasturm.org/code/rename/)

### Regex substitution

```bash
rename 's/hello/world/' *.txt
```
<!-- {: data-highlight="rename 's/hello/world/'"} -->

Rename `hello.txt` to `world.txt` and so on in `*.txt`.

See: [Tutorial](http://plasmasturm.org/code/rename/#TUTORIAL)

### Replace extension

```bash
rename -s .png .jpg.png *.png
```
<!-- {: data-highlight="rename -s .png .jpg.png"} -->

Replace `.png` with `.jpg.png` in `*.png`.

See: [Transforms](http://plasmasturm.org/code/rename/#Transforms)

### Options

| Option | Description               |
| ---    | ---                       |
| `-n`   | Simulation                |
| `-l`   | Symlink instead of rename |
| `-i`   | Interactive               |

See: [OPTIONS](http://plasmasturm.org/code/rename/#OPTIONS)

## Also see

- [Rename website](http://plasmasturm.org/code/rename/) _(plasmasturm.org)_
