title: Internet Explorer
---

## Only in IE7+

Selectors:

 - `>` _(descendant)_
 - `[attr]` _(attribute)_
 - `.class1.class2` _(multiple classes)_
 - `~` _(sibling)_

CSS properties:

 - `max-width`
 - `position: fixed`

## Only in IE8+

Selectors/pseudos: ([polyfill][selectivizr])

 - `+` _(adjacent)_
 - `:first-child` _(unless for static elements)_
 - `:focus`
 - `:before`, `:after` _(single colon only)_

CSS properties:

 - `outline`
 - `display: inline-block` _(only for `<span>` and inlines)_
 - `display: table`
 - `whitespace: pre-wrap`
 - `whitespace: pre-line`
 - `border-collapse`, `border-spacing`, `table-layout`, ...
 - `box-sizing`

Features:

 - PNG alpha transparency
 - `data:` URI

JS features:

 - JSON parsing
 - Cross-origin resource sharing

## Only in IE9+

Selectors/pseudos: ([polyfill][selectivizr])

 - `:first-of-type`, `:last-of-type`
 - `:last-child`
 - `:empty`
 - `:enabled`, `:disabled`, `:checked`
 - `:not()`
 - `:nth-child()`, `:nth-last-child()`,
 - `:nth-of-type()`, `:nth-last-of-type()`, `:only-of-type()`
 - `:only-child()`
 - `:target`
 - `::selection`

CSS properties:

 - `background-clip`
 - `background-origin`
 - `background-size`
 - `background: x, y, z` _(multiple backgrounds)_
 - `opacity`
 - `border-radius`
 - `box-shadow`
 - `rgba()`
 - `transform`

CSS features:

 - `@media` queries

HTML5 features:

 - `<canvas>`
 - `<svg>`
 - `<img src='image.svg'>`

## Only in IE10+

CSS features:

 - `-ms-animation`
 - `transition`
 - `linear-gradient()`

Features:

 - `<input placeholder='..'>`
 - `<input type='range'>`

HTML5 features:

 - Web sockets

## Not in IE10 (or below) at all

CSS properties:

 - `text-shadow` ([polyfill][text-shadow])

## Polyfills

Always install these in almost every project:

 - [selectivizr] for selectors
 - [html5shiv] for new HTML tags
 - [json2] for JSON parsing (IE7 below)

You may also need these:

 - [modernizr] for feature detection

for CSS3 decorations:

 - [css3pie]
 - [cssSandpaper]
 - [ecsstender]

Also see:

 - [Cross-browser polyfills list][fills]

Misc
----

### IE Conditional comment HTML

    <!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
    <!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
    <!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
    <!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html class=""> <!--<![endif]-->

### IE conditionals

    <!--[if IE]>      I'm IE      <![endif]-->
    <!--[if !IE]> --> Not IE <!-- <![endif]-->

### iPhone viewport

 * "Static" = doesn't work for elements inserted via JS

[text-shadow]: https://github.com/heygrady/textshadow
[ie7.js]: http://ie7-js.googlecode.com/svn/test/index.html
[selectivizr]: http://selectivizr.com/
[css3pie]: http://css3pie.com/
[cssSandpaper]: https://github.com/zoltan-dulac/cssSandpaper
[html5shiv]: https://code.google.com/p/html5shiv/
[fills]: https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
[json2]: https://github.com/douglascrockford/JSON-js
[eccstender]: http://ecsstender.org/
