---
title: How to reuse Markdown in VitePress
link_title: Reuse Markdown in VitePress
subtitle: Includes and code imports
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Markdown extensions
    url: https://vitepress.dev/guide/markdown
  - title: Markdown file inclusion
    url: https://vitepress.dev/guide/markdown#markdown-file-inclusion
---

## Reuse
<!-- {: .-snippets} -->

### Include a Markdown part
<!-- {: .-snippet} -->

```md
## Basics

<!--@include: ./parts/basics.md-->
```
<!-- {: data-highlight="./parts/basics.md"} -->

**Inlines another Markdown file.** Paths are relative to the current page; `@` starts at the source root (`srcDir`). See [file inclusion](https://vitepress.dev/guide/markdown#markdown-file-inclusion).

### Slice the included file
<!-- {: .-snippet} -->

```md
<!--@include: ./parts/basics.md{3,}-->
```
<!-- {: data-highlight="./parts/basics.md{3,}"} -->

**Skips the first two lines.** The braces take a `{start,end}` line range, not the `{2-4}` fence syntax. See [file inclusion](https://vitepress.dev/guide/markdown#markdown-file-inclusion).

### Import a code file
<!-- {: .-snippet} -->

```md
<<< @/snippets/config.ts
```
<!-- {: data-highlight="<<< @/snippets/config.ts"} -->

**Embeds a real source file.** `@` resolves from the source root (`srcDir`) and the file's extension sets the language. See [import code snippets](https://vitepress.dev/guide/markdown#import-code-snippets).

### Highlight imported lines
<!-- {: .-snippet} -->

```md
<<< @/snippets/config.ts{2-4 ts:line-numbers}
```
<!-- {: data-highlight="{2-4 ts:line-numbers}"} -->

**Highlights lines and sets the language.** Braces take line numbers, an optional language override, and `:line-numbers`. See [import code snippets](https://vitepress.dev/guide/markdown#import-code-snippets).
