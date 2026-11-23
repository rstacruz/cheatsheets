---
title: How to edit files in place with sed
link_title: sed in place
subtitle: Replace text in files
category: Command line recipes
layout: snippet
last_verified_with: "GNU sed 4.10."
updated: 2026-11-23
links:
  - title: GNU sed manual
    url: https://www.gnu.org/software/sed/manual/sed.html
  - title: BSD sed manual
    url: https://man.openbsd.org/sed.1
---

## In-place edits
<!-- {: .-snippets} -->

### GNU sed
<!-- {: .-snippet} -->

```bash
sed -i 's/foo/bar/g' file.txt
```
<!-- {: data-highlight="-i"} -->

Edits the file in place without a backup; `g` replaces every match on each line. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).

### Keep a backup
<!-- {: .-snippet} -->

```bash
sed -i.bak 's/foo/bar/g' file.txt
```
<!-- {: data-highlight="-i.bak"} -->

Writes `file.txt.bak` before editing; the suffix follows `-i` with no space. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).

### macOS and BSD
<!-- {: .-snippet} -->

```bash
sed -i '' 's/foo/bar/g' file.txt
```
<!-- {: data-highlight="-i ''"} -->

BSD sed requires an explicit backup suffix; an empty string means no backup. See [BSD sed](https://man.openbsd.org/sed.1).

### Extended regex
<!-- {: .-snippet} -->

```bash
sed -E 's/(foo|bar)/baz/g' file.txt
```
<!-- {: data-highlight="-E"} -->

`-E` enables extended regular expressions such as `|` and groups. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).
