---
title: Xpath
category: HTML
tier: t1
weight: -5
description: |
  $x('//div//p//*') == $('div p *'), $x('//*[@id="item"]') == $('#item'), and many other XPath examples.
updated: 2026-11-05
intro: |
  XPath selects nodes in HTML and XML. Browsers implement XPath 1.0 through `document.evaluate()`; devtools add the `$x()` helper.
links:
  - title: XPath reference
    url: https://developer.mozilla.org/en-US/docs/Web/XML/XPath
  - title: XPath 1.0 specification
    url: https://www.w3.org/TR/1999/REC-xpath-19991116/
---

## Testing

### Browser console

```js
$x('//div')          // array of elements
$x('//li', ul)       // search within a node
```

Works in Firefox and Chromium browsers.

See: [$x()](https://developer.chrome.com/docs/devtools/console/utilities/#xpath-function), [Firefox console helpers](https://firefox-source-docs.mozilla.org/devtools-user/web_console/helpers/index.html)

### document.evaluate()

```js
const result = document.evaluate(
  '//ul/li', document, null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
)
result.snapshotLength     // => 3
result.snapshotItem(0)    // first match
```

Use `document.evaluate()` outside devtools; `$x()` is a console helper.

See: [Using XPath in JavaScript](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Guides/Introduction_to_using_XPath_in_JavaScript)

## Selectors

### Descendant selectors

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1`                         | `//h1`                                                   | [?](#prefixes)          |
| `div p`                      | `//div//p`                                               | [?](#separators)              |
| `ul > li`                    | `//ul/li`                                                | [?](#separators)              |
| `ul > li > a`                | `//ul/li/a`                                              |                         |
| `div > *`                    | `//div/*`                                                |                         |
| ----                         | ----                                                     | --                      |
| `:root`                      | `/html`                                                  | [?](#prefixes)          |
| `:root > body`               | `/html/body`                                             |                         |

<!-- {: .xp} -->

### Attribute selectors

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `#id`                        | `//*[@id="id"]`                                          | [?](#predicates)        |
| `.class`                     | `//*[@class="class"]` *...[kinda](#class-check)*         |                         |
| `input[type="submit"]`       | `//input[@type="submit"]`                                |                         |
| `a#abc[for="xyz"]`           | `//a[@id="abc"][@for="xyz"]`                             | [?](#chaining-order)    |
| `a[rel]`                     | `//a[@rel]`                                              |                         |
| ----                         | ----                                                     | --                      |
| `a[href^='/']`               | `//a[starts-with(@href, '/')]`                           | [?](#string-functions)  |
| `a[href$='pdf']`             | `//a[substring(@href, string-length(@href) - 2) = 'pdf']` | [?](#string-functions)  |
| `a[href*='://']`             | `//a[contains(@href, '://')]`                            |                         |
| `a[rel~='help']`             | `//a[contains(@rel, 'help')]` *...[kinda](#class-check)* |                         |

<!-- {: .xp} -->

### Order selectors

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `ul > li:first-of-type`      | `//ul/li[1]`                                             | [?](#indexing)          |
| `ul > li:nth-of-type(2)`     | `//ul/li[2]`                                             |                         |
| `ul > li:last-of-type`       | `//ul/li[last()]`                                        |                         |
| `li#id:first-of-type`        | `//li[1][@id="id"]`                                      | [?](#chaining-order)    |
| `a:first-child`              | `//*[1][name()="a"]`                                     |                         |
| `a:last-child`               | `//*[last()][name()="a"]`                                |                         |

<!-- {: .xp} -->

### Siblings

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1 ~ ul`                    | `//h1/following-sibling::ul`                             | [?](#using-axes)        |
| `h1 + ul`                    | `//h1/following-sibling::*[1][self::ul]`                 |                         |
| `h1 ~ #id`                   | `//h1/following-sibling::*[@id="id"]`                    |                         |

<!-- {: .xp} -->

### jQuery

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `$('ul > li').parent()`      | `//ul/li/..`                                             | [?](#other-axes)        |
| `$('li').closest('section')` | `//li/ancestor-or-self::section[1]`                      |                         |
| `$('a').attr('href')`        | `//a/@href`                                              | [?](#steps)             |
| `$('span').text()`           | `//span/text()`                                          |                         |

<!-- {: .xp} -->

### Other things

| CSS                          | XPath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1:not([id])`               | `//h1[not(@id)]`                                         | [?](#boolean-functions) |
| Text match                   | `//button[text()="Submit"]`                              | [?](#operators)         |
| Text contains                | `//button[contains(., "Go")]`                            |                         |
| Numeric compare              | `//product[@price > 2.50]`                               |                         |
| ---                          | ---                                                      | ---                     |
| Has children                 | `//ul[*]`                                                |                         |
| Has children (specific)      | `//ul[li]`                                               |                         |
| ---                          | ---                                                      | ---                     |
| Or logic                     | `//a[@name or @href]`                                    | [?](#operators)         |
| Union (joins results)        | `//a | //div`                                            | [?](#unions)            |

<!-- {: .xp} -->

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

XPath has no space-separated token operator. Wrap the attribute in spaces and search for the token; this also works for `rel`.

See: [contains()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains)

## Expressions

### Steps and axes

```bash
//ul/li[1]/a[@href]
```

#### Syntax

| Part      | Example      | Meaning           |
| ---       | ---          | ---               |
| `//`      | `//ul`       | Any descendant    |
| `/`       | `/li`        | Direct child      |
| `li`      | `li`         | Element step      |
| `[1]`     | `li[1]`      | Predicate         |

A path is a series of steps separated by `/`; `//` selects descendants at any depth.

See: [Location steps](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Location-Steps)

### Prefixes

| Prefix | Example               | What     |
| ---    | ---                   | ---      |
| `//`   | `//hr[@class='edge']` | Anywhere |
| `./`   | `./a`                 | Relative |
| `/`    | `/html/body/div`      | Root     |

<!-- {: .-headers} -->

Begin your expression with any of these.

See: [Abbreviated syntax](https://www.w3.org/TR/1999/REC-xpath-19991116/#path-abbrev)

### Separators

| Separator | Example                | Selects    |
| ---       | ---                    | ---        |
| `/`       | `//ul/li/a`            | Child      |
| `//`      | `//*[@id="list"]//a`   | Descendant |

<!-- {: .-headers} -->

Separate your steps with `/`. Use two (`//`) if you don't want to select direct children.

See: [Axes](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes)

### Steps

```bash
//div
//div[@name='box']
//*[@id='link']
```

A step may have an element name (`div`) and [predicates](#predicates) (`[...]`). Both are optional.
They can also be these other things:

```bash
//a/text()     #=> text nodes
//a/@href      #=> href attributes
//a/*          #=> child elements
```

See: [Location steps](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Location-Steps)

## Predicates

### Predicates

```bash
//div[true()]
//div[@class="head"]
//div[@class="head"][@id="top"]
```

Keeps only the nodes for which the condition is true. Predicates can be chained.

See: [Predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates)

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
//div[(h1 or p) and not(@hidden)]
```

```bash
# Arithmetic (div and mod, not / and %)
//item[@price > 2*@discount]
//item[@price div 2 > 4]
//item[position() mod 2 = 1]
```

Use comparison and logic operators to make conditionals.

See: [Booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans)

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

See: [Predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates)

### Indexing

```bash
//a[1]                # first <a> of each parent
(//a)[1]             # first <a> in the document
//a[last()]           # last <a> of each parent
(//a)[last()]        # last <a> in the document
//ol/li[2]            # second <li>
//ol/li[position()=2] # same as above
//ol/li[position()>1] # all but the first
```

Predicates apply to each parent's matches. Wrap the path in `()` to index the whole result.

See: [Predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates)

### Chaining order

```bash
//a[1][@href='/']
//a[@href='/'][1]
```

Order is significant: these two are different.

See: [Predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates)

### Nesting predicates

```bash
//section[.//h1[@id='hi']]
```

This returns `<section>` if it has an `<h1>` descendant with `id='hi'`.

See: [Predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates)

## Functions

### Node-set functions

```bash
name()                  # //*[starts-with(name(), 'h')]
local-name()            # //*[local-name()='item']
namespace-uri()
id('item1')             # element with id="item1"
count()                 # //ul[count(li) > 2]
position()              # //ol/li[position()=2]
last()                  # //ul/li[last()]
```

`text()` and `@attr` are node tests, not functions ([steps](#steps)).

See: [Node-set functions](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Node-Set-Functions)

### Boolean functions

```bash
not(expr)               # //button[not(@disabled)]
boolean(expr)           # boolean('') => false
true()
false()
lang('en')              # //p[lang('en')]
```

See: [Boolean functions](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Boolean-Functions)

### String functions

```bash
contains()              # //font[contains(@class, 'head')]
starts-with()           # //font[starts-with(@class, 'head')]
substring()             # substring('12345', 2, 3) => '234'
substring-before()      # substring-before('01/02', '/') => '01'
substring-after()       # substring-after('01/02', '/') => '02'
concat()                # concat('a', 'b') => 'ab'
string-length()         # //p[string-length() > 80]
normalize-space()       # //p[normalize-space() = 'Hi']
translate()             # translate('ABC', 'ABC', 'abc') => 'abc'
string()                # string(//a/@href) => '/home'
```

```bash
# Case-insensitive text match
//button[contains(
  translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
               'abcdefghijklmnopqrstuvwxyz'),
  'go'
)]
```

```bash
# href ends with .pdf
//a[substring(@href, string-length(@href) - 2) = 'pdf']
```

XPath 1.0 has no `ends-with()`; use `substring()`. XPath 2.0 adds `ends-with()` and `matches()`.

See: [String functions](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-String-Functions)

### Number functions

```bash
sum(//item/@price)      # total of all price attributes
floor(3.7)              # => 3
ceiling(3.2)            # => 4
round(3.5)              # => 4
```

See: [Number functions](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Number-Functions)

### Type conversion

```bash
string(2)               # => "2"
number('3.14')          # => 3.14
boolean(0)              # => false
boolean('')             # => false
boolean('x')            # => true
```

See: [string()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#string), [number()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#number), [boolean()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#boolean)

## Axes

### Using axes

```bash
//ul/li                       # ul > li
//ul/child::li                # ul > li (same)
//ul/following-sibling::li    # ul ~ li
//ul/descendant-or-self::li   # ul li
//ul/ancestor-or-self::li[1]  # $('ul').closest('li')
```

Steps are separated by `/`, usually picking child nodes. Use `::` to pick a different axis.

See: [Axes](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes)

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

See: [Child axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#child)

### Descendant-or-self axis

```bash
# both the same
//div//h4
//div/descendant-or-self::node()/child::h4
```

`//` is short for `descendant-or-self::node()/`.

See: [descendant-or-self axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#descendant-or-self)

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
| `namespace`          |        | Not supported by browsers                        |
| ---                  | ---    | ---                                              |
| `self`               | `.`    | `.` is short for `self::node()`                  |
| `parent`             | `..`   | `..` is short for `parent::node()`               |
| ---                  | ---    | ---                                              |
| `following`          |        |                                                  |
| `following-sibling`  |        |                                                  |
| `preceding`          |        |                                                  |
| `preceding-sibling`  |        |                                                  |

<!-- {: .-headers} -->

There are other axes you can use.

See: [Axes](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes)

### Unions

```bash
//a | //span
```

Use `|` to join two expressions.

See: [Node-sets](https://www.w3.org/TR/1999/REC-xpath-19991116/#node-sets)

## More examples

### Examples

```bash
//*                 # all elements
count(//*)          # count all elements
(//h1)[1]/text()    # text of the first h1 heading
//li[span]          # find a <li> with a direct <span> child
                    # ...expands to //li[child::span]
//ul/li/..          # use .. to select a parent
```

See: [XPath](https://developer.mozilla.org/en-US/docs/Web/XML/XPath)

### Find a parent

```bash
//section[h1[@id='section-name']]
```

Finds a `<section>` that directly contains `h1#section-name`.

```bash
//section[.//h1[@id='section-name']]
```

Finds a `<section>` that contains `h1#section-name` anywhere.
The leading `.` makes the inner path relative to the section.

See: [Child axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#child), [descendant-or-self axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#descendant-or-self)

### Closest

```bash
./ancestor-or-self::*[
  contains(concat(' ', normalize-space(@class), ' '), ' box ')
][1]
```

Works like jQuery's `$().closest('.box')`.

See: [ancestor-or-self axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#ancestor-or-self)

### Attributes

```bash
//item[@price > 2*@discount]
```

Finds `<item>` whose price is more than twice its discount.

See: [Attribute axis](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Axes#attribute)

## References

<!-- {: .-one-column} -->

* [XPath 1.0 specification](https://www.w3.org/TR/1999/REC-xpath-19991116/) _(w3.org)_
* [XPath reference](https://developer.mozilla.org/en-US/docs/Web/XML/XPath) _(MDN)_
* [CSS selectors compared to XPath](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Guides/Comparison_with_CSS_selectors) _(MDN)_
* [XPath 3.1](https://www.w3.org/TR/xpath-31/) _(w3.org)_
