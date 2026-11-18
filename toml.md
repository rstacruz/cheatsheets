---
title: TOML
subtitle: Obvious minimal config format
category: Markup
prism_languages: [toml]
tier: t2
updated: 2026-11-18
fragments:
  - 'key = "value"'
  - "[table]"
  - "[[array]]"
  - "key = 42"
  - "key = true"
  - "2024-01-01"
  - "key = [1, 2]"
  - "key = {x=1}"
  - "\"quoted key\""
  - "key.sub = 1"
  - "'''literal'''"
  - "\"\"\"multi\"\"\""
  - "# comment"
intro: |
  [TOML](https://toml.io/) is a minimal, human-readable config format that
  maps unambiguously to a hash table. This sheet covers the syntax used in
  everyday config files.
links:
  - title: TOML specification
    url: https://toml.io/en/v1.1.0
  - title: GitHub repository
    url: https://github.com/toml-lang/toml
---

## Getting started

### Minimal document

```toml
title = "TOML example"
owner = { name = "Tom", dob = 1979-05-27T07:32:00-08:00 }
```

Top-level keys come first; tables start with `[section]`.

See: [Key/Value Pair](https://toml.io/en/v1.1.0#keyvalue-pair)

### Comments

```toml
# Full-line comment
key = "value"  # trailing comment
another = "# not a comment"
```

`#` starts a comment unless it appears inside a string.

See: [Comment](https://toml.io/en/v1.1.0#comment)

## Keys

### Bare keys

```toml
key = "value"
bare_key = "value"
bare-key = "value"
1234 = "value"
```

Bare keys use `A-Za-z0-9_-` and are always strings, even when all digits.

See: [Keys](https://toml.io/en/v1.1.0#keys)

### Quoted keys

```toml
"127.0.0.1" = "value"
'key2' = "value"
"ʎǝʞ" = "value"
```

Use quoted keys for spaces or Unicode; basic and literal string rules apply.

See: [Keys](https://toml.io/en/v1.1.0#keys)

### Dotted keys

```toml
name = "Orange"
physical.color = "orange"
physical.shape = "round"
```

Dots create nested tables. Define all parts of one key before moving on.

See: [Keys](https://toml.io/en/v1.1.0#keys)

## Strings

### Basic strings

```toml
str = "I'm a string. \"You can quote me\". Name\tJos\xE9"
```

Basic strings use `"` and support escape sequences such as `\t` and `\uHHHH`.

See: [String](https://toml.io/en/v1.1.0#string)

### Literal strings

```toml
winpath = 'C:\Users\nodejs\templates'
regex = '<\i\c*\s*>'
```

Literal strings use `'` and do not process escapes.

See: [String](https://toml.io/en/v1.1.0#string)

### Multi-line basic strings

```toml
str = """
Roses are red
Violets are blue"""
```

A newline after `"""` is trimmed; a trailing `\` trims whitespace.

See: [String](https://toml.io/en/v1.1.0#string)

### Multi-line literal strings

```toml
regex2 = '''I [dw]on't need \d{2} apples'''
lines = '''
The first newline is
trimmed in literal strings.
'''
```

No escapes are processed.

See: [String](https://toml.io/en/v1.1.0#string)

## Numbers

### Integers

```toml
int1 = +99
int2 = 42
int3 = 0
int4 = -17
hex = 0xDEADBEEF
oct = 0o755
bin = 0b11010110
big = 1_000_000
```

Integers may use `_` separators and `0x`, `0o`, `0b` prefixes.

See: [Integer](https://toml.io/en/v1.1.0#integer)

### Floats

```toml
flt1 = 3.1415
flt2 = 5e+22
flt3 = 6.626e-34
flt4 = 224_617.445_991
```

A decimal point or exponent makes a float; use at least one digit on each side of `.`.

See: [Float](https://toml.io/en/v1.1.0#float)

### Special floats

```toml
sf1 = inf
sf2 = +inf
sf3 = -inf
sf4 = nan
```

Special values are lowercase.

See: [Float](https://toml.io/en/v1.1.0#float)

## Booleans and dates

### Booleans

```toml
bool1 = true
bool2 = false
```

Booleans are always lowercase.

See: [Boolean](https://toml.io/en/v1.1.0#boolean)

### Offset date-time

```toml
odt1 = 1979-05-27T07:32:00Z
odt2 = 1979-05-27T00:32:00-07:00
odt3 = 1979-05-27 07:32:00Z
```

RFC 3339 with an offset; a space may replace `T`.

See: [Offset Date-Time](https://toml.io/en/v1.1.0#offset-date-time)

### Local date-time

```toml
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27T07:32
```

No offset; represents wall-clock time.

See: [Local Date-Time](https://toml.io/en/v1.1.0#local-date-time)

### Local date and time

```toml
ld1 = 1979-05-27
lt1 = 07:32:00
lt2 = 07:32
```

Use a date or time alone when the other part is not needed.

See: [Local Date](https://toml.io/en/v1.1.0#local-date)

## Arrays

### Arrays

```toml
integers = [1, 2, 3]
colors = ["red", "yellow", "green"]
nested = [[1, 2], [3, 4, 5]]
```

Arrays are ordered, comma-separated, and may nest.

See: [Array](https://toml.io/en/v1.1.0#array)

### Mixed types

```toml
numbers = [0.1, 0.2, 0.5, 1, 2, 5]
contributors = [
  "Foo Bar <foo@example.com>",
  { name = "Baz Qux", email = "bazqux@example.com" }
]
```

Arrays may mix types, including inline tables.

See: [Array](https://toml.io/en/v1.1.0#array)

### Multi-line arrays

```toml
integers = [
  1,
  2, # trailing comma allowed
]
```

Newlines, comments, and trailing commas are allowed.

See: [Array](https://toml.io/en/v1.1.0#array)

## Tables

### Standard tables

```toml
[table-1]
key1 = "some string"
key2 = 123

[table-2]
key1 = "another string"
key2 = 456
```

A `[table]` header starts a new table until the next header or EOF.

See: [Table](https://toml.io/en/v1.1.0#table)

### Nested tables

```toml
[dog."tater.man"]
type.name = "pug"
```

Dotted headers create nested tables.

See: [Table](https://toml.io/en/v1.1.0#table)

### Arrays of tables

```toml
[[product]]
name = "Hammer"
sku = 738594937

[[product]]
name = "Nail"
sku = 284758393
color = "gray"
```

`[[table]]` appends a new table to an array.

See: [Array of Tables](https://toml.io/en/v1.1.0#array-of-tables)

## Inline tables

### Inline tables

```toml
name = { first = "Tom", last = "Preston-Werner" }
point = { x = 1, y = 2 }
```

Inline tables are self-contained and fit on one line.

See: [Inline Table](https://toml.io/en/v1.1.0#inline-table)

### Nested inline tables

```toml
contact = {
  personal = { name = "Donald Duck", email = "donald@duckburg.com" },
  work = { name = "Coin cleaner", email = "donald@ScroogeCorp.com" }
}
```

Trailing commas are allowed.

See: [Inline Table](https://toml.io/en/v1.1.0#inline-table)
