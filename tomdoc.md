---
title: Tomdoc
subtitle: Ruby documentation format
logo: { set: icon-park-outline, name: comments }
category: Markup
intro: |
  TomDoc is a documentation format for Ruby code.
links:
  - title: TomDoc source repository
    url: https://github.com/mojombo/tomdoc
tier: t3
last_verified_with: "TomDoc 1.0.0-rc1 specification."
created_at: 2015-05-22
updated: 2026-11-26
---

## Basics

### Tomdoc

<!-- {: .-prime} -->

```ruby
# Public: Repeat text a given number of times.
#
# text  - The String to be duplicated.
# count - Integer number of times to repeat the text.
#
# Examples
#
#   multiplex('Tom', 4)
#   # => 'TomTomTomTom'
#
# Returns the duplicated String.
def multiplex(text, count)
  text * count
end
```
<!-- {: data-highlight="# Public:"} -->

A TomDoc block sits directly above a method: a `#` line, a short description, then optional sections in a fixed order.

See: [TomDoc specification](http://tomdoc.org/).

### Tags

- `Deprecated`
- `Internal`
- `Public`

<!-- {: .-enum-lines} -->

Status tags prefix the description and signal API stability.

See: [Description section](http://tomdoc.org/#description).

## Method sections

### Options

```ruby
# options - Hash options used to refine the selection (default: {}):
#           :color  - The String color to restrict by (optional).
#           :weight - The Float weight to restrict by, in grams
#                     (optional).
```
<!-- {: data-highlight="# options"} -->

Hashes list their valid options like arguments, with defaults in parentheses.

See: [Arguments section](http://tomdoc.org/#arguments).

### Yields

```ruby
# Yields the Integer index of the iteration.
# Returns the duplicated String.
# Returns nothing.
# Raises Errno::ENOENT if the file can't be found.
# Returns something else and this is a wrapped
#   multi-line comment.
```

<!-- {: data-highlight="# Yields; # Returns; # Raises"} -->

The first line names what a block receives; the rest document return values and exceptions.

See: [Yields](http://tomdoc.org/#yields) and [Returns](http://tomdoc.org/#returns).

### Signatures

```ruby
# Signature
#
#   find_by_<field>[_and_<field>...](args)
#
```
<!-- {: data-highlight="find_by_<field>[_and_<field>...](args)"} -->

Signatures describe dynamically generated methods: `<>` marks required parts, `[]` optional parts, and `...` repeats.

See: [Signature section](http://tomdoc.org/#signature).
