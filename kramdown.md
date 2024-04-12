---
title: Kramdown
category: Markup
---

### About
{: .-intro}

Kramdown is a Markdown parser in Ruby.

- <https://kramdown.gettalong.org/>

### Configuration

 * `parse_block_html` - process kramdown syntax inside blocks
 * `parse_span_html` - process kramdown syntax inside inlines
 * `html_to_native` - convert html elements to native elements

    {::options parse_block_html="true" /}

For the GFM parser:

 * `hard_wrap`

http://kramdown.gettalong.org/parser/gfm.html

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
 * http://kramdown.gettalong.org/parser/kramdown.html
