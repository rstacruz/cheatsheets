---
title: RDoc
category: Markup
intro: |
  Quick reference for RDoc markup and directives. For YARD tags such as `@param`, see the YARD cheatsheet.
---

### Basic comment
{: .-prime}

```ruby
# Adds two numbers.
#
# Returns the sum.
def add(left, right)
  left + right
end
```

RDoc associates a comment with the Ruby object immediately below it.

### Inline markup

```text
*bold*
_emphasized_
+code+
```

### Links and references

```text
https://www.example.com/
RDoc::Markup
RDoc::Markup#convert
{Ruby documentation}[https://docs.ruby-lang.org/]
```

## Structure

### Headings

```text
= Page title
== Section
=== Subsection
```

### Lists

```text
* First item
* Second item

1. First step
2. Second step
```

### Definition lists

```text
name:: description
+option+:: option description
```

```text
[name] description
[other] another description
```

## Directives

### Hide documentation

```ruby
def internal_method # :nodoc:
end

module InternalNamespace # :nodoc: all
end
```

```ruby
# :stopdoc:
def hidden_method
end
# :startdoc:
```

### Calling sequence

```ruby
# :call-seq:
#   readlines(sep = $/)        -> array
#   readlines(limit)           -> array
#   readlines(sep, limit)      -> array
```

Use `:call-seq:` when the generated signature needs to show multiple forms or a return value.

### Arguments and yields

```ruby
# :args: source, destination = nil
# :yields: value
```

These directives override the arguments or yielded values reported by RDoc.

### Category

```ruby
# :category: Utilities
#
# Escapes HTML characters.
def escape_html(text)
end
```

`:category:` applies only to the next documented item.

### Section

```ruby
# :section: Expiry methods
# Methods for expiring records.

# Expires the record.
def expire!
end
```

`:section:` remains active until another section directive changes it.

### Markup format

```ruby
# :markup: TomDoc
```

Place the directive at the beginning of the file to select a supported input format.

## Also see
{: .-one-column}

- <https://ruby-doc.org/3.4/RDoc/MarkupReference.html>
- <https://ruby-doc.org/3.4/contributing/documentation_guide_md.html>
{: .-also-see}
