---
title: Kramdown
layout: default
---

### For jekyll (gh-pages)

    # _config.yml
    markdown: kramdown
    kramdown:
      input: GFM

### Footnotes (Kramdown)

    This is some text.[^1]. Other text.[^footnote].

    [^1]: Some *crazy* footnote definition.

### Abbreviations (Kramdown)

    This is some text not written in HTML but in another language!

    *[another language]: It's called Markdown
    *[HTML]: HyperTextMarkupLanguage

### Classes and IDs (Kramdown)

    A simple paragraph with an ID attribute.
    {: #para-one}

    > A blockquote with a title
    {:title="The blockquote title"}
    {: #myid}

    * {:.cls} This item has the class "cls"

    {:.ruby}
        Some code here

### References

 * http://kramdown.gettalong.org/syntax.html
