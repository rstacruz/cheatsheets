---
title: Tomdoc
subtitle: Ruby documentation format
category: Markup
---

### Tomdoc

<!-- {: .-prime} -->

```ruby
# Public: Duplicate some text an arbitrary number of times.
#
# text  - The String to be duplicated.
# count - The Integer number of times to duplicate the text.
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

A TomDoc block sits directly above a method: a `#` line, a short description, then optional sections in a fixed order.

See: [TomDoc specification](http://tomdoc.org/).

### Tags

- `Deprecated`
- `Internal`
- `Public`

<!-- {: .-enum-lines} -->

Status tags prefix the description and signal API stability.

See: [Description section](http://tomdoc.org/#description).

### Options

```ruby
# options - The Hash options used to refine the selection (default: {}):
#           :color  - The String color to restrict by (optional).
#           :weight - The Float weight to restrict by. The weight should
#                     be specified in grams (optional).
```

Hashes list their valid options like arguments, with defaults in parentheses.

See: [Arguments section](http://tomdoc.org/#arguments).

### Yields

```ruby
# Yields the Integer index of the iteration.
```

```ruby
# Returns the duplicated String.
```

```ruby
# Returns nothing.
```

```ruby
# Raises Errno::ENOENT if the file can't be found.
```

```ruby
# Returns something else and this is a wrapped
#   multi-line comment.
```

The first line names what a block receives; the rest document return values and exceptions.

See: [Yields](http://tomdoc.org/#yields) and [Returns](http://tomdoc.org/#returns).

### Signatures

```ruby
# Signature
#
#   find_by_<field>[_and_<field>...](args)
#
```

Signatures describe dynamically generated methods: `<>` marks required parts, `[]` optional parts, and `...` repeats.

See: [Signature section](http://tomdoc.org/#signature).
