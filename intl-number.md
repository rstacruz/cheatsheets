---
title: Intl.NumberFormat
subtitle: Locale-aware number formatter
category: Browser APIs
tier: t1
updated: 2026-11-18
last_verified_with: "Examples verified on Node 26.13.1; last edited 2026-11 (PR #2356)."
fragments:
  - "NumberFormat"
  - "format(1234.5)"
  - "'en-US'"
  - "'de-DE'"
  - "style: 'percent'"
  - "currency: 'USD'"
  - "compactDisplay"
  - "unit: 'liter'"
  - "formatToParts()"
  - "formatRange()"
  - "resolvedOptions"
  - "signDisplay"
  - "useGrouping"
  - "numberingSystem"
  - "currencySign"
  - "roundingMode"
intro: |
  `Intl.NumberFormat` formats numbers for a locale: currency, percent, units,
  compact notation, and grouping. Output depends on the runtime's ICU data.
links:
  - title: Intl.NumberFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  - title: ECMA-402 NumberFormat objects
    url: https://tc39.es/ecma402/#numberformat-objects
  - title: Number.prototype.toLocaleString
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
---

## Creating a formatter

### Basic usage

#### Constructor

```js
new Intl.NumberFormat()
new Intl.NumberFormat('en-US')
new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
})
```

#### Formatting

```js
const nf = new Intl.NumberFormat('en-US')

nf.format(1234567.891)  // → '1,234,567.891'
nf.format(-0.5)         // → '-0.5'
```

`locales` takes a BCP 47 tag or an array of them; unsupported tags fall back to
the runtime default. The default style is `'decimal'`. Output depends on the
runtime's ICU data; reuse a formatter in loops.

See: [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

### Options without a locale

```js
const opts = { style: 'percent' }

new Intl.NumberFormat('default', opts).format(0.25)
// → '25%'
new Intl.NumberFormat(undefined, opts).format(0.25)
// → '25%'
```
<!-- {: .-wrap} -->

`'default'` and `undefined` both mean "use the runtime's default locale".

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

## Styles

### Currency

```js
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(1234.5)
// → '$1,234.50'
```

`currency` is required for this style and takes an ISO 4217 code. The default
display is the locale's symbol.

See: [currency](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency)

### Percent

```js
new Intl.NumberFormat('en-US', {
  style: 'percent'
}).format(0.256)
// → '26%'
```

`percent` multiplies by 100 and formats with the locale's percent sign.

See: [style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style)

### Units

```js
new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'kilometer-per-hour'
}).format(50)
// → '50 km/h'
```

#### Formatter

```js
const liter = (unitDisplay) => (
  new Intl.NumberFormat('en-US', {
    style: 'unit', unit: 'liter', unitDisplay
  })
)
```

#### Display

```js
liter('short').format(2.5)   // → '2.5 L'
liter('narrow').format(2.5)  // → '2.5L'
liter('long').format(2.5)    // → '2.5 liters'
```
<!-- {: .-wrap} -->

`unit` takes an identifier such as `liter`; `unitDisplay` defaults to
`'short'`.

See: [unit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2)

## Currency options

### Currency display

#### Formatter

```js
const usd = (currencyDisplay) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', currencyDisplay
  })
)
```
<!-- {: .-wrap} -->

#### Output

```js
usd('symbol').format(1234.5)        // → '$1,234.50'
usd('code').format(1234.5)          // → 'USD 1,234.50'
usd('name').format(1234.5)          // → '1,234.50 US dollars'
```
<!-- {: .-wrap} -->

#### Narrow symbols

```js
const cad = (currencyDisplay) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'CAD', currencyDisplay
  })
)

cad('symbol').format(1234.5)        // → 'CA$1,234.50'
cad('narrowSymbol').format(1234.5)  // → '$1,234.50'
```
<!-- {: .-wrap} -->

`narrowSymbol` drops the country prefix, `code` prints the ISO code, and `name`
spells the currency out with the locale's plural rules.

See: [currencyDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencydisplay)

### Accounting format

```js
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencySign: 'accounting'
}).format(-1234.5)
// → '($1,234.50)'
```

`'standard'` (the default) writes `-$1,234.50`; `'accounting'` wraps negatives
in parentheses where the locale does.

See: [currencySign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencysign)

## Notation

### Compact notation

#### Formatter

```js
const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact'
})
```

#### Output

```js
compact.format(1234)      // → '1.2K'
compact.format(1500)      // → '1.5K'
compact.format(2000000)   // → '2M'
```
<!-- {: .-wrap} -->

#### Long display

```js
new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'long'
}).format(2000000)
// → '2 million'
```

`compactDisplay` defaults to `'short'`. Compact notation rounds by significant
digits unless fraction digits are set.

See: [notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation)

### Scientific and engineering

```js
new Intl.NumberFormat('en-US', {
  notation: 'scientific'
}).format(987654321)  // → '9.877E8'

new Intl.NumberFormat('en-US', {
  notation: 'engineering'
}).format(987654321)  // → '987.654E6'
```
<!-- {: .-wrap} -->

`scientific` prints one leading digit; `engineering` groups the exponent in
threes.

See: [notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation)

## Digits and rounding

### Fraction digits

#### Formatter

```js
const fraction = (options) => (
  new Intl.NumberFormat('en-US', options)
)
```

#### Output

```js
fraction({ minimumFractionDigits: 2 }).format(42)
// → '42.00'
fraction({ maximumFractionDigits: 0 }).format(42.666)
// → '43'
```
<!-- {: .-wrap} -->

Decimal numbers default to `minimumFractionDigits: 0` and
`maximumFractionDigits: 3`; currency defaults use the currency's minor unit.

See: [minimumFractionDigits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits)

### Significant digits

#### Formatter

```js
const sig = (options) => (
  new Intl.NumberFormat('en-US', options)
)
```

#### Output

```js
sig({ maximumSignificantDigits: 3 }).format(1234.5)
// → '1,230'
sig({ minimumSignificantDigits: 5 }).format(1.5)
// → '1.5000'
```
<!-- {: .-wrap} -->

Significant digits win over fraction digits unless `roundingPriority` says
otherwise.

See: [maximumSignificantDigits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumsignificantdigits)

### Rounding

#### Rounding mode

```js
const floor = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  roundingMode: 'floor'
})

floor.format(1.9)  // → '1'
```

#### Trailing zeros

```js
const strip = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  trailingZeroDisplay: 'stripIfInteger'
})

strip.format(1)    // → '1'
strip.format(1.5)  // → '1.50'
```

`roundingMode` defaults to `'halfExpand'`; other values include `'ceil'`,
`'floor'`, `'trunc'`, and `'halfEven'`. `stripIfInteger` hides all-zero
fractions but keeps real decimals.

See: [roundingMode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode)

## Signs and grouping

### Sign display

#### Formatter

```js
const sign = (signDisplay) => (
  new Intl.NumberFormat('en-US', { signDisplay })
)
```
<!-- {: .-wrap} -->

#### Output

```js
sign('always').format(42)      // → '+42'
sign('exceptZero').format(0)   // → '0'
sign('never').format(-42)      // → '42'
```
<!-- {: .-wrap} -->

`'auto'` (the default) signs negatives only; `'negative'` also hides negative
zero.

See: [signDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay)

### Grouping

#### Formatter

```js
const enUS = (options) => (
  new Intl.NumberFormat('en-US', options)
)
```

#### Output

```js
enUS({ useGrouping: false }).format(1234567)  // → '1234567'
enUS({ useGrouping: 'min2' }).format(999)     // → '999'
enUS({ useGrouping: 'min2' }).format(12345)   // → '12,345'
```
<!-- {: .-wrap} -->

`'auto'` is the default; `'min2'` groups only when a group holds two or more
digits. Indian English groups differently (`12,34,567`).

See: [useGrouping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping)

## Inspecting output

### formatToParts()

#### Formatter

```js
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
```

#### Parts

```js
nf.formatToParts(1234.5)
// → [{ type: 'currency', value: '$' },
//    { type: 'integer', value: '1' },
//    { type: 'group', value: ',' },
//    ...]
```
<!-- {: .-wrap} -->

#### Part types

| Type | Example |
| --- | --- |
| `currency` | `$` |
| `integer` | `1`, `234` |
| `group` | `,` |
| `decimal` | `.` |
| `fraction` | `50` |
| --- | --- |
| `literal` | `' – '` |
| `minusSign` | `-` |
| `plusSign` | `+` |
| `percentSign` | `%` |
| `unit` | `km/h` |
| --- | --- |
| `exponentSeparator` | `E` |
| `exponentInteger` | `3` |
| `compact` | `K` |
| `nan` | `NaN` |
<!-- {: .-headers} -->

Joining every `value` reproduces `format()`. Use the parts to style digits or
insert markup.

See: [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)

### formatRange()

#### Formatter

```js
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
```

#### Output

```js
usd.formatRange(3, 5)      // → '$3 – $5'
usd.formatRange(2.9, 3.1)  // → '~$3'
```

`formatRangeToParts()` adds a `source` of `startRange`, `endRange`, or
`shared`. Both need Chrome 106+, Firefox 116+, Safari 15.4+, or Node 19+.

See: [formatRange()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange)

### resolvedOptions()

#### Formatter

```js
const nf = new Intl.NumberFormat('de-DE', {
  style: 'unit',
  unit: 'kilometer'
})
```

#### Output

```js
nf.resolvedOptions().locale       // → 'de-DE'
nf.resolvedOptions().unit         // → 'kilometer'
nf.resolvedOptions().unitDisplay  // → 'short'
```
<!-- {: .-wrap} -->

`resolvedOptions()` returns the locale and every option after defaults apply.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/resolvedOptions)

## Locales

### Locale differences

| Locale | Plain number | Local currency |
| --- | --- | --- |
| `en-US` | `1,234,567.891` | `$1,234.50` |
| `en-GB` | `1,234,567.891` | `£1,234.50` |
| `de-DE` | `1.234.567,891` | `1.234,50 €` |
| `ja-JP` | `1,234,567.891` | `￥1,235` |
| `en-IN` | `12,34,567.891` | `₹1,234.50` |
<!-- {: .-headers} -->

Grouping, decimal marks, and symbol placement come from CLDR data, so the same
code prints differently per locale.

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

### Numbering system

```js
new Intl.NumberFormat('ar-EG').format(1234.5)
// → '١٬٢٣٤٫٥'
new Intl.NumberFormat('ar-EG', {
  numberingSystem: 'latn'
}).format(1234.5)
// → '1,234.5'
```

`numberingSystem` overrides the locale's digits; `'latn'` is Western, `'arab'`
Arabic-Indic, and `'hanidec'` Chinese numerals.

See: [numberingSystem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#numberingsystem)

### toLocaleString()

```js
(1234.5).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})
// → '$1,234.50'
```

`toLocaleString()` is equivalent to
`new Intl.NumberFormat(locale, options).format(number)`, but builds a
formatter per call.

See: [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

## Options reference

### Combined example

#### Formatter

```js
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  signDisplay: 'always',
  maximumFractionDigits: 0
})
```

#### Output

```js
nf.format(1234.5)  // → '+$1,235'
```
<!-- {: .-wrap} -->

The options below combine into the formatter above.

See: [Intl.NumberFormat options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options)

### Style options

| Option | Values |
| --- | --- |
| `style` | `'decimal'` (default), `'currency'`, `'percent'`, `'unit'` |
| `currency` | ISO 4217 code; required for `'currency'` |
| `currencyDisplay` | `'symbol'` (default), `'narrowSymbol'`, `'code'`, `'name'` |
| `currencySign` | `'standard'` (default), `'accounting'` |
| --- | --- |
| `unit` | e.g. `'liter'`; required for `'unit'` |
| `unitDisplay` | `'short'` (default), `'narrow'`, `'long'` |
| `notation` | `'standard'` (default), `'scientific'`, `'engineering'`, `'compact'` |
| `compactDisplay` | `'short'` (default), `'long'` |
<!-- {: .-headers} -->

See: [style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style)

### Digit options

| Option | Values |
| --- | --- |
| `minimumIntegerDigits` | 1–21 (default 1) |
| `minimumFractionDigits` | 0–100 (default 0; 2 for most currencies) |
| `maximumFractionDigits` | 0–100 (default 3; currency minor units) |
| --- | --- |
| `minimumSignificantDigits` | 1–21 (default 1) |
| `maximumSignificantDigits` | 1–21 (default 21) |
| `roundingIncrement` | 1 (default), 2, 5, 10, 20, 25, 50, … |
| `roundingMode` | `'halfExpand'` (default), `'ceil'`, `'floor'`, `'expand'`, `'trunc'`, `'halfCeil'`, `'halfFloor'`, `'halfTrunc'`, `'halfEven'` |
| `trailingZeroDisplay` | `'auto'` (default), `'stripIfInteger'` |
<!-- {: .-headers} -->

See: [minimumIntegerDigits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits)

### Other options

| Option | Values |
| --- | --- |
| `signDisplay` | `'auto'` (default), `'always'`, `'exceptZero'`, `'negative'`, `'never'` |
| `useGrouping` | `'auto'` (default), `'always'`, `'min2'`, `false` |
| `numberingSystem` | e.g. `'latn'`, `'arab'`, `'hanidec'` |
| `roundingPriority` | `'auto'` (default), `'morePrecision'`, `'lessPrecision'` |
| `localeMatcher` | `'best fit'` (default), `'lookup'` |
<!-- {: .-headers} -->

See: [signDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay)

### Errors and fallbacks

```js
new Intl.NumberFormat('en-US', { style: 'currency' })
// TypeError: Currency code is required with currency style.

new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 1
})
// RangeError: maximumFractionDigits value is out of range.
```
<!-- {: .-wrap} -->

Missing `currency` or `unit`, invalid enums, and contradictory digit ranges
throw.

See: [Exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#exceptions)
