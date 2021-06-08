---
title: Bulma
category: CSS
layout: 2017/sheet
prism_languages: [css, html]
weight: -1
updated: 2019-05-23
authors:
  - github: benolot
  - github: AmmariJawher
description: |
  Basic guide on how to use Bulma, the lightweight css flexbox framework.
---
### Getting Started

There are several ways to **get started** with Bulma. You can either:
#### Use NPM (recommended):
`npm install bulma`
#### Use the cdnjs CDN: 
https://cdnjs.com/libraries/bulma

#### Download from the repository: 
https://github.com/jgthms/bulma/tree/master/css


### Screen sizes

```
         768         1024                1216         1408
'     '     '     '     '     '     '     '     '     '     '     '
<---------^------------^------------------^-------------^------------->
  mobile      tablet         desktop         widescreen      fullhd
```

### Columns

```css
.container
```
Wrap as many `.column`'s' as you like in a `.columns` wrapper
```html
<div class="columns">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>
```

### Forms

When combining several controls in a **form**, use the `.field` class as a container.
```css
<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="e.g Alex Smith">
  </div>
</div>
```


#### Form controls 

The following form controls **classes** are supported.
```css
.label
.input
.textarea
.select
.checkbox
.radio
.button
.help
```

#### Form icons

You can append one of 2 **modifiers** on a control.
```css
.has-icons-left
.has-icons-right
```

You also need to add a modifier on the **icon**.
```css
.icon is-left
.icon is-right
```
example:
```html
<div class="field">
  <div class="control has-icons-left">
    <input class="input" type="email" placeholder="Email">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
  </div>
</div>
```

### Progress Bar

Bulma uses Native HTML **progress bars**. 
 ```html
<progress class="progress" value="15" max="100">15%</progress>
```

### Modifiers

The following CSS classes affect the **colour**.
```css
.is-primary
.is-link
.is-info
.is-success
.is-warning
.is-danger
```

The following classes modify the **size**.
```css
.is-small
.is-normal
.is-medium
.is-large
```

The following classes modify the **style**.
```scss
.is-outlined
.is-inverted
.is-rounded
```

The following classes modify the **state**.
```scss
.is-hovered
.is-focused
.is-active
.is-loading
```

### Typography Helpers

The following classes modify the **font-size**

| Class         | Font-size             |
| ---           | ---                   |
| `.is-size-1`  | 3rem                  |
| `.is-size-2`  | 2.5rem                |
| `.is-size-3`  | 2rem                  |
| `.is-size-4`  | 1.5rem                |
| `.is-size-5`  | 1.25rem               |
| `.is-size-6`  | 1rem                  |
| `.is-size-7`  | 0.75rem               |

The following classes **align** the text

| Class                 | Alignment                             |
| ---                   | ---                                   |
| `.has-text-centered`  | Makes the text **centered**           |
| `.has-text-justified` | Makes the text **justified**          |
| `.has-text-left`.     | Makes the text align to the **left**  |
| `.has-text-right`     | Makes the text align to the **right** |

The following classes **transform** the text

| Class              | Transformation        |
| ---                | ---                   |
| `.is-capitalized`  | Transforms the **first character** of each word to **uppercase**   |
| `.is-lowercase`    | Transforms **all** characters to **lowercase**                     |
| `.is-uppercase`    | Transforms **all** characters to **uppercase**                     |

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
