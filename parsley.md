---
title: Parsley.js
updated: 2018-12-06
weight: -1
category: JavaScript libraries
keywords:
  - "data-parsley-validate"
  - "$('#form').parsley()"
  - errorClass
  - successClass
  - classHandler
  - errorsContainer
  - errorsWrapper
  - errorTemplate
intro: |
  [Parsley](http://parsleyjs.org/doc/) provides frontend form validation.
---

## Parsley
{: .-three-column}

### Installing via NPM

```
npm install --save parsleyjs
```

[parsleyjs](https://www.npmjs.com/package/parsleyjs) is the Parsley form validator. ('parsley' is a different package)

### Enabling

#### via HTML

```html
<form data-parsley-validate>
<!-- ✗ not preferred -->
```

#### via JavaScript

```js
$('#form').parsley(/* options */)
```

It's preferable to explicitly call `$.fn.parsley()`.

### API

#### Form

```js
$('#myform').parsley()
  .isValid()  // → true | null
  .validate()
  .reset()
  .destroy()
```

#### Input

```js
$('#myform input').parsley()
  .isValid()
  .validate() // returns errors
```

### Validators

```html
<input ...>
```

#### Required

```html
  required
```

#### Types

```html
  type='email'
```

```html
  type='url'
  data-parsley-type='url'
```

#### Length

```html
  maxlength='6'
  data-parsley-maxlength='6'
  minlength='10'
  data-parsley-minlength='10'
```

#### Numeric

```html
  pattern='\d+'
  data-parsley-pattern='\d+'
```

```html
  type='number'
  data-parsley-type='number'
  data-parsley-type='integer'
  data-parsley-type='digits'
  data-parsley-type='alphanum'
```

#### Range

```html
  type='range'
  data-parsley=range='[6, 10]'
```

```html
  max='10'
  data-parsley-max='10'
  min='6'
  data-parsley-min='6'
```

#### Checkboxes

```html
  data-parsley-mincheck='1'
  data-parsley-maxcheck='3'
  data-parsley-check='[1, 3]'
```

#### Confirmation

```html
  data-parsley-equalto='#confirm'
```

## Options

### Form options

```js
// Supported & excluded inputs by default
  inputs: 'input, textarea, select'
  excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]'
```

```js
// Stop validating field on highest priority failing constraint
  priorityEnabled: true
```

See: [Options](http://parsleyjs.org/doc/annotated-source/defaults.html)

### Field options

```js
// identifier used to group together inputs
// (e.g. radio buttons…)
  multiple: null
```

```js
// identifier (or array of identifiers) used to
// validate only a select group of inputs
  group: null
```

These options are only available for fields.

### UI Options

```js
// Enable/disable error messages
  uiEnabled: true
```

```js
// Key events threshold before validation
  validationThreshold: 3
```

```js
// Focused field on form validation error. ‘first’|’last’|’none’
  focus: 'first'
```

```js
// $.Event() that will trigger validation. eg: keyup, change…
  trigger: false
```

```js
// Class that would be added on every failing validation
// Parsley field
  errorClass: 'parsley-error'
  successClass: 'parsley-success'
```

```js
// Return the $element that will receive these above
// success or error classes. Could also be (and given
// directly from DOM) a valid selector like '#div'
  classHandler: function (ParsleyField) {}
```

```js
// Return the $element where errors will be appended.
// Could also be (and given directly from DOM) a valid
// selector like '#div'
  errorsContainer: function (ParsleyField) {}
```

```js
// ul elem that would receive errors’ list
  errorsWrapper: '<ul class="parsley-errors-list"></ul>'
```

```js
// li elem that would receive error message
  errorTemplate: '<li></li>'
```

## Examples

### Custom container

```js
$('[data-parsley]').parsley({
  errorsContainer (field) {
    return field.$element.closest('.block, .control')
  }
})
```

Appends the error to the closest `.block` or `.control`.

### Custom markup

```js
$('[data-parsley]').parsley({
  errorClass: '-error',
  successClass: '-success',

  errorsWrapper: '<ul class="parsley-error-list"></ul>',
  errorTemplate: '<li class="parsley-error"></li>'
})
```

Uses custom markup.

### Custom fields

```js
$('[data-parsley]').parsley({
  classHandler (field) {
    const $parent = field.$element.closest('.input-group')
    if ($parent.length) return $parent

    return field.$element
  }
})
```

Applies the `errorClass` and `successClass` to the closest `.input-group`, if available.

### Custom validator

#### HTML

```html
<input type='text' data-parsley-multiple-of='3' />
```

#### JavaScript

```js
window.Parsley
  .addValidator('multipleOf', {
    // string | number | integer | date | regexp | boolean
    requirementType: 'integer',

    // validateString | validateDate | validateMultiple
    validateNumber (value, requirement) {
      return 0 === value % requirement
    },

    messages: {
      en: 'This value should be a multiple of %s'
    }
  })
```

See: [Custom validators](http://parsleyjs.org/doc/index.html#custom)

## Also see

- [Parsley documentation](http://parsleyjs.org/doc/) _(parsleyjs.org)_
