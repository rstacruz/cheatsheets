---
title: Input tag
subtitle: Type and attribute reference
category: HTML
updated: 2026-11-23
last_verified_with: "HTML Living Standard, MDN reference."
weight: -3
---

### Input

#### Common attributes

```html
 <input ...
   disabled
   required
   checked
```

#### Focus

```html
   autofocus
```

#### Autofill and keyboards

```html
   autocomplete='cc-exp'     <!-- autofill token -->
   autocapitalize='off'
   inputmode='numeric'       <!-- mobile keyboard -->
   pattern='\d*'             <!-- validation -->
```

### Input types

#### Text

* email
* hidden
* **password**
* tel
* **text**
* search
* url

<!-- {: .-enum-lines} -->

#### Time

* date
* datetime-local
* time

<!-- {: .-four-column} -->

#### Time (limited or obsolete)

* month
* week
* datetime

<!-- {: .-enum} -->

#### Etc

* **file**
* **radio**
* **checkbox**
* color

<!-- {: .-enum-lines} -->

#### Buttons

* button
* reset
* submit
* image

<!-- {: .-enum-lines} -->

#### Numeric

* number
* range

<!-- {: .-enum-lines} -->

## Examples

### Dates

| Type | Example |
| --- | --- |
| `type='date'` | <input type='date'> |
| `type='time'` | <input type='time'> |

### Datetime

| Type | Example |
| --- | --- |
| `type='datetime-local'` | <input type='datetime-local'> |

`datetime` was removed from the HTML spec; use `datetime-local` and a separate time zone control.

### Numbers

| Type | Example |
| --- | --- |
| `type='number'` | <input type='number'> |
| `type='range'` | <input type='range'> |

### Text

| Type | Example |
| --- | --- |
| `type='text'` | <input type='text'> |
| `type='password'` | <input type='password'> |
| `type='search'` | <input type='search'> |
| `type='tel'` | <input type='tel'> |

## Also see

 * <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input>
