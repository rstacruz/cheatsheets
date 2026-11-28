---
title: Bulma
subtitle: Flexbox-based CSS framework
logo: { src: /assets/logos/bulma.svg }
category: CSS
prism_languages: [css, html]
weight: -1
last_verified_with: "Bulma 1.0."
created_at: 2017-10-31
updated: 2018-11-19
tier: t3
authors:
  - github: benolot
description: |
  Basic guide on how to use Bulma, the lightweight css flexbox framework.
intro: |
  Bulma reference for responsive breakpoints, columns, modifiers, typography helpers, and WYSIWYG content.
links:
  - title: Responsive breakpoints
    url: https://bulma.io/documentation/start/responsiveness/
  - title: Columns
    url: https://bulma.io/documentation/columns/basics/
  - title: Typography helpers
    url: https://bulma.io/documentation/helpers/typography-helpers/
---

### Screen sizes

```
         768         1024                1216         1408
'     '     '     '     '     '     '     '     '     '     '     '
<---------^------------^------------------^-------------^------------>
  mobile      tablet         desktop         widescreen      fullhd
```

See: [Responsive breakpoints](https://bulma.io/documentation/start/responsiveness/)

### Columns

```css
.container
```

#### Add columns

```html
<div class="columns">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>
```

Wrap as many `.column`'s' as you like in a `.columns` wrapper

See: [Columns](https://bulma.io/documentation/columns/basics/)

### Modifiers

#### Colour classes

```css
.is-primary
.is-link
.is-info
.is-success
.is-warning
.is-danger
```

#### Size classes

```css
.is-small
.is-medium
.is-large
```

#### State classes

```scss
.is-outlined
.is-loading
```

See: [Button](https://bulma.io/documentation/elements/button/)

### Typography Helpers

#### Font sizes

| Class         | Font-size             |
| ---           | ---                   |
| `.is-size-1`  | 3rem                  |
| `.is-size-2`  | 2.5rem                |
| `.is-size-3`  | 2rem                  |
| `.is-size-4`  | 1.5rem                |
| `.is-size-5`  | 1.25rem               |
| `.is-size-6`  | 1rem                  |
| `.is-size-7`  | 0.75rem               |

#### Text alignment

| Class                 | Alignment                             |
| ---                   | ---                                   |
| `.has-text-centered`  | Makes the text **centered**           |
| `.has-text-justified` | Makes the text **justified**          |
| `.has-text-left`.     | Makes the text align to the **left**  |
| `.has-text-right`     | Makes the text align to the **right** |

#### Text transformation

| Class              | Transformation        |
| ---                | ---                   |
| `.is-capitalized`  | Transforms the **first character** of each word to **uppercase**   |
| `.is-lowercase`    | Transforms **all** characters to **lowercase**                     |
| `.is-uppercase`    | Transforms **all** characters to **uppercase**                     |

See: [Typography helpers](https://bulma.io/documentation/helpers/typography-helpers/)

### WYSIWYG Content

```html
<div class="content">
  <!-- start WYSIWYG contents -->
  <h1>Heading</h1>
  <p>Paragraph</p>

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  <!-- end WYSIWYG contents -->
</div>
```

To provide default stylings for commonly generated WYSIWYG contents, use the `.content` class.

See: [Content](https://bulma.io/documentation/elements/content/)
