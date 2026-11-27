---
title: How to format code blocks in VuePress
link_title: VuePress code blocks
subtitle: Titles, highlights, and line numbers
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
updated: 2026-11-27
links:
  - title: Markdown code blocks
    url: https://v2.vuepress.vuejs.org/guide/markdown.html#code-blocks
---

## Formatting code
<!-- {: .-snippets} -->

### Add a title
<!-- {: .-snippet} -->

````md
```ts title="config.ts"
export default {
  title: 'Docs',
}
```
````
<!-- {: data-highlight='title="config.ts"'} -->

**Shows a filename above the code.** The title is parsed from the fence's info string, after the language. See [code title](https://v2.vuepress.vuejs.org/guide/markdown.html#code-title).

### Highlight lines
<!-- {: .-snippet} -->

````md
```ts {2-3}
export default {
  title: 'Docs',
  theme: defaultTheme(),
}
```
````
<!-- {: data-highlight="{2-3}"} -->

**Tints the listed lines.** Use single lines and ranges, such as `{2-3}`; the braces follow the language. See [line highlighting](https://v2.vuepress.vuejs.org/guide/markdown.html#line-highlighting).

### Number the lines
<!-- {: .-snippet} -->

````md
```ts :line-numbers=10
const first = 10
const second = 11
```
````
<!-- {: data-highlight=":line-numbers=10"} -->

**Starts numbering at 10.** Numbers are on by default; `:no-line-numbers` hides them for one block. See [line numbers](https://v2.vuepress.vuejs.org/guide/markdown.html#line-numbers).

### Import a file
<!-- {: .-snippet} -->

```md
@[code{3-10} ts{2}](../config.ts)
```
<!-- {: data-highlight="@[code"} -->

**Pulls a file into the page.** The range picks lines and `ts{2}` highlights line 2 of the imported block; the path is relative to the page. See [import code](https://v2.vuepress.vuejs.org/guide/markdown.html#import-code-blocks).
