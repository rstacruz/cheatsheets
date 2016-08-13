---
title: Parsley.js
layout: default-ad
---

### Enabling

```html
<form data-parsley-validate> <!-- not preferred -->
```

```js
$('#form').parsley(/* options */)
```

### [Options](http://parsleyjs.org/doc/annotated-source/defaults.html)

```js
// Supported & excluded inputs by default
  inputs: 'input, textarea, select'
  excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]'

// Stop validating field on highest priority failing constraint
  priorityEnabled: true
```

### Options (Field only)

```js
// identifier used to group together inputs (e.g. radio buttons…)
  multiple: null

// identifier (or array of identifiers) used to validate only a select group of inputs
  group: null
```

### Options (UI)

```js
// Enable\Disable error messages
  uiEnabled: true

// Key events threshold before validation
  validationThreshold: 3

// Focused field on form validation error. ‘first’|’last’|’none’
  focus: 'first'

// $.Event() that will trigger validation. eg: keyup, change…
  trigger: false

// Class that would be added on every failing validation Parsley field
  errorClass: 'parsley-error'
  successClass: 'parsley-success'

// Return the $element that will receive these above success or error classes Could also be (and given directly from DOM) a valid selector like '#div'
  classHandler: function (ParsleyField) {}

// Return the $element where errors will be appended Could also be (and given directly from DOM) a valid selector like '#div'
  errorsContainer: function (ParsleyField) {}

// ul elem that would receive errors’ list
  errorsWrapper: '<ul class="parsley-errors-list"></ul>'

// li elem that would receive error message
  errorTemplate: '<li></li>'
```

### Form API

```js
$('#myform').parsley()
  .isValid()  // true or null
  .validate()

  .reset()
  .destroy()

$('#myform input').parsley()

  .isValid()
  .validate() // returns errors
```

### Validators

```html
<input ...>

  required
  type='email'

  type='number'
  data-parsley-type='number'
  data-parsley-type='integer'
  data-parsley-type='digits'
  data-parsley-type='alphanum'

  type='url'
  data-parsley-type='url'

  maxlength='6'
  data-parsley-maxlength='6'
  minlength='10'
  data-parsley-minlength='10'

  max='10'
  data-parsley-max='10'
  min='6'
  data-parsley-min='6'

  type='range'
  data-parsley=range='[6, 10]'

  pattern='\d+'
  data-parsley-pattern='\d+'

  data-parsley-mincheck='1'
  data-parsley-maxcheck='3'
  data-parsley-check='[1, 3]'

  data-parsley-equalto='#confirm'
```
