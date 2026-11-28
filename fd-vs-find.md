---
title: When to use fd vs find
link_title: fd vs find
subtitle: Find files from the CLI
logo: { set: icon-park-outline, name: file-search }
category: CLI
layout: snippet
last_verified_with: "fd 10.5.1."
created_at: 2026-11-23
updated: 2026-11-28
tier: t3
links:
  - title: fd repository
    url: https://github.com/sharkdp/fd
  - title: GNU find manual
    url: https://www.gnu.org/software/findutils/manual/html_node/find_html/
---

## Choosing a tool
<!-- {: .-snippets} -->

### fd for a quick match
<!-- {: .-snippet} -->

```bash
fd '\.ts$' src
```
<!-- {: data-highlight="fd"} -->

#### Input

```text
src/app.ts
src/app.test.ts
src/lib/util.ts
src/readme.md
```

#### Output

```text
src/app.ts
src/app.test.ts
src/lib/util.ts
```

**Finds files with a regex.** `fd` respects gitignore and skips hidden files by default; see [fd](https://github.com/sharkdp/fd).

### fd with a command
<!-- {: .-snippet} -->

```bash
fd -e ts -x wc -l
```
<!-- {: data-highlight="-x"} -->

#### Input

```text
src/app.ts
src/app.test.ts
src/lib/util.ts
```

#### Output

```text
10 src/app.ts
20 src/app.test.ts
5 src/lib/util.ts
```

**Runs a command per match.** `-x` passes the path as `{}`. See [fd](https://github.com/sharkdp/fd).

### find by name
<!-- {: .-snippet} -->

```bash
find . -name '*.ts' -not -path '*/node_modules/*'
```
<!-- {: data-highlight="-not -path"} -->

#### Input

```text
src/app.ts
src/app.test.ts
node_modules/pkg/index.ts
```

#### Output

```text
./src/app.ts
./src/app.test.ts
```

**Finds files by name portably.** `find` needs explicit pruning and ignores; see [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/).

### find with exec
<!-- {: .-snippet} -->

```bash
find . -name '*.ts' -exec wc -l {} +
```
<!-- {: data-highlight="-exec"} -->

#### Input

```text
src/app.ts
src/app.test.ts
```

#### Output

```text
10 ./src/app.ts
20 ./src/app.test.ts
```

**Runs a command on files.** `-exec ... +` batches the matches into one call instead of one per file. See [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/).
