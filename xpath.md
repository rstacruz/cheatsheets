---
title: Xpath
category: HTML
---

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
{:.greycode.no-head.xp}

### Attribute selectors

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `#id`                        | `//[@id="id"]`                                           | [?](#predicates)        |
| `.class`                     | `//[@class="class"]` *...[kinda](#class-check)*          |                         |
| `input[type="submit"]`       | `//input[@type="submit"]`                                |                         |
| `a#abc[for="xyz"]`           | `//a[@id="abc"][@for="xyz"]`                             | [?](#chaining-order)    |
| `a[rel]`                     | `//a[@rel]`                                              |                         |
| ----                         | ----                                                     | --                      |
| `a[href^='/']`               | `//a[starts-with(@href, '/')]`                           | [?](#string-functions)  |
| `a[href$='pdf']`             | `//a[ends-with(@href, '.pdf')]`                          |                         |
| `a[href~='://']`             | `//a[contains(@href, '://')]` *...[kinda](#class-check)* |                         |
{:.greycode.no-head.xp}

### Order selectors

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `ul > li:first-child`        | `//ul/li[1]`                                             | [?](#indexing)          |
| `ul > li:nth-child(2)`       | `//ul/li[2]`                                             |                         |
| `ul > li:last-child`         | `//ul/li[last()]`                                        |                         |
| `li#id:first-child`          | `//li[@id="id"][1]`                                      |                         |
| `a:first-child`              | `//a[1]`                                                 |                         |
| `a:last-child`               | `//a[last()]`                                            |                         |
{:.greycode.no-head.xp}

### Siblings

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `h1 ~ ul`                    | `//h1/following-sibling::ul`                             | [?](#using-axes)        |
| `h1 + ul`                    | `//h1/following-sibling::ul[1]`                          |                         |
| `h1 ~ #id`                   | `//h1/following-sibling::[@id="id"]`                     |                         |
{:.greycode.no-head.xp}

### jQuery

| CSS                          | Xpath                                                    | ?                       |
| ----                         | ----                                                     | --                      |
| `$('ul > li').parent()`      | `//ul/li/..`                                             | [?](#other-axes)        |
| `$('li').closest('section')` | `//li/ancestor-or-self::section`                         |                         |
| `$('a').attr('href')`        | `//a/@href`                                              | [?](#steps)             |
| `$('span').text()`           | `//span/text()`                                          |                         |
{:.greycode.no-head.xp}

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
{:.greycode.no-head.xp}

<style>
/* ensure tables align */
table.xp {table-layout: fixed;}
table.xp tr>:nth-child(1) {width: 30%;}
table.xp tr>:nth-child(2) {width: auto;}
table.xp tr>:nth-child(3) {width: 10%; text-align:right;}
</style>

### Class check
Xpath doesn't have the "check if part of space-separated list" operator, so this is the workaround ([source](http://pivotallabs.com/xpath-css-class-matching/)):

```sh
//div[contains(concat(' ',normalize-space(@class),' '),' foobar ')]
```
{:.light}

Expressions
-----------

### Prefixes
Begin your expression with any of these.

| Prefix          | Example               |
| ---             | ---                   |
| `//` *anywhere* | `//hr[@class='edge']` |
| `./` *relative* | `./a`                 |
| `/` *root*      | `/html/body/div`      |
{:.greycode.no-head}

### Axes
Separate your steps with `/`. Use two (`//`) if you don't want to select direct children.

| Axis | Example            |
| ---  | ---                |
| `/` *child* | `//ul/li/a`        |
| `//` *descendant* | `//[@id="list"]//a` |
{:.greycode.no-head}

### Steps
A step may have an element name (`div`) and [predicates](#predicate) (`[...]`). Both are optional.

```sh
//div
//div[@name='box']
//[@id='link']
```
{:.light}

They can also be these other things.

```sh
//a/text()              #=> "Go home"
//a/@href               #=> "index.html"
//a/*                   #=> All a's child elements
```

Predicates
----------

### Predicates (`[...]`)
Restricts a nodeset only if some condition is true. They can be chained.

```sh
//div[true()] 
//div[@class="head"]
//div[@class="head"][@id="top"]
```
{:.light}

### Operators
Use comparison and logic operators to make conditionals.

```sh
# Comparison
  //a[@id = "xyz"]
  //a[@id != "xyz"]
  //a[@price > 25]
```

```sh
# Logic (and/or)
  //div[@id="head" and position()=2]
  //div[(x and y) or not(z)]
```

### Using nodes
You can use nodes inside predicates.

```sh
# Use them inside functions
  //ul[count(li) > 2]
  //ul[count(li[@class='hide']) > 0]
```

```sh
# This returns `<ul>` that has a `<li>` child
  //ul[li]
```

### Indexing
Use `[]` with a number, or `last()` or `position()`.

```sh
//a[1]                  # first <a>
//a[last()]             # last <a>
//ol/li[2]              # second <li>
//ol/li[position()=2]   # same as above
//ol/li[position()>1]   # :not(:first-child)
```

### Chaining order
Order is significant, these two are different.

```sh
a[1][@href='/']
a[@href='/'][1]
```

### Nesting predicates
This returns `<section>` if it has an `<h1>` descendant with `id='hi'`.

```
//section[//h1[@id='hi']]
```


Functions
---------

### Node functions

```sh
name()                     # //[starts-with(name(), 'h')]
text()                     # //button[text()="Submit"]
                           # //button/text()
lang(str)
namespace-uri()

count()                    # //table[count(tr)=1]
position()                 # //ol/li[position()=2]
```

### Boolean functions

```sh
not(expr)                  # button[not(starts-with(text(),"Submit"))]
```

### String functions

```sh
contains()                 # font[contains(@class,"head")]
starts-with()              # font[starts-with(@class,"head")]
ends-with()                # font[ends-with(@class,"head")]

concat(x,y)
substring(str, start, len)
substring-before("01/02", "/")  #=> 01
substring-after("01/02", "/")   #=> 02
translate()
normalize-space()
string-length()
```

### Type conversion

```sh
string()
number()
boolean()
```

Axes
----

### Using axes
Steps of an expression are separated by `/`, usually used to pick child nodes. That's not always true: you can specify a different "axis" with `::`.

```sh
//ul/li                       # ul > li
//ul/child::li                # ul > li (same)
//ul/following-sibling::li    # ul ~ li
//ul/descendant-or-self::li   # ul li
//ul/ancestor-or-self::li     # $('ul').closest('li')
```
{:.light}

### Child axis
This is the default axis. This makes `//a/b/c` work.

```sh
# both the same
  //ul/li/a
  //child::ul/child::li/child::a
```

```sh
# both the same
# this works because `child::li` is truthy, so the predicate succeeds
  //ul[li]
  //ul[child::li]
```

```sh
# both the same
  //ul[count(li) > 2]
  //ul[count(child::li) > 2]
```

### Descendant-or-self axis
`//` is short for the `descendant-or-self::` axis.

```sh
# both the same
  //div//h4
  //div/descendant-or-self::h4
```

```sh
# both the same
  //ul//[last()]
  //ul/descendant-or-self::[last()]
```

### Other axes
There are other axes you can use.

| Axis                 | Abbrev | Description                                      |
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
{:.greycode}

### Unions
Use `|` to join two expressions.

```sh
//a | //span
```

More examples
-------------

```sh
//*                 # all elements
count(//*)          # count all elements
(//h1)[1]/text()    # text of the first h1 heading
//li[span]          # find a <li> with an <span> inside it
                    # ...expands to //li[child::span]
//ul/li/..          # use .. to select a parent
```

```sh
# Find a <section> that directly contains h1#section-name
  //section[h1[@id='section-name']]
```

```sh
# Find a <section> that contains h1#section-name
# (Same as above, but use descendant-or-self instead of child)
  //section[//*[@id='section-name']]
```

```sh
# like jQuery's $().closest('.box')
  ./ancestor-or-self::[@class="box"]
```

```sh
# Find <item> and check its attributes
  //item[@price > 2*@discount]
```

References
----------

* [Xpath test bed](http://www.whitebeam.org/library/guide/TechNotes/xpathtestbed.rhtm) (whitebeam.org)
