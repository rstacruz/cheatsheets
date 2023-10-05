---
title: Bootstrap 5
layout: 2017/sheet
prism_languages: [scss, haml, html]
weight: -1
category: CSS
description: |
  .container .row .col-md-6, @screen-sm-min, .form-control, grids, .modal-content, tooltips, and other Bootstrap 5 CSS examples.
---

### Boilerplate

Base template (note the viewport `meta` tag, CSS in the `link` tag and `script` tag at the end of the document):

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>
  <body>
    <h1>Hello, world!</h1>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
</html>
```

CDN links:

* CSS 	https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css
* JS 	https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js

### Screen sizes

| Breakpoint |	Class infix 	| Dimensions |
| --- | --- | --- |
| Extra small | 	None |	<576px |
| Small |	sm |	≥576px |
| Medium |	md |	≥768px |
| Large |	lg |	≥992px |
| Extra large |	xl |	≥1200px |
| Extra extra large |	xxl |	≥1400px |

### Min-width

Mixins:

```scss
// No media query necessary for xs breakpoint as it's effectively `@media (min-width: 0) { ... }`
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }
@include media-breakpoint-up(xxl) { ... }

// Usage

// Example: Hide starting at `min-width: 0`, and then show at the `sm` breakpoint
.custom-class {
  display: none;
}
@include media-breakpoint-up(sm) {
  .custom-class {
    display: block;
  }
}
```

Min-width:

```scss
// X-Small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) { ... }
```

### Max-width

Mixins:

```scss
// No media query necessary for xs breakpoint as it's effectively `@media (max-width: 0) { ... }`
@include media-breakpoint-down(sm) { ... }
@include media-breakpoint-down(md) { ... }
@include media-breakpoint-down(lg) { ... }
@include media-breakpoint-down(xl) { ... }
@include media-breakpoint-down(xxl) { ... }

// Example: Style from medium breakpoint and down
@include media-breakpoint-down(md) {
  .custom-class {
    display: block;
  }
}
```

Max-width:

```scss
// `sm` applies to x-small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// `md` applies to small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// `lg` applies to medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// `xl` applies to large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }

// `xxl` applies to x-large devices (large desktops, less than 1400px)
@media (max-width: 1399.98px) { ... }
```

### Containers

Bootstrap comes with three different containers:

* `.container` which sets a max-width at each responsive breakpoint
* `.container-{breakpoint}` which is width: 100% until the specified breakpoint
* `.container-fluid` which is width: 100% at all breakpoints

Default container:

The default .container class is a responsive, fixed-width container, meaning its max-width changes at each breakpoint.

```html
<div class="container">
  <!-- Content here -->
</div>
```

Responsive containers:

```html
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>
```

Fluid Containers:

```scss
<div class="container-fluid">
  ...
</div>
```

### Grid

Basic template:

```html
<div class="container text-center">
  <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
</div>
```

* Columns using `col-6` then the column will take 6 units from the 12 units available
* Columns using `col` then the column will take an equal share from the remaining space.

Breakpoints:

* Columns using `col-xl-6` then the column will take 6 units from the 12 units available but only at that breakpoint and above.
* Columns using `col-xl` then the column will take an equal share from the remaining space but only at that breakpoint and above.
* Use `col-{breakpoint}-auto` classes to size columns based on the natural width of their content.

Combine multiple classes to change layout at different breakpoints:

```html
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
```

### Offsets

Move columns to the right using .offset-md-* classes. These classes increase the left margin of a column by * columns. For example, .offset-md-4 moves .col-md-4 over four columns.

