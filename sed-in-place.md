---
title: How to edit files in place with sed
link_title: sed in place
subtitle: Replace text in files
logo: { set: icon-park-outline, name: edit }
category: CLI
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

#### Input

```text
foo bar
foo baz
```

#### Output

```text
bar bar
bar baz
```

**Edits a file without a backup.** `g` replaces every match on each line. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).

### Keep a backup
<!-- {: .-snippet} -->

```bash
sed -i.bak 's/foo/bar/g' file.txt
```
<!-- {: data-highlight="-i.bak"} -->

**Keeps a backup before editing.** Writes `file.txt.bak`; the suffix follows `-i` with no space. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).

### macOS and BSD
<!-- {: .-snippet} -->

```bash
sed -i '' 's/foo/bar/g' file.txt
```
<!-- {: data-highlight="-i ''"} -->

**Handles BSD sed's backup argument.** BSD sed requires an explicit suffix; an empty string means no backup. See [BSD sed](https://man.openbsd.org/sed.1).

### Extended regex
<!-- {: .-snippet} -->

```bash
sed -E 's/(foo|bar)/baz/g' file.txt
```
<!-- {: data-highlight="-E"} -->

#### Input

```text
foo bar
bazqux
```

#### Output

```text
baz baz
bazqux
```

**Enables extended regular expressions.** `-E` supports `|` and groups. See [GNU sed](https://www.gnu.org/software/sed/manual/html_node/Invoking-sed.html).
