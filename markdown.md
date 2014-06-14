---
title: Markdown
layout: default
---

### Headers

    # h1
    ### h3

    Header 1
    ========

    Header 2
    --------

### Links

    [link](http://google.com)

    [link][google]
    [google]: http://google.com

    <http://google.com>

### Images

    ![Image alt text](/path/to/img.jpg)
    ![Image alt text](/path/to/img.jpg "title")
    ![Image alt text][img]

    [img]: http://foo.com/img.jpg

### Emphasis

    *italic*
    _italic_

    **bold**
    __bold__

### Code

        4 space indent

### Blockquotes

    > This is
    > a blockquote
    >
    > > Nested
    > > Blockquote

### Horizontal line

    ----
    ****

Kramdown extensions
-------------------

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
