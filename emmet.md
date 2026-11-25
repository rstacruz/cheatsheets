---
title: Emmet
seo_title: Emmet cheatsheet — abbreviations, HTML, CSS
description: "Emmet abbreviations: HTML and CSS nesting, numbering and attributes. Reference."
subtitle: HTML abbreviation expander
category: Markup
prism_languages: [html, css]
last_verified_with: "Emmet 2.4."
updated: 2026-11-25
tier: t3
intro: |
  Emmet is a markup language for expanding CSS rules into HTML
links:
  - title: Emmet documentation
    url: https://docs.emmet.io/
---

### Child: >

```css
nav>ul>li
```
#### Expands to
```html
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```


See: [Child](https://docs.emmet.io/abbreviations/syntax/#child-)

### Sibling: +

```css
section>p+p+p
```
#### Expands to
```html
<section>
  <p></p>
  <p></p>
  <p></p>
</section>
```

See: [Sibling](https://docs.emmet.io/abbreviations/syntax/#sibling-)

### Climb Up: ^

```css
section>header>h1^footer
```
#### Expands to
```html
<section>
  <header>
    <h1></h1>
  </header>
  <footer></footer>
</section>
```

See: [Climb up](https://docs.emmet.io/abbreviations/syntax/#climb-up-)

### Grouping: ()

```css
section>(header>nav>ul>li)+footer>p
```
#### Expands to
```html
<section>
  <header>
    <nav>
      <ul>
        <li></li>
      </ul>
    </nav>
  </header>
  <footer>
    <p></p>
  </footer>
</section>
```

See: [Grouping](https://docs.emmet.io/abbreviations/syntax/#grouping-)

### Multiplication: \*

```css
ul>li*3
```
#### Expands to
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

See: [Multiplication](https://docs.emmet.io/abbreviations/syntax/#multiplication-)

### IDs and Classes: . #

```css
ul.menu>li.menu__item+li#id_item+li.menu__item#id_2
```
#### Expands to
```html
<ul class="menu">
  <li class="menu__item"></li>
  <li id="id_item"></li>
  <li class="menu__item" id="id_2"></li>
</ul>
```

See: [ID and class](https://docs.emmet.io/abbreviations/syntax/#id-and-class)

### Numbering: $

```css
ul>li.item$*3
ul>li.item$$*3
ul>li.item$@-*3
ul>li.item$@3*5
```
#### Expands to
```html
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
</ul>
<ul>
  <li class="item01"></li>
  <li class="item02"></li>
  <li class="item03"></li>
</ul>
<ul>
  <li class="item3"></li>
  <li class="item2"></li>
  <li class="item1"></li>
</ul>
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
  <li class="item6"></li>
  <li class="item7"></li>
</ul>
```

See: [Item numbering](https://docs.emmet.io/abbreviations/syntax/#item-numbering-)

### Attributes: []

```css
input[type="text"]
div[data-attr="test"]
```
#### Expands to
```html
<input type="text" />
<div data-attr="test"></div>
```

See: [Custom attributes](https://docs.emmet.io/abbreviations/syntax/#custom-attributes)

### Text: {}

```css
p{Lorem ipsum}
```
#### Expands to
```html
<p>Lorem ipsum</p>
```

See: [Text](https://docs.emmet.io/abbreviations/syntax/#text-)

### Implicit tags

```css
.default-block
em>.default-inline
ul>.default-list
table>.default-table-row>.default-table-column
```
#### Expands to
```html
<div class="default-block"></div>
<em><span class="default-inline"></span></em>
<ul>
  <li class="default-list"></li>
</ul>
<table>
  <tr class="default-table-row">
    <td class="default-table-column"></td>
  </tr>
</table>
```

See: [Implicit tag names](https://docs.emmet.io/abbreviations/implicit-names/)
