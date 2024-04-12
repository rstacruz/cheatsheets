---
title: Tomdoc
category: Markup
---

### Tomdoc
{: .-prime}

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

See [tomdoc.org](http://tomdoc.org/).

### Tags

- `Deprecated`
- `Internal`
- `Public`

### Options

```ruby
# options - The Hash options used to refine the selection (default: {}):
#           :color  - The String color to restrict by (optional).
#           :weight - The Float weight to restrict by. The weight should
#                     be specified in grams (optional).
```

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

### Signatures

```ruby
# Signature
#
#   find_by_<field>[_and_<field>...](args)
#
```
