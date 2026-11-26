---
title: Kramdown
subtitle: Ruby Markdown parser
category: Markup
last_verified_with: "kramdown 2.6.1."
updated: 2026-11-25
tier: t3
intro: |
  Kramdown is a Markdown parser in Ruby.
links:
  - title: https://kramdown.gettalong.org/
    url: https://kramdown.gettalong.org/
---

### Configuration

* `parse_block_html` - process kramdown syntax inside blocks
* `parse_span_html` - process kramdown syntax inside inlines
* `html_to_native` - convert html elements to native elements

#### GFM parser

* `hard_wrap`

See: [Options](https://kramdown.gettalong.org/options.html#available-options)

### For Jekyll (gh-pages)

#### _config.yml

```
markdown: kramdown
kramdown:
  input: GFM
```
<!-- {: data-highlight="markdown: kramdown; input: GFM"} -->

See: [Jekyll configuration](https://jekyllrb.com/docs/configuration/options/)

### Footnotes (Kramdown)

```
This is some text.[^1]. Other text.[^footnote].

[^1]: Some *crazy* footnote definition.
```
<!-- {: data-highlight="[^1]; [^footnote]"} -->

See: [Footnotes](https://kramdown.gettalong.org/syntax.html#footnotes)

### Abbreviations (Kramdown)

```
This is some text not written in HTML but in another language!

*[another language]: It's called Markdown
*[HTML]: HyperTextMarkupLanguage
```
<!-- {: data-highlight="*[another language]; *[HTML]"} -->

See: [Abbreviations](https://kramdown.gettalong.org/syntax.html#abbreviations)

### Classes and IDs (Kramdown)

```
A simple paragraph with an ID attribute.
{: #para-one}

> A blockquote with a title
{:title="The blockquote title"}
{: #myid}

* {:.cls} This item has the class "cls"

{:.ruby}
    Some code here
```
<!-- {: data-highlight="{: #para-one}; {:title=; {:.cls}"} -->

See: [Attribute list definitions](https://kramdown.gettalong.org/syntax.html#attribute-list-definitions)

### References

* [kramdown syntax](https://kramdown.gettalong.org/syntax.html)
* [kramdown parser](https://kramdown.gettalong.org/parser/kramdown.html)
