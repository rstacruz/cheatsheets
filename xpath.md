---
title: Xpath
layout: default
---

CSS equivalents
---------------

| CSS                    | Xpath                                |
| ---                    | ---                                  |
| `div p`                | `//div//p`                           |
| `ul > li`              | `//ul/li`                            |
| `div > *`              | `//div/*`                            |
| `h1 ~ ul`              | `//h1/following-sibling::ul`         |
| `h1 ~ #id`             | `//h1/following-sibling::[@id="id"]` |
| ---                    | ---                                  |
| `:root`                | `/`                                  |
| `:root > body`         | `/body`                              |
| ---                    | ---                                  |
| `input[type="submit"]` | `//input[@type="submit"]`            |
| `a[href^='/']`         | `//a[starts-with(@href, '/')]`       |
| `a[href$='pdf']`       | `//a[ends-with(@href, '.pdf')]`      |
| ---                    | ---                                  |
| `#id`                  | `//[@id="id"]`                       |
| `.class`               | `//[@class="class"]` *...see below*  |
| ---                    | ---                                  |
| `ul > li:first-child`  | `//ul/li[1]`                         |
| `ul > li:nth-child(2)` | `//ul/li[2]`                         |
| `ul > li:last-child`   | `//ul/li[last()]`                    |
| ---                    | ---                                  |
| `li#id:first-child`    | `//li[@id="id"][1]`                  |
| ---                    | ---                                  |
| `a:first-child`        | `//a[1]`                             |
| `a:last-child`         | `//a[last()]`                        |
| `li:first-of-type`     | `//li[not(preceding-sibling::li)]`   |
{:.greycode.no-head}

### Class check
Xpath doesn't have the "check if part of space-separated list" operator, so this is the workaround:

```sh
//div[contains(concat(' ',normalize-space(@class),' '),' foobar ')]
```

### jQuery equivalents
For things that CSS alone can't do.

| jQuery                       | Xpath                            |
| ------                       | ---                              |
| `$('ul > li').parent()`      | `//ul/li/..`                     |
| `$('li').closest('section')` | `//li/ancestor-or-self::section` |
| `$('a').attr('href')`        | `//a/@href`                      |
| `$('span').text()`           | `//span/text()`                  |
{:.greycode.no-head}


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
Separate your steps with `/`. Use two (`//`) if you don't want direct descendants.

| Axis | Example            |
| ---  | ---                |
| `/` *child* | `//ul/li/a`        |
| `//` *descendant* | `//[@id="list"]//a` |
{:.greycode.no-head}

### Selecting node data

```sh
//a                     #=> <a>
//a/text()              #=> "Go home"
//a/@href               #=> "index.html"
//a/*                   #=> All a's child elements
```

Predicates
----------

### Predicates (`[]`)
Restricts a nodeset only if some condition is true. They can be chained.

```sh
//div[true()] 
//div[@class="head"]
//div[@class="head"][@id="top"]
```

### Operators
Use operators to make conditionals.

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
//ol/li[position()=2]   # ...same as above
```

### Predicate order
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
not(expr)                  # button[not(text()="Submit")]
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

```sh
//ul/li
//div/h1/span
```
{:.light}

### Descendant-or-self axis
When you use `//` for descendants, this is short or `/descendant-or-self::`.

```sh
//div//h4
//div/descendant-or-self::h4

//ul//[last()]
//ul/descendant-or-self::[last()]
```

### Child axis
When no axis is specifid, a step with a `name` is short for `child::name`. This is what makes `//a/b/c` work.

```sh
//ul/li/a
//ul/child::li/child::a
```

### Attribute axis
When you use `@` for attributes, that's short for the `attribute::` axis.

```sh
//a/@href
//a/attribute::href

//div[@id="box"]
//div[attribute::id="box"]
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

More examples
-------------

```sh
//*                 # all elements
count(//*)          # count all elements
//h1[1]/text()      # hext of the first h1 heading
//li[span]          # Find a <li> with an <span> inside it
                    # ...expands to //li[child::span]
//ul/li/..          # use .. to select a parent
```

```sh
# Find a <section> that directly contains h1#section-name
  //section[child::h1[@id='section-name']]
```

```sh
# like jQuery's $().closest('.box')
  ./ancestor-or-self::[@class="box"]
```

```sh
# Find a <section> that contains h1#section-name
# (Same as above, but use descendant-or-self instead of child)
  //section[//*[@id='section-name']]
```

```sh
# Find <item> and check its attributes
  //item[@price > 2*@discount]
```

References
----------

* [Xpath test bed](http://www.whitebeam.org/library/guide/TechNotes/xpathtestbed.rhtm) (whitebeam.org)
