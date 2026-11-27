---
title: CSS
subtitle: Stylesheet language
logo: { src: /assets/logos/css.svg, mono: true }
category: CSS
updated: 2026-11-26
last_verified_with: "CSS Backgrounds 3, CSS Animations 1 (MDN), Chrome 158, Firefox 160."
weight: -1
keywords:
  - "margin, padding, border"
  - "div, .class, #id, [attr]"
  - "font, background"
  - "display: block, inline, flex"
  - Selectors
  - Properties
tier: t3
intro: |
  CSS selectors, fonts, backgrounds, and animations, with the shorthand forms.
links:
  - title: MDN CSS reference
    url: https://developer.mozilla.org/en-US/docs/Web/CSS
  - title: MDN CSS selectors
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
  - title: W3C CSS
    url: https://www.w3.org/Style/CSS/
---

## Basics

<!-- {: .-three-column} -->

### Selectors

```css
.class {
  font-weight: bold;
}
```

<!-- {: .-setup} -->

#### Common selectors

| Selector          | Description  |
| ----------------- | ------------ |
| `*`               | All elements |
| `div`             | Element      |
| `.class`          | Class        |
| `#id`             | ID           |
| `[disabled]`      | Attribute    |
| `[role="dialog"]` | Attribute    |

See: [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)

[XPath cheatsheet](./xpath)
<!-- {: .-crosslink} -->

### Combinators

| Selector            | Description       |
| ------------------- | ----------------- |
| `.parent .child`    | Descendant        |
| `.parent > .child`  | Direct descendant |
| `.child + .sibling` | Adjacent sibling  |
| `.child ~ .sibling` | Far sibling       |
| `.class1.class2`    | Have both classes |

See: [Combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators#combinators)

### Attribute selectors

| Selector           | Description                         |
| ------------------ | ----------------------------------- |
| `[role="dialog"]`  | `=` Exact                           |
| `[class~="box"]`   | `~=` Has word                       |
| `[class|="box"]`   | `|=` Exact or prefix (eg, `value-`) |
| `[href$=".doc"]`   | `$=` Ends in                        |
| `[href^="/index"]` | `^=` Begins with                    |
| `[class*="-is-"]`  | `*=` Contains                       |

See: [Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

### Pseudo-classes

| Selector             | Description                                |
| -------------------- | ------------------------------------------ |
| `:target`            | eg, `h2#foo:target`                        |
| ---                  | ---                                        |
| `:focus`             |                                            |
| `:active`            |                                            |
| ---                  | ---                                        |
| `:nth-child(3)`      | 3rd child                                  |
| `:nth-child(3n+2)`   | 2nd child in groups of 3                   |
| `:nth-child(-n+4)`   | First 4 children                           |
| ---                  | ---                                        |
| `:nth-last-child(2)` |                                            |
| `:nth-of-type(2)`    |                                            |
| ---                  | ---                                        |
| `:checked`           | Checked inputs                             |
| `:disabled`          | Disabled elements                          |
| `:default`           | Default element in a group                 |
| ---                  | ---                                        |
| `:empty`             | Elements without children                  |

See: [Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

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

<!-- {: .-left-align} -->

See: [:first-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child)

## Fonts
<!-- {: .-three-column} -->

### Shorthand
<!-- {: .-full-width} -->

|         | style    | weight | size (required) |     | line-height | family            |
| ------- | -------- | ------ | --------------- | --- | ----------- | ----------------- |
| `font:` | `italic` | `400`  | `14px`          | `/` | `1.5`       | `sans-serif`      |
|         | style    | weight | size (required) |     | line-height | family (required) |

<!-- {: .-css-breakdown} -->

See: [font shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/font#constituent_properties)

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

<!-- {: .-key-values} -->

See: [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)

### Example

```css
font-family: Arial;
font-size: 12pt;
line-height: 1.5;
letter-spacing: 0.02em;
color: #aa3322;
```

See: [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)

### Case

```css
text-transform: capitalize; /* Hello */
text-transform: uppercase; /* HELLO */
text-transform: lowercase; /* hello */
```

See: [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)

## Background

### Shorthand
<!-- {: .-full-width} -->

|               | color  | image         | positionX | positionY |     | size           | repeat      | attachment |
| ------------- | ------ | ------------- | --------- | --------- | --- | -------------- | ----------- | ---------- |
| `background:` | `#ff0` | `url(bg.jpg)` | `left`    | `top`     | `/` | `100px` `auto` | `no-repeat` | `fixed;`   |
| `background:` | `#abc` | `url(bg.png)` | `center`  | `center`  | `/` | `cover`        | `repeat-x`  | `local;`   |
|               | color  | image         | positionX | positionY |     | size           | repeat      | attachment |

<!-- {: .-css-breakdown} -->

See: [background shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/background#constituent_properties)

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

<!-- {: .-key-values} -->

See: [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

### Multiple backgrounds

```css
background:
  linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  ),
  url('bg.jpg') center / cover, #333;
```

See: [Using multiple backgrounds](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Using_multiple_backgrounds)

## Animation
<!-- {: .-three-column} -->

### Shorthand
<!-- {: .-full-width} -->

|              | name     | duration | timing-function | delay   | count      | direction           | fill-mode | play-state |
| ------------ | -------- | -------- | --------------- | ------- | ---------- | ------------------- | --------- | ---------- |
| `animation:` | `bounce` | `300ms`  | `linear`        | `100ms` | `infinite` | `alternate-reverse` | `both`    | `running`  |
|              | name     | duration | timing-function | delay   | count      | direction           | fill-mode | play-state |

<!-- {: .-css-breakdown} -->

See: [animation shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#constituent_properties)

### Properties

| Property                     | Value                                                    |
| ---------------------------- | -------------------------------------------------------- |
| `animation:`                 | _(shorthand)_                                            |
| `animation-name:`            | `<name>`                                                 |
| `animation-duration:`        | `<time>ms`                                               |
| ---                          | ---                                                      |
| `animation-timing-function:` | `ease` `linear` `ease-in` `ease-out` `ease-in-out`       |
| `animation-delay:`           | `<time>ms`                                               |
| `animation-iteration-count:` | `infinite` `<number>`                                    |
| ---                          | ---                                                      |
| `animation-direction:`       | `normal` `reverse` `alternate` `alternate-reverse`       |
| `animation-fill-mode:`       | `none` `forwards` `backwards` `both` `initial` `inherit` |
| `animation-play-state:`      | `running` `paused`                                       |

<!-- {: .-key-values} -->

See: [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

### Example

```css
animation: bounce 300ms linear 0s
  infinite normal;
animation: bounce 300ms linear infinite;
animation: bounce 300ms linear infinite
  alternate-reverse;
animation: bounce 300ms linear 2s infinite
  alternate-reverse forwards running;
```

See: [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)

### Event

```js
el.addEventListener('animationend', onEnd)
```

`animationend` fires once per element; `animationiteration` fires on each repeat. Vendor prefixes are no longer needed.

See: [animationend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)
