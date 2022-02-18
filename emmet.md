---
title: Emmet
category: Markup
layout: 2017/sheet
prism_languages: [html, css]
updated: 2020-07-03
intro: |
  Emmet is a markup language for expanding CSS rules into HTML
---

### Child: >

```css
nav>ul>li
```
Expands to
```html
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```


### Sibling: +

```css
section>p+p+p
```
Expands to
```html
<section>
  <p></p>
  <p></p>
  <p></p>
</section>
```

### Climb Up: ^

```css
section>header>h1^footer
```
Expands to
```html
<section>
  <header>
    <h1></h1>
  </header>
  <footer></footer>
</section>
```

### Grouping: ()

```css
section>(header>nav>ul>li)+footer>p
```
Expands to
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

### Multiplication: \*

```css
ul>li*3
```
Expands to
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

### IDs and Classes: . #

```css
ul.menu>li.menu__item+li#id_item+li.menu__item#id_2
```
Expands to
```html
<ul class="menu">
  <li class="menu__item"></li>
  <li id="id_item"></li>
  <li class="menu__item" id="id_2"></li>
</ul>
```

### Numbering: $

```css
ul>li.item$*3
ul>li.item$$*3
ul>li.item$@-*3
ul>li.item$@3*5
```
Expands to
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

### Attributes: []

```css
input[type="text"]
div[data-attr="test"]
```
Expands to
```html
<input type="text" />
<div data-attr="test"></div>
```

### Text: {}

```css
p{Lorem ipsum}
```
Expands to
```html
<p>Lorem ipsum</p>
```

### Implicit tags

```css
.default-block
em>.default-inline
ul>.default-list
table>.default-table-row>.default-table-column
```
Expands to
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
