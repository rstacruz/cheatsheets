---
title: TOML
subtitle: Minimal config file format
category: Markup
tier: t2
fragments:
  - 'key = "value"'
  - "[table]"
  - "[[product]]"
  - '1234 = "value"'
  - '"127.0.0.1"'
  - "physical.color"
  - "int5 = 1_000"
  - "0xDEADBEEF"
  - "flt4 = 5e+22"
  - "sf1 = inf"
  - "bool1 = true"
  - "1979-05-27"
  - "07:32:00"
  - "[ 1, 2, 3 ]"
  - "point = {x=1}"
  - 'str1 = """'
  - "# comment"
updated: 2026-11-18
intro: |
  [TOML](https://toml.io/) is a minimal config file format that maps
  unambiguously to a hash table. This sheet covers the syntax used in
  everyday config files.
links:
  - title: TOML v1.1.0 specification
    url: https://toml.io/en/v1.1.0
  - title: TOML repository
    url: https://github.com/toml-lang/toml
---

## Getting started

### Minimal document

```toml
title = "TOML example"
owner = "Tom"
dob = 1979-05-27T07:32:00Z
```

Top-level key/value pairs come first; tables follow under headers.

See: [Key/value pair](https://toml.io/en/v1.1.0#keyvalue-pair)

### Comments

```toml
# comment
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

Bare keys allow `A-Za-z0-9_-`; digits alone are still strings.

See: [Keys](https://toml.io/en/v1.1.0#keys)

### Quoted keys

```toml
"127.0.0.1" = "value"
"character encoding" = "value"
'key2' = "value"
```

Quote keys with spaces or Unicode; basic and literal string rules apply.

See: [Keys](https://toml.io/en/v1.1.0#keys)

### Dotted keys

```toml
name = "Orange"
physical.color = "orange"
physical.shape = "round"
```

Dots build nested tables. Finish one prefix before starting another.

See: [Keys](https://toml.io/en/v1.1.0#keys)

## Strings

### Basic strings

```toml
str = "I'm a string. \"You can quote me\". Name\tJos\u00E9"
bell = "\e"
cafe = "caf\xE9"
```

Basic strings use `"` with escapes. `\e` and `\xHH` are 1.1.0 additions.

See: [String](https://toml.io/en/v1.1.0#string)

### Literal strings

```toml
winpath = 'C:\Users\nodejs\templates'
regex = '<\i\c*\s*>'
```

Literal strings use `'` and never process escapes.

See: [String](https://toml.io/en/v1.1.0#string)

### Multi-line basic strings

```toml
str1 = """
Roses are red
Violets are blue"""
```

A newline right after `"""` is trimmed; a trailing `\` joins lines.

See: [String](https://toml.io/en/v1.1.0#string)

### Multi-line literal strings

```toml
regex2 = '''I [dw]on't need \d{2} apples'''
lines = '''
The first newline is
trimmed in literal strings.
'''
```

Triple single quotes keep text as written, including backslashes.

See: [String](https://toml.io/en/v1.1.0#string)

## Numbers and booleans

### Integers

```toml
int1 = +99
int2 = 42
int3 = -17
int5 = 1_000
hex1 = 0xDEADBEEF
oct1 = 0o755
bin1 = 0b11010110
```

Underscores separate digits; `0x`, `0o`, and `0b` set the base.

See: [Integer](https://toml.io/en/v1.1.0#integer)

### Floats

```toml
flt1 = 3.1415
flt4 = 5e+22
flt7 = 6.626e-34
sf1 = inf
sf2 = +inf
sf4 = nan
```

A point or exponent makes a float; `inf` and `nan` are lowercase.

See: [Float](https://toml.io/en/v1.1.0#float)

### Booleans

```toml
bool1 = true
bool2 = false
```

Booleans are lowercase.

See: [Boolean](https://toml.io/en/v1.1.0#boolean)

## Dates and times

### Offset date-time

```toml
odt1 = 1979-05-27T07:32:00Z
odt2 = 1979-05-27T00:32:00-07:00
now = 1979-05-27T07:32Z
```

RFC 3339 with an offset; `T` may be a space. Omitting seconds, as in `now`,
is a 1.1.0 addition.

See: [Offset Date-Time](https://toml.io/en/v1.1.0#offset-date-time)

### Local date-time

```toml
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27T07:32:00.5
```

No offset means wall-clock time, not an instant.

See: [Local Date-Time](https://toml.io/en/v1.1.0#local-date-time)

### Local date and time

```toml
ld1 = 1979-05-27
lt1 = 07:32:00
lt2 = 00:32:00.5
```

Use a date or time alone when the other part is not needed.

See: [Local date](https://toml.io/en/v1.1.0#local-date),
[Local time](https://toml.io/en/v1.1.0#local-time)

## Arrays

### Arrays

```toml
integers = [ 1, 2, 3 ]
colors = [ "red", "yellow", "green" ]
nested = [ [ 1, 2 ], [3, 4, 5] ]
```

Arrays are ordered, comma-separated, and can nest.

See: [Array](https://toml.io/en/v1.1.0#array)

### Mixed types

```toml
numbers = [ 0.1, 0.2, 0.5, 1, 2, 5 ]
contributors = [
  "Foo Bar <foo@example.com>",
  { name = "Baz Qux", email = "baz@example.com" }
]
```

Values of different types, including inline tables, may share an array.

See: [Array](https://toml.io/en/v1.1.0#array)

### Multi-line arrays

```toml
integers = [
  1,
  2, # trailing comma allowed
]
```

Newlines, comments, and trailing commas are allowed in arrays.

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

A `[table]` header applies until the next header or end of file.

See: [Table](https://toml.io/en/v1.1.0#table)

### Nested tables

```toml
[dog."tater.man"]
type.name = "pug"
```

Dotted headers create nested tables; parent tables are implicit.

See: [Table](https://toml.io/en/v1.1.0#table)

### Arrays of tables

```toml
[[product]]
name = "Hammer"
sku = 738594937

[[product]]
name = "Nail"
sku = 284758393
```

`[[table]]` appends a table to an array of tables.

See: [Array of Tables](https://toml.io/en/v1.1.0#array-of-tables)

## Inline tables

### Inline tables

```toml
name = { first = "Tom", last = "Preston-Werner" }
point = {x=1}
```

Inline tables are self-contained; keys cannot be added outside braces.

See: [Inline Table](https://toml.io/en/v1.1.0#inline-table)

### Nested inline tables

```toml
contact = {
  personal = {
    name = "Donald Duck",
    email = "donald@duckburg.com",
  },
}
```

Multi-line inline tables and their trailing commas are 1.1.0 additions.

See: [Inline Table](https://toml.io/en/v1.1.0#inline-table)
