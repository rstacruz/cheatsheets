---
title: Input tag
subtitle: Type and attribute reference
logo: { src: /assets/logos/html.svg }
category: HTML
updated: 2026-11-23
tier: t3
last_verified_with: "WHATWG HTML Living Standard."
weight: -3
intro: |
  [The input element](https://html.spec.whatwg.org/multipage/input.html#the-input-element) defines form controls. This sheet covers attributes, input types, and examples for dates, numbers, and text.
links:
  - title: input element
    url: https://html.spec.whatwg.org/multipage/input.html#the-input-element
  - title: input type attribute
    url: https://html.spec.whatwg.org/multipage/input.html#attr-input-type
---

## Attributes

### Input

#### Common attributes

```html
<input ...
  disabled
  required
  checked
```
<!-- {: data-highlight="disabled; required; checked"} -->

#### Focus

```html
   autofocus
```
<!-- {: data-highlight="autofocus"} -->

#### Autofill and keyboards

```html
   autocomplete='cc-exp'     <!-- autofill token -->
   autocapitalize='off'
   inputmode='numeric'       <!-- mobile keyboard -->
   pattern='\d*'             <!-- validation -->
```
<!-- {: data-highlight="autocomplete; autocapitalize; inputmode; pattern"} -->

See: [the input element](https://html.spec.whatwg.org/multipage/input.html#the-input-element)

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

See: [input type attribute](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)

## Examples

### Dates

| Type | Example |
| --- | --- |
| `type='date'` | <input type='date'> |
| `type='time'` | <input type='time'> |

See: [Date state (type=date)](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date))

### Datetime

| Type | Example |
| --- | --- |
| `type='datetime-local'` | <input type='datetime-local'> |

`datetime` was removed from the HTML spec; use `datetime-local` and a separate time zone control.

See: [Local Date and Time state (type=datetime-local)](https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type=datetime-local))

### Numbers

| Type | Example |
| --- | --- |
| `type='number'` | <input type='number'> |
| `type='range'` | <input type='range'> |

See: [Number state (type=number)](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number))

### Text

| Type | Example |
| --- | --- |
| `type='text'` | <input type='text'> |
| `type='password'` | <input type='password'> |
| `type='search'` | <input type='search'> |
| `type='tel'` | <input type='tel'> |

See: [Text state (type=text)](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search))

## Also see

* <https://html.spec.whatwg.org/multipage/input.html#the-input-element>
