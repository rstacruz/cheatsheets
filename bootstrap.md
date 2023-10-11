---
title: Bootstrap 3
layout: 2017/sheet
prism_languages: [scss, haml, html]
weight: -1
category: CSS
description: |
  .container .row .col-md-6, @screen-sm-min, .form-control, grids, .modal-content, tooltips, and other Bootstrap CSS examples.
---

### Boilerplate

Setting the viewport:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

For mobile, it is recommended to disable zooming:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

Standard CSS includes:

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -- put at the end of the HTML body -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

### Screen sizes

```
         768          992                1200
'     '     '     '     '     '     '     '     '
<---------^------------^------------------^--------->
     xs         sm              md             lg
   (phone)   (tablet)        (laptop)       (desktop)
```

Min:

```scss
@media (min-width: @screen-sm-min) // >= 768px (small tablet)
@media (min-width: @screen-md-min) // >= 992px (medium laptop)
@media (min-width: @screen-lg-min) // >= 1200px (large desktop)
```

Max:

```scss
@media (max-width: @screen-xs-max) { // < 768px (xsmall phone)
@media (max-width: @screen-sm-max) { // < 992px (small tablet)
@media (max-width: @screen-md-max) { // < 1200px (medium laptop)
```

### Columns

```scss
.container
.container-fluid
```

```scss
.col-xs-1
.col-sm-1
.col-md-1
.col-lg-1
.col-md-offset-1
```

Mixins:

```scss
@include make-xs-column(12);
@include make-sm-column(6);
@include make-md-column(3);
@include make-lg-column(3);
```

```scss
@include make-sm-column-offset(1);
@include make-sm-column-push(1);
@include make-sm-column-pull(1);
```

### Utilities

```scss
.pull-left
.pull-right
```

```scss
.hidden-{xs,sm,md,lg}
.visible-{xs,sm,md,lg}
.visible-{xs,sm,md,lg,print}-{block,inline,inline-block}
```

```scss
.center-block  /* margin: auto */
.clearfix
.text-{center,left,right,justify,nowrap}
.text-{lowercase,uppercase,capitalize}
```

```scss
.show
.hidden
```

### Modal

```html
<a data-toggle='modal' data-target='#new'>
```

```haml
#new.modal.fade(role='dialog')
  .modal-dialog // .modal-lg, .modal-sm
    .modal-content
      .modal-header
        %h4.modal-title hello
        %button.close{type: 'button', data: { dismiss: 'modal' }}
          %span{'aria-hidden' => true}!= "&times;"
          %span.sr-only Close
      .modal-body
        ...
      .modal-footer
        ...
```

### Modal via ajax (Rails)

```haml
%button.btn{data: { |
  toggle: 'modal', |
  target: '#chooseTheme', |
  remote: '/path/to/remote'}
  Change Theme
```

```haml
.modal.fade#chooseTheme
  .modal-dialog.modal-xl
    .modal-content
      .modal-header
        %h4.modal-title Choose a theme

      .modal-body
        .spinner-panel.-lg
          %i
```

### Tooltip

```html
<span
  data-toggle='tooltip'
  title='tooltip'
  data-placement='left|top|bottom|right'>
```

```js
$(function () {
  $('[data-toogle~="tooltip"]').tooltip()
})
```

### Input groups

```haml
.input-group
    input.form-control(type='text')
    .input-group-addon years
```

### Glyphicons

```html
<button type="button" class="btn btn-default" aria-label="Left Align">
  <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
</button>

<button type="button" class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star
</button>
```
