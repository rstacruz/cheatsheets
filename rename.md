---
title: rename
category: CLI
---

### Installation

```bash
brew install rename
```

See: <http://plasmasturm.org/code/rename/>

### Regex substitution

```bash
rename 's/hello/world/' *.txt
```

Rename `hello.txt` to `world.txt` and so on in `*.txt`.

### Replace extension

```bash
rename -s .png .jpg.png *.png
```

Replace `.png` with `.jpg.png` in `*.png`.

### Options

| Option | Description               |
| ---    | ---                       |
| `-n`   | Simulation                |
| `-l`   | Symlink instead of rename |
| `-i`   | Interactive               |

## Also see

- [Rename website](http://plasmasturm.org/code/rename/) _(plasmasturm.org)_
