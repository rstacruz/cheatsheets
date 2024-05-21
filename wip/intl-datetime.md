---
title: Intl.DateTimeFormat
category: Hidden
tags: [WIP]
intro: |
  `Intl.DateTimeFormat` is used to format date strings in JavaScript.
---

### Parsing

#### As local time

```js
const date = new Date(2012, 11, 20, 3, 0, 0)
```

#### As UTC time

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
```

#### From ISO strings

```js
const date = new Date('2018-04-20T12:00:00Z')
```

Note that JavaScript doesn't "store" timezones in a date object. All these date objects, when expressed via `.toString()` or similar, will show the local timezone of the browser, regardless if you parsed UTC dates.

### Formatting dates

#### Default formatting

```js
console.log(new Intl.DateTimeFormat().format(date))
// → '12/19/2012' (assuming America/Los_Angeles)
```

#### Custom locale

```js
console.log(new Intl.DateTimeFormat('en-GB').format(date))
// → '19/12/2012' (date-first)
```

#### Custom timezone

```js
console.log(new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney'
}).format(date))
// → '19/12/2012'
```

### Custom formats

#### Time

```js
console.log(new Intl.DateTimeFormat('default', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}).format(date))
// → '2:00:00 pm'
```

#### Date

```js
console.log(new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format(date))
// → '12/19/2012'
```

To specify options without a locale, use `'default'` as a locale.

### All options

```js
{
  weekday: 'narrow' | 'short' | 'long',
  era: 'narrow' | 'short' | 'long',
  year: 'numeric' | '2-digit',
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  day: 'numeric' | '2-digit',
  hour: 'numeric' | '2-digit',
  minute: 'numeric' | '2-digit',
  second: 'numeric' | '2-digit',
  timeZoneName: 'short' | 'long',

  // Time zone to express it in
  timeZone: 'Asia/Shanghai',
  // Force 12-hour or 24-hour
  hour12: true | false,

  // Rarely-used options
  hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
  formatMatcher: 'basic' | 'best fit'
}
```


## References

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat>
