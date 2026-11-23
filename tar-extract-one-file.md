---
title: How to extract one file from a tar archive
link_title: tar extract one file
subtitle: Extract a single archive member
category: Command line recipes
layout: snippet
last_verified_with: "tar 1.35."
updated: 2026-11-23
links:
  - title: GNU tar manual
    url: https://www.gnu.org/software/tar/manual/tar.html
---

## Extracting
<!-- {: .-snippets} -->

### List the archive
<!-- {: .-snippet} -->

```bash
tar -tf archive.tar.gz
```
<!-- {: data-highlight="-tf"} -->

#### Output

```text
docs/
docs/readme.md
notes.md
path/to/file
```

`-t` lists members and `-f` names the archive; find the exact path before extracting. See [GNU tar](https://www.gnu.org/software/tar/manual/html_node/list.html).

### Extract one member
<!-- {: .-snippet} -->

```bash
tar -xf archive.tar.gz path/to/file
```
<!-- {: data-highlight="-xf"} -->

#### Output

```text
path/to/file
```

`-x` extracts and `-f` selects the archive; pass the exact member path. See [GNU tar](https://www.gnu.org/software/tar/manual/html_node/extracting-files.html).

### Print to stdout
<!-- {: .-snippet} -->

```bash
tar -xOf archive.tar.gz path/to/file
```
<!-- {: data-highlight="-xOf"} -->

#### Output

```text
file contents
```

`-O` writes the member to stdout instead of creating a file. See [GNU tar](https://www.gnu.org/software/tar/manual/html_node/extracting-files.html).

### Match a pattern
<!-- {: .-snippet} -->

```bash
tar -xf archive.tar.gz --wildcards '*.md'
```
<!-- {: data-highlight="--wildcards"} -->

#### Output

```text
docs/readme.md
notes.md
```

GNU tar needs `--wildcards` before it treats a member name as a glob. See [GNU tar](https://www.gnu.org/software/tar/manual/html_node/wildcards.html).
