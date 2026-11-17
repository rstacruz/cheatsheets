---
title: Date & time formats
category: Others
subtitle: Date format codes by tool
weight: -5
updated: 2026-11-18
tier: t2
fragments:
  - "YYYY-MM-DD"
  - "%Y-%m-%d"
  - "yyyy-MM-dd"
  - "2006-01-02"
  - "Y-m-d"
  - "dddd, MMMM Do"
  - "hh:mm a"
  - "HH:mm:ss"
  - "%H:%M"
  - "%I:%M %p"
  - "%A, %B %e, %Y"
  - "ZZ"
  - "toISOString()"
  - "T23:05:00Z"
  - "1370473500"
  - "date +%s"
  - "%s"
  - "MMM d, yyyy"
intro: |
  A date format is a pattern of tokens that tells a library how to write
  or read a date.

  The same format has a different spelling in every language: `%Y-%m-%d`
  in strftime, `YYYY-MM-DD` in Moment, `yyyy-MM-dd` in Java.
links:
  - title: ISO 8601
    url: https://www.iso.org/iso-8601-date-and-time-format.html
  - title: RFC 3339
    url: https://www.rfc-editor.org/rfc/rfc3339
  - title: MDN Date
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
---

## Common formats

### The same date

| Tool | Pattern | Result |
| --- | --- | --- |
| strftime | `%Y-%m-%d %H:%M` | 2013-06-05 23:05 |
| Moment | `YYYY-MM-DD HH:mm` | 2013-06-05 23:05 |
| PHP | `Y-m-d H:i` | 2013-06-05 23:05 |
| Go | `2006-01-02 15:04` | 2013-06-05 23:05 |
| Java | `yyyy-MM-dd HH:mm` | 2013-06-05 23:05 |
| C# | `yyyy-MM-dd HH:mm` | 2013-06-05 23:05 |
| Swift | `yyyy-MM-dd HH:mm` | 2013-06-05 23:05 |
| --- | --- | --- |
| JS `Intl` | `{ dateStyle: 'short' }` | 05/06/2013 |

<!-- {: .-headers} -->

Each pattern writes 5 June 2013, 23:05 UTC. The `Intl` row is shaped by the
locale, so it can differ from machine to machine.

See: [Date field symbols](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)

### ISO 8601

```
2013-06-05                  # Date
2013-06-05T23:05:00Z        # UTC
2013-06-05T23:05:00+02:00   # With an offset
2013-06-05T23:05:00.123Z    # Milliseconds
```

ISO 8601 sorts lexicographically and needs no locale. `Z` means UTC.

See: [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)

### RFC 3339

```
2013-06-05T23:05:00Z
2013-06-05T23:05:00.123+02:00
2013-06-05 23:05:00Z        # Space instead of T
```

RFC 3339 is the internet profile of ISO 8601, and what `toISOString()`
emits. Most parsers accept the space, but not all of them.

See: [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339)

### RFC 2822

```
Wed, 05 Jun 2013 23:05:00 +0000
05 Jun 2013 23:05:00 GMT
```

Email headers use this format. RFC 5322 obsoletes RFC 2822 with the same
date syntax.

See: [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322#section-3.3)

### Unix time

```bash
date +%s                    # 1370473500
date -d @1370473500         # GNU date: Wed Jun 5 2013
```

Seconds since `1970-01-01T00:00:00Z`, ignoring leap seconds. JavaScript
and Java's `Date` count milliseconds.

See: [date(1)](https://man7.org/linux/man-pages/man1/date.1.html)

### SQL

```sql
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d');   -- MySQL
SELECT to_char(NOW(), 'YYYY-MM-DD');     -- PostgreSQL
SELECT strftime('%Y-%m-%d', 'now');      -- SQLite
SELECT FORMAT(GETDATE(), 'yyyy-MM-dd');  -- SQL Server
```

MySQL and SQLite copy strftime tokens; PostgreSQL and SQL Server use their
own patterns.

See: [PostgreSQL formatting](https://www.postgresql.org/docs/current/functions-formatting.html)

### Parse vs format

```
format   Date -> String   # tokens: %Y-%m-%d
parse    String -> Date   # the same pattern, or a parser
```

Parsing and formatting share a pattern in strftime, Moment, Go, and Java,
but not everywhere: JavaScript's `Date` reliably parses only ISO 8601, and
PHP's `DateTime::createFromFormat` takes its own token set.

See: [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

## Language reference

### JavaScript

```js
new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeStyle: 'short'
}).format(date)          // 5 June 2013 at 23:05

date.toISOString()       // 2013-06-05T23:05:00.000Z
```

`Intl` is for humans and follows the locale; `toISOString()` is always
UTC and always ISO 8601.

See: [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

### PHP

```php
date('Y-m-d H:i:s');            // 2013-06-05 23:05:00
date('D, d M Y', $timestamp);   // Wed, 05 Jun 2013
```

PHP has its own tokens. `strftime()` was deprecated in PHP 8.1, so use
`date()` or `DateTime::format()`.

See: [PHP date()](https://www.php.net/manual/en/function.date.php)

### Go

```go
t.Format("2006-01-02 15:04:05")
t.Format(time.RFC3339)
t.Format("Mon, 02 Jan 2006")
```

A Go layout is a sample date, not a pattern: `Mon Jan 2 15:04:05 MST 2006`.
Change the sample to change the output.

See: [time.Format](https://pkg.go.dev/time#Time.Format)

### Java

```java
DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(now);
DateTimeFormatter.ISO_LOCAL_DATE.format(now);
DateTimeFormatter.RFC_1123_DATE_TIME.format(now);
```

`yyyy` is the calendar year; `YYYY` is the week-based year, which differs
near New Year.

See: [DateTimeFormatter](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/format/DateTimeFormatter.html)

### Swift

```swift
let f = DateFormatter()
f.dateFormat = "yyyy-MM-dd HH:mm"
f.string(from: date)

ISO8601DateFormatter().string(from: date)
```

`DateFormatter` follows Unicode TR35 patterns. `ISO8601DateFormatter` is
the safe way to write ISO 8601.

See: [DateFormatter](https://developer.apple.com/documentation/foundation/dateformatter)

### C#

```csharp
date.ToString("yyyy-MM-dd HH:mm:ss")
date.ToString("O")      // Round-trip ISO 8601
date.ToString("R")      // RFC 1123
```

Custom patterns are case-sensitive: `MM` is the month, `mm` is minutes.

See: [Custom date formats](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

{% include common/strftime_format.md title="strftime format" %}

{% include common/moment_format.md title="Moment.js format" %}
