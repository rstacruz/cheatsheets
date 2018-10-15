---
title: CSS
category: CSS
layout: 2017/sheet
weight: -1
keywords:
  - "margin, padding, border"
  - "div, .class, #id, [attr]"
  - "font, background"
  - "display: block, inline, flex"
  - Selectors
  - Properties
---

## Basics
{: .-three-column}

### Selectors

```css
.class {
  font-weight: bold;
}
```
{: .-setup}

| Selector          | Description |
| ----------------- | ----------- |
| `div`             | Element     |
| `.class`          | Class       |
| `#id`             | ID          |
| `[disabled]`      | Attribute   |
| `[role="dialog"]` | Attribute   |

### Combinators

| Selector            | Description       |
| ------------------- | ----------------- |
| `.parent .child`    | Descendant        |
| `.parent > .child`  | Direct descendant |
| `.child + .sibling` | Adjacent sibling  |
| `.child ~ .sibling` | Far sibling       |

### Attribute selectors

| Selector          | Description                         |
| ----------------- | ----------------------------------- |
| `[role="dialog"]` | `=` Exact                           |
| `[class~="box"]`  | `~=` Has word                       |
| `[class|="box"]`  | `|=` Exact or prefix (eg, `value-`) |
| `[href$=".doc"]`  | `$=` Ends in                        |
| `[class*="-is-"]` | `*=` Contains                       |

### Pseudo-classes

| Selector             | Description              |
| -------------------- | ------------------------ |
| `:target`            | eg, `h2#foo:target`      |
| ---                  | ---                      |
| `:disabled`          |                          |
| `:focus`             |                          |
| `:active`            |                          |
| ---                  | ---                      |
| `:nth-child(3)`      | 3rd child                |
| `:nth-child(3n+2)`   | 2nd child in groups of 3 |
| `:nth-child(-n+4)`   |                          |
| ---                  | ---                      |
| `:nth-last-child(2)` |                          |
| `:nth-of-type(2)`    |                          |
| ---                  | ---                      |

### Pseudo-class variations

| Selector          |
| ----------------- |
| `:first-of-type`  |
| `:last-of-type`   |
| `:nth-of-type(2)` |
| `:only-of-type`   |
| ---               |
| `:first-child`    |
| `:last-child`     |
| `:nth-child(2)`   |
| `:only-child`     |
{: .-left-align}

## Fonts
{: .-left-reference}

### Properties

| Property           | Description                          |
| ------------------ | ------------------------------------ |
| `font-family:`     | `<font>, <fontN>`                    |
| `font-size:`       | `<size>`                             |
| `letter-spacing:`  | `<size>`                             |
| `line-height:`     | `<number>`                           |
| ---                | ---                                  |
| `font-weight:`     | `bold` `normal`                      |
| `font-style:`      | `italic` `normal`                    |
| `text-decoration:` | `underline` `none`                   |
| ---                | ---                                  |
| `text-align:`      | `left` `right` `center` `justify`    |
| `text-transform:`  | `capitalize` `uppercase` `lowercase` |
{: .-key-values}

### Shorthand
{: .-prime}

|         | style    | weight | size (required) |     | line-height | family            |
| ------- | -------- | ------ | --------------- | --- | ----------- | ----------------- |
| `font:` | `italic` | `400`  | `14px`          | `/` | `1.5`       | `sans-serif`      |
|         | style    | weight | size (required) |     | line-height | family (required) |
{: .-css-breakdown}

### Example

```css
font-family: Arial;
font-size: 12pt;
line-height: 1.5;
letter-spacing: 0.02em;
color: #aa3322;
```

### Case

```css
text-transform: capitalize; /* Hello */
text-transform: uppercase; /* HELLO */
text-transform: lowercase; /* hello */
```

## Background
{: .-left-reference}

### Properties

| Property                 | Description                              |
| ------------------------ | ---------------------------------------- |
| `background:`            | _(Shorthand)_                            |
| ---                      | ---                                      |
| `background-color:`      | `<color>`                                |
| `background-image:`      | `url(...)`                               |
| `background-position:`   | `left/center/right` `top/center/bottom`  |
| `background-size:`       | `cover` `X Y`                            |
| `background-clip:`       | `border-box` `padding-box` `content-box` |
| `background-repeat:`     | `no-repeat` `repeat-x` `repeat-y`        |
| `background-attachment:` | `scroll` `fixed` `local`                 |
{: .-key-values}

### Shorthand

|               | color  | image         | positionX | positionY |     | size           | repeat      | attachment |
| ------------- | ------ | ------------- | --------- | --------- | --- | -------------- | ----------- | ---------- |
| `background:` | `#ff0` | `url(bg.jpg)` | `left`    | `top`     | `/` | `100px` `auto` | `no-repeat` | `fixed;`   |
| `background:` | `#abc` | `url(bg.png)` | `center`  | `center`  | `/` | `cover`        | `repeat-x`  | `local;`   |
|               | color  | image         | positionX | positionY |     | size           | repeat      | attachment |
{: .-css-breakdown}

### Multiple backgrounds

```css
background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('background.jpg') center center / cover, #333;
```

## Animation
{: .-left-reference}

### Properties

| Property                     | Value                                              |
| ---------------------------- | -------------------------------------------------- |
| `animation:`                 | _(shorthand)_                                      |
| `animation-name:`            | `<name>`                                           |
| `animation-delay:`           | `<time>ms`                                         |
| `animation-duration:`        | `<time>ms`                                         |
| `animation-direction:`       | `normal` `reverse` `alternate` `alternate-reverse` |
| `animation-iteration-count:` | `infinite` `<number>`                              |
| `animation-timing-function:` | `ease` `linear` `ease-in` `ease-out` `ease-in-out` |
{: .-key-values}

### Shorthand

|              | name     | duration | timing-function | delay   | count      | direction           |
| ------------ | -------- | -------- | --------------- | ------- | ---------- | ------------------- |
| `animation:` | `bounce` | `300ms`  | `linear`        | `100ms` | `infinite` | `alternate-reverse` |
|              | name     | duration | timing-function | delay   | count      | direction           |
{: .-css-breakdown}

### Example

```css
animation: bounce 300ms linear 0s infinite normal;
animation: bounce 300ms linear infinite;
animation: bounce 300ms linear infinite alternate-reverse;
```

### Event

```js
.one('webkitAnimationEnd oanimationend msAnimationEnd animationend')
```
