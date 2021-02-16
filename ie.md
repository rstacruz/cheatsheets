---
title: Internet Explorer
category: HTML
layout: 2017/sheet
updated: 2018-03-06
---

## Support table
{: .-one-column}

### CSS Selectors

| Feature                                                    | IE6 | IE7 | IE8 | IE9 | IE10 |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   |
| `>` _(descendant)_                                         |     | 7 ✓ | ✓   | ✓   | ✓    |
| `[attr]` _(attribute)_                                     |     | 7 ✓ | ✓   | ✓   | ✓    |
| `.class1.class2` _(multiple classes)_                      |     | 7 ✓ | ✓   | ✓   | ✓    |
| `~` _(sibling)_                                            |     | 7 ✓ | ✓   | ✓   | ✓    |
| `+` _(adjacent)_                                           |     | 7 ✓ | ✓   | ✓   | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   |
| `:first-child` <sup>\*</sup>                               |     |     | 8 ✓ | ✓   | ✓    |
| `:focus`                                                   |     |     | 8 ✓ | ✓   | ✓    |
| `:before` `:after` _(single colon only)_                   |     |     | 8 ✓ | ✓   | ✓    |
| `:lang`                                                    |     |     | 8 ✓ | ✓   | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   |
| `:first-of-type`, `:last-of-type`                          |     |     |     | 9 ✓ | ✓    |
| `:last-child`                                              |     |     |     | 9 ✓ | ✓    |
| `:empty`                                                   |     |     |     | 9 ✓ | ✓    |
| `:enabled` `:disabled` `:checked`                          |     |     |     | 9 ✓ | ✓    |
| `:not()`                                                   |     |     |     | 9 ✓ | ✓    |
| `:nth-child()` `:nth-last-child()`                         |     |     |     | 9 ✓ | ✓    |
| `:nth-of-type()` `:nth-last-of-type()` `:only-of-type()`   |     |     |     | 9 ✓ | ✓    |
| `:only-child()`                                            |     |     |     | 9 ✓ | ✓    |
| `:target`                                                  |     |     |     | 9 ✓ | ✓    |
| `::selection`                                              |     |     |     | 9 ✓ | ✓    |
| `:root`                                                    |     |     |     | 9 ✓ | ✓    |
{: .-headers.-no-wrap}

`first-child:` doesn't work for elements inserted via JS.

### CSS properties

| Feature                                                    | IE6 | IE7 | IE8 | IE9 | IE10 | IE11 |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| `max-width`                                                |     | 7 ✓ | ✓   | ✓   | ✓    | ✓    |
| `position: fixed`                                          |     | 7 ✓ | ✓   | ✓   | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| `outline`                                                  |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `display: inline-block` <sup>\*</sup>                      |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `display: table`                                           |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `border-collapse`, `border-spacing`, `table-layout`, ...   |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `whitespace: pre-wrap`                                     |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `whitespace: pre-line`                                     |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| `box-sizing`                                               |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| `background-clip`                                          |     |     |     | 9 ✓ | ✓    | ✓    |
| `background-origin`                                        |     |     |     | 9 ✓ | ✓    | ✓    |
| `background-size`                                          |     |     |     | 9 ✓ | ✓    | ✓    |
| `background: x, y, z` _(multiple backgrounds)_             |     |     |     | 9 ✓ | ✓    | ✓    |
| `opacity`                                                  |     |     |     | 9 ✓ | ✓    | ✓    |
| `border-radius`                                            |     |     |     | 9 ✓ | ✓    | ✓    |
| `box-shadow`                                               |     |     |     | 9 ✓ | ✓    | ✓    |
| `rgba()`                                                   |     |     |     | 9 ✓ | ✓    | ✓    |
| `transform`                                                |     |     |     | 9 ✓ | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| `animation`                                                |     |     |     |     | 10 ✓ | ✓    |
| `transition`                                               |     |     |     |     | 10 ✓ | ✓    |
| `linear-gradient()`                                        |     |     |     |     | 10 ✓ | ✓    |
| `text-shadow` — [polyfill][text-shadow]                    |     |     |     |     | 10 ✓ | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| `border-image`                                             |     |     |     |     |      | 11 ✓ |
{: .-headers.-no-wrap}

`inline-block:` IE6/7 can only support inline-block for elements that are naturally inline, like span

### Features

| Feature                                                    | IE6 | IE7 | IE8 | IE9 | IE10 | IE11 |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| PNG alpha transparency                                     |     | 7 ✓ | ✓   | ✓   | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| data URI [⊙][datauri]                                      |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| JS: JSON parsing [⊙][json]                                 |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| JS: Cross-origin resource sharing [⊙][cors]                |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| JS: Local storage [⊙][localstorage]                        |     |     | 8 ✓ | ✓   | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| CSS: `@media` queries — [polyfill][respond]                |     |     |     | 9 ✓ | ✓    | ✓    |
| HTML: new HTML5 elements - [polyfill][html5shiv]           |     |     |     | 9 ✓ | ✓    | ✓    |
| HTML: `<canvas>`                                           |     |     |     | 9 ✓ | ✓    | ✓    |
| HTML: `<svg>`                                              |     |     |     | 9 ✓ | ✓    | ✓    |
| HTML: `<img src='image.svg'>`                              |     |     |     | 9 ✓ | ✓    | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| CSS: flexbox [⊙][flexbox] <sup>\*</sup>                    |     |     |     |     | 10 ✓ | ✓    |
| HTML: `<input placeholder='..'>` [⊙][placeholder]          |     |     |     |     | 10 ✓ | ✓    |
| HTML: `<input type='range'>`                               |     |     |     |     | 10 ✓ | ✓    |
| HTML: `<input required>` [⊙][validation]                   |     |     |     |     | 10 ✓ | ✓    |
| JS: Web sockets                                            |     |     |     |     | 10 ✓ | ✓    |
| ---------------------------------------------------------- | -   | -   | -   | -   | --   | --   |
| JS: Fullscreen mode                                        |     |     |     |     |      | 11 ✓ |
{: .-headers.-no-wrap}

`flexbox:` IE10 only supports the 2012 syntax with -ms- prefix.

## Polyfills

### IE polyfills

Always install these in almost every project:

 - [json2] for JSON parsing (for IE7 below)
 - [selectivizr] for selectors (for IE8 below)
 - [html5shiv] for new HTML tags (for IE8 below)
 - [respond] for media queries (for IE8 below)
 - See [this article](http://ricostacruz.com/til/ie-polyfills.html) for info

```html
<!--[if lt IE 9]>
<script src='https://cdnjs.cloudflare.com/ajax/libs/nwmatcher/1.2.5/nwmatcher.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.min.js'>
<script src='https://cdn.rawgit.com/gisu/selectivizr/1.0.3/selectivizr.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js'>
<script src='https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js'>
<![endif]--> 
```

### You may also need

 - [modernizr] for feature detection

### for CSS3 decorations

 - [css3pie]
 - [cssSandpaper]
 - [ecsstender]

See: [Cross-browser polyfills list][fills]

Misc
----

### IE Conditional comment HTML

```html
<!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class=""> <!--<![endif]-->
```

### IE conditionals

```html
<!--[if IE]>      I'm IE      <![endif]-->
<!--[if !IE]> --> Not IE <!-- <![endif]-->
```

[text-shadow]: https://github.com/heygrady/textshadow
[ie7.js]: http://ie7-js.googlecode.com/svn/test/index.html
[selectivizr]: http://selectivizr.com/
[css3pie]: http://css3pie.com/
[cssSandpaper]: https://github.com/zoltan-dulac/cssSandpaper
[html5shiv]: https://code.google.com/p/html5shiv/
[fills]: https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
[json2]: https://github.com/douglascrockford/JSON-js
[modernizr]: https://modernizr.com
[ecsstender]: http://ecsstender.org/
[respond]: https://github.com/scottjehl/Respond
[flexbox]: https://caniuse.com/#feat=flexbox
[cors]: https://caniuse.com/#feat=cors
[localstorage]: https://caniuse.com/#feat=localstorage
[json]: https://caniuse.com/#feat=json
[datauri]: https://caniuse.com/#feat=datauri
[validation]: https://caniuse.com/#search=validation
[placeholder]: https://caniuse.com/#feat=input-placeholder
