---
title: How to reuse Markdown in VitePress
link_title: VitePress Markdown includes
subtitle: Includes and code imports
logo: { src: /assets/logos/vitepress.svg }
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-28
links:
  - title: Markdown extensions
    url: https://vitepress.dev/guide/markdown
  - title: Markdown file inclusion
    url: https://vitepress.dev/guide/markdown#markdown-file-inclusion
  - title: VitePress cheatsheet
    url: ./vitepress
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

**Skips the first two lines.** Includes take `{start,end}` ranges such as `{3,}` or `{,10}`; fences and `<<<` imports use dash ranges like `{2-4}`. See [file inclusion](https://vitepress.dev/guide/markdown#markdown-file-inclusion).

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

**Highlights imported lines.** It also sets the language. Braces take line numbers, an optional language override, and `:line-numbers`. See [import code snippets](https://vitepress.dev/guide/markdown#import-code-snippets).
