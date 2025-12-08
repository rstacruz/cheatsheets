---
title: Xpath
category: HTML
tags: [Featured]
weight: -5
description: |
  $x('//div//p//*') == $('div p *'), $x('//[@id="item"]') == $('#item'), and many other Xpath examples.
---

## Testing

### Xpath test bed
{: .-intro}

Test queries in the Xpath test bed:

- [Xpath test bed](http://www.whitebeam.org/library/guide/TechNotes/xpathtestbed.rhtm) _(whitebeam.org)_

### Browser console

```js
$x("//div")
```

Works in Firefox and Chromium browsers.

## Selectors

### Descendant selectors

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1`                         | `//h1`                                                   | [?](#prefixes)          |
| `div p`                      | `//div//p`                                               | [?](#axes)              |
| `ul > li`                    | `//ul/li`                                                | [?](#axes)              |
| `ul > li > a`                | `//ul/li/a`                                              |                         |
| `div > *`                    | `//div/*`                                                |                         |
| ----                         | ----                                                     | --                      |
| `:root`                      | `/`                                                      | [?](#prefixes)          |
| `:root > body`               | `/body`                                                  |                         |
{: .xp}

### Attribute selectors

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `#id`                        | `//*[@id="id"]`                                           | [?](#predicates)        |
| `.class`                     | `//*[@class="class"]` *...[kinda](#class-check)*          |                         |
| `input[type="submit"]`       | `//input[@type="submit"]`                                |                         |
| `a#abc[for="xyz"]`           | `//a[@id="abc"][@for="xyz"]`                             | [?](#chaining-order)    |
| `a[rel]`                     | `//a[@rel]`                                              |                         |
| ----                         | ----                                                     | --                      |
| `a[href^='/']`               | `//a[starts-with(@href, '/')]`                           | [?](#string-functions)  |
| `a[href$='pdf']`             | `//a[ends-with(@href, '.pdf')]`                          |                         |
| `a[href*='://']`             | `//a[contains(@href, '://')]`                            |                         |
| `a[rel~='help']`             | `//a[contains(@rel, 'help')]` *...[kinda](#class-check)* |                         |
{: .xp}

### Order selectors

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `ul > li:first-of-type`      | `//ul/li[1]`                                             | [?](#indexing)          |
| `ul > li:nth-of-type(2)`     | `//ul/li[2]`                                             |                         |
| `ul > li:last-of-type`       | `//ul/li[last()]`                                        |                         |
| `li#id:first-of-type`        | `//li[1][@id="id"]`                                      | [?](#chaining-order)    |
| `a:first-child`              | `//*[1][name()="a"]`                                     |                         |
| `a:last-child`               | `//*[last()][name()="a"]`                                |                         |
{: .xp}

### Siblings

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1 ~ ul`                    | `//h1/following-sibling::ul`                             | [?](#using-axes)        |
| `h1 + ul`                    | `//h1/following-sibling::ul[1]`                          |                         |
| `h1 ~ #id`                   | `//h1/following-sibling::[@id="id"]`                     |                         |
{: .xp}

### jQuery

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `$('ul > li').parent()`      | `//ul/li/..`                                             | [?](#other-axes)        |
| `$('li').closest('section')` | `//li/ancestor-or-self::section`                         |                         |
| `$('a').attr('href')`        | `//a/@href`                                              | [?](#steps)             |
| `$('span').text()`           | `//span/text()`                                          |                         |
{: .xp}

### Other things

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1:not([id])`               | `//h1[not(@id)]`                                         | [?](#boolean-functions) |
| Text match                   | `//button[text()="Submit"]`                              | [?](#operators)         |
| Text match (substring)       | `//button[contains(text(),"Go")]`                        |                         |
| Arithmetic                   | `//product[@price > 2.50]`                               |                         |
| Has children                 | `//ul[*]`                                                |                         |
| Has children (specific)      | `//ul[li]`                                               |                         |
| Or logic                     | `//a[@name or @href]`                                    | [?](#operators)         |
| Union (joins results)        | `//a | //div`                                            | [?](#unions)            |
{: .xp}

<style>
/* ensure tables align */
table.xp {table-layout: fixed;}
table.xp tr>:nth-child(1) {width: 35%;}
table.xp tr>:nth-child(2) {width: auto;}
table.xp tr>:nth-child(3) {width: 10%; text-align:right;}
</style>

### Class check

```bash
//div[contains(concat(' ',normalize-space(@class),' '),' foobar ')]
```

Xpath doesn't have the "check if part of space-separated list" operator, so this is the workaround ([source](http://pivotallabs.com/xpath-css-class-matching/)).

Expressions
-----------

### Steps and axes

| `//` | `ul` | `/`  | `a[@id='link']` |
| Axis | Step | Axis | Step            |
{: .-css-breakdown}

### Prefixes

| Prefix | Example               | What     |
| ---    | ---                   | ---      |
| `//`   | `//hr[@class='edge']` | Anywhere |
| `./`   | `./a`                 | Relative |
| `/`    | `/html/body/div`      | Root     |
{: .-headers}

Begin your expression with any of these.

### Axes

| Axis | Example             | What       |
| ---  | ---                 | ---        |
| `/`  | `//ul/li/a`         | Child      |
| `//` | `//[@id="list"]//a` | Descendant |
{: .-headers}

Separate your steps with `/`. Use two (`//`) if you don't want to select direct children.

### Steps

```bash
//div
//div[@name='box']
//[@id='link']
```

A step may have an element name (`div`) and [predicates](#predicate) (`[...]`). Both are optional.
They can also be these other things:

```bash
//a/text()     #=> "Go home"
//a/@href      #=> "index.html"
//a/*          #=> All a's child elements
```

Predicates
----------

### Predicates

```bash
//div[true()]
//div[@class="head"]
//div[@class="head"][@id="top"]
```

Restricts a nodeset only if some condition is true. They can be chained.

### Operators

```bash
# Comparison
//a[@id = "xyz"]
//a[@id != "xyz"]
//a[@price > 25]
```

```bash
# Logic (and/or)
//div[@id="head" and position()=2]
//div[(x and y) or not(z)]
```

Use comparison and logic operators to make conditionals.

### Using nodes

```bash
# Use them inside functions
//ul[count(li) > 2]
//ul[count(li[@class='hide']) > 0]
```

```bash
# This returns `<ul>` that has a `<li>` child
//ul[li]
```

You can use nodes inside predicates.

### Indexing

```bash
//a[1]                  # first <a>
//a[last()]             # last <a>
//ol/li[2]              # second <li>
//ol/li[position()=2]   # same as above
//ol/li[position()>1]   # :not(:first-of-type)
```

Use `[]` with a number, or `last()` or `position()`.

### Chaining order

```bash
a[1][@href='/']
a[@href='/'][1]
```

Order is significant, these two are different.

### Nesting predicates

```
//section[.//h1[@id='hi']]
```

This returns `<section>` if it has an `<h1>` descendant with `id='hi'`.

Functions
---------

### Node functions

```bash
name()                     # //[starts-with(name(), 'h')]
text()                     # //button[text()="Submit"]
                           # //button/text()
lang(str)
namespace-uri()
```

```bash
count()                    # //table[count(tr)=1]
position()                 # //ol/li[position()=2]
```

### Boolean functions

```bash
not(expr)                  # button[not(starts-with(text(),"Submit"))]
```

### String functions

```bash
contains()                 # font[contains(@class,"head")]
starts-with()              # font[starts-with(@class,"head")]
ends-with()                # font[ends-with(@class,"head")]
```

```bash
concat(x,y)
substring(str, start, len)
substring-before("01/02", "/")  #=> 01
substring-after("01/02", "/")   #=> 02
translate()
normalize-space()
string-length()
```

### Type conversion

```bash
string()
number()
boolean()
```

Axes
----

### Using axes

```bash
//ul/li                       # ul > li
//ul/child::li                # ul > li (same)
//ul/following-sibling::li    # ul ~ li
//ul/descendant-or-self::li   # ul li
//ul/ancestor-or-self::li     # $('ul').closest('li')
```

Steps of an expression are separated by `/`, usually used to pick child nodes. That's not always true: you can specify a different "axis" with `::`.

| `//` | `ul` | `/child::` | `li` |
| Axis | Step | Axis       | Step |
{: .-css-breakdown}

### Child axis

```bash
# both the same
//ul/li/a
//child::ul/child::li/child::a
```

`child::` is the default axis. This makes `//a/b/c` work.

```bash
# both the same
# this works because `child::li` is truthy, so the predicate succeeds
//ul[li]
//ul[child::li]
```

```bash
# both the same
//ul[count(li) > 2]
//ul[count(child::li) > 2]
```

### Descendant-or-self axis

```bash
# both the same
//div//h4
//div/descendant-or-self::h4
```

`//` is short for the `descendant-or-self::` axis.

```bash
# both the same
//ul//[last()]
//ul/descendant-or-self::[last()]
```

### Other axes

| Axis                 | Abbrev | Notes                                            |
| ---                  | ---    | ---                                              |
| `ancestor`           |        |                                                  |
| `ancestor-or-self`   |        |                                                  |
| ---                  | ---    | ---                                              |
| `attribute`          | `@`    | `@href` is short for `attribute::href`           |
| `child`              |        | `div` is short for `child::div`                  |
| `descendant`         |        |                                                  |
| `descendant-or-self` | `//`   | `//` is short for `/descendant-or-self::node()/` |
| `namespace`          |        |                                                  |
| ---                  | ---    | ---                                              |
| `self`               | `.`    | `.` is short for `self::node()`                  |
| `parent`             | `..`   | `..` is short for `parent::node()`               |
| ---                  | ---    | ---                                              |
| `following`          |        |                                                  |
| `following-sibling`  |        |                                                  |
| `preceding`          |        |                                                  |
| `preceding-sibling`  |        |                                                  |
{: .-headers}

There are other axes you can use.

### Unions

```bash
//a | //span
```

Use `|` to join two expressions.

More examples
-------------

### Examples

```bash
//*                 # all elements
count(//*)          # count all elements
(//h1)[1]/text()    # text of the first h1 heading
//li[span]          # find a <li> with an <span> inside it
                    # ...expands to //li[child::span]
//ul/li/..          # use .. to select a parent
```

### Find a parent

```bash
//section[h1[@id='section-name']]
```
Finds a `<section>` that directly contains `h1#section-name`

```bash
//section[//h1[@id='section-name']]
```

Finds a `<section>` that contains `h1#section-name`.
(Same as above, but uses descendant-or-self instead of child)

### Closest

```bash
./ancestor-or-self::[@class="box"]
```

Works like jQuery's `$().closest('.box')`.

### Attributes

```bash
//item[@price > 2*@discount]
```

Finds `<item>` and check its attributes

References
----------
{: .-one-column}

* [Xpath test bed](http://www.whitebeam.org/library/guide/TechNotes/xpathtestbed.rhtm) _(whitebeam.org)_
