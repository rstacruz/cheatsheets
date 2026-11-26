---
title: Parsley.js
subtitle: Frontend form validation
updated: 2026-11-25
tier: t3
last_verified_with: "Parsley.js 2.9.2."
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
links:
  - title: Parsley documentation
    url: https://parsleyjs.org/doc/index.html
---

## Parsley
<!-- {: .-three-column} -->

### Installing via npm

```sh
npm install --save parsleyjs
```
<!-- {: data-highlight="npm install --save parsleyjs"} -->

[parsleyjs](https://www.npmjs.com/package/parsleyjs) is the Parsley form validator. ('parsley' is a different package)

See: [Download](https://parsleyjs.org/doc/download.html)

### Enabling

#### via HTML

```html
<form data-parsley-validate>
  <input required>
</form>
```
<!-- {: data-highlight="data-parsley-validate"} -->

#### via JavaScript

```js
$('#form').parsley(/* options */)
```
<!-- {: data-highlight="parsley"} -->

It's preferable to explicitly call `$.fn.parsley()`.

See: [Javascript installation](https://parsleyjs.org/doc/index.html#installation-javascript)

### API

#### Form

```js
$('#myform').parsley()
  .isValid()  // → true | null
  .validate()
  .reset()
  .destroy()
```
<!-- {: data-highlight=".isValid; .validate; .reset; .destroy"} -->

#### Input

```js
$('#myform input').parsley()
  .isValid()
  .validate() // returns errors
```
<!-- {: data-highlight="isValid"} -->

See: [Form API](https://parsleyjs.org/doc/index.html#usage-form)

### Validators

```html
<input ...>
```

#### Required

```html
  required
```
<!-- {: data-highlight="required"} -->

#### Types

```html
  type='email'
  type='url'
  data-parsley-type='url'
```
<!-- {: data-highlight="email; url"} -->

#### Length

```html
  maxlength='6'
  data-parsley-maxlength='6'
  minlength='10'
  data-parsley-minlength='10'
```
<!-- {: data-highlight="data-parsley-maxlength; data-parsley-minlength"} -->

#### Numeric

```html
  pattern='\d+'
  data-parsley-pattern='\d+'
  type='number'
  data-parsley-type='number'
  data-parsley-type='integer'
  data-parsley-type='digits'
  data-parsley-type='alphanum'
```
<!-- {: data-highlight="pattern; number"} -->

#### Range

```html
  type='range'
  data-parsley-range='[6, 10]'
  max='10'
  data-parsley-max='10'
  min='6'
  data-parsley-min='6'
```
<!-- {: data-highlight="range; max; min"} -->

#### Checkboxes

```html
  data-parsley-mincheck='1'
  data-parsley-maxcheck='3'
  data-parsley-check='[1, 3]'
```
<!-- {: data-highlight="data-parsley-mincheck; data-parsley-maxcheck; data-parsley-check"} -->

#### Confirmation

```html
  data-parsley-equalto='#confirm'
```
<!-- {: data-highlight="data-parsley-equalto"} -->

See: [Built-in validators](https://parsleyjs.org/doc/index.html#validators)

## Options

### Form options

#### Inputs

```js
// Supported and excluded inputs by default
inputs: 'input, textarea, select'
excluded: 'input[type=button], input[type=submit], ' +
  'input[type=reset], input[type=hidden]'
```
<!-- {: data-highlight="inputs"} -->

#### Priority

```js
// Stop validating on the highest priority failing constraint
priorityEnabled: true
```
<!-- {: data-highlight="priorityEnabled"} -->

See: [Options](http://parsleyjs.org/doc/annotated-source/defaults.html)

### Field options

#### Multiple

```js
// Identifier that groups inputs, e.g. radio buttons
multiple: null
```
<!-- {: data-highlight="multiple"} -->

#### Group

```js
// Identifier (or list) of the inputs to validate
group: null
```
<!-- {: data-highlight="group"} -->

These options are only available for fields.

See: [Field-only options](https://parsleyjs.org/doc/annotated-source/defaults.html#field-only)

### UI options

```js
// Enable or disable error messages
uiEnabled: true

// Key events before validation runs
validationThreshold: 3

// Field focused on validation error: 'first' | 'last' | 'none'
focus: 'first'

// $.Event() that triggers validation, e.g. keyup or change
trigger: false

// Classes added to every failing field
errorClass: 'parsley-error'
successClass: 'parsley-success'

// Element that receives the classes above; a selector works too
classHandler: function (ParsleyField) {}

// Element where errors are appended; a selector works too
errorsContainer: function (ParsleyField) {}

// ul element that receives the error list
errorsWrapper: '<ul class="parsley-errors-list"></ul>'

// li element that receives each error message
errorTemplate: '<li></li>'
```

See: [UI options](https://parsleyjs.org/doc/annotated-source/defaults.html#ui)

## Examples

### Custom container

```js
$('[data-parsley]').parsley({
  errorsContainer (field) {
    return field.$element.closest('.block, .control')
  }
})
```
<!-- {: data-highlight="errorsContainer"} -->

Appends the error to the closest `.block` or `.control`.

See: [UI for field](https://parsleyjs.org/doc/index.html#ui-for-field)

### Custom markup

```js
$('[data-parsley]').parsley({
  errorClass: '-error',
  successClass: '-success',

  errorsWrapper: '<ul class="parsley-error-list"></ul>',
  errorTemplate: '<li class="parsley-error"></li>'
})
```
<!-- {: data-highlight="errorClass; successClass; errorsWrapper; errorTemplate"} -->

See: [Classes and templates](https://parsleyjs.org/doc/index.html#ui-classes)

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
<!-- {: data-highlight="classHandler"} -->

Applies the `errorClass` and `successClass` to the closest `.input-group`, if available.

See: [UI for field](https://parsleyjs.org/doc/index.html#ui-for-field)

### Custom validator

#### HTML

```html
<input type='text' data-parsley-multiple-of='3' />
```
<!-- {: data-highlight="data-parsley-multiple-of"} -->

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
<!-- {: data-highlight="addValidator"} -->

See: [Custom validators](https://parsleyjs.org/doc/index.html#custom)

## Also see

- [Parsley documentation](http://parsleyjs.org/doc/) _(parsleyjs.org)_
