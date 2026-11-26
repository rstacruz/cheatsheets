---
title: RDoc
subtitle: Ruby documentation markup
category: Markup
intro: |
  Quick reference for RDoc markup and directives. For YARD tags such as `@param`, see the YARD cheatsheet.
links:
  - title: RDoc documentation
    url: https://ruby.github.io/rdoc/
tier: t3
last_verified_with: "RDoc 8.1.0."
updated: 2026-11-26
---

### Basic comment

<!-- {: .-prime} -->

```ruby
# Adds two numbers.
#
# Returns the sum.
def add(left, right)
  left + right
end
```
<!-- {: data-highlight="# Adds two numbers.; def add"} -->

RDoc associates a comment with the Ruby object immediately below it.

See: [Writing documentation](https://ruby.github.io/rdoc/#writing-documentation)

### Inline markup

```text
*bold*
_emphasized_
+code+
```
<!-- {: data-highlight="*bold*; _emphasized_; +code+"} -->

See: [Text markup](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#text-markup)

### Links and references

```text
https://www.example.com/
RDoc::Markup
RDoc::Markup#convert
{Ruby documentation}[https://docs.ruby-lang.org/]
```
<!-- {: data-highlight="{Ruby documentation}[https://docs.ruby-lang.org/]"} -->

See: [Links](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#links)

## Structure

### Headings

```text
= Page title
== Section
=== Subsection
```
<!-- {: data-highlight="= Page title"} -->

See: [Headings](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#headings)

### Lists

```text
* First item
* Second item

1. First step
2. Second step
```
<!-- {: data-highlight="* First item; 1. First step"} -->

See: [Lists](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#lists)

### Definition lists

#### Word and colons

```text
name:: description
+option+:: option description
```
<!-- {: data-highlight="name:: description"} -->

#### Square brackets

```text
[name] description
[other] another description
```
<!-- {: data-highlight="[name] description"} -->

See: [Labeled lists](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#labeled-lists)

## Directives

### Hide documentation

#### Single items

```ruby
def internal_method # :nodoc:
end

module InternalNamespace # :nodoc: all
end
```
<!-- {: data-highlight=":nodoc:"} -->

#### Regions

```ruby
# :stopdoc:
def hidden_method
end
# :startdoc:
```
<!-- {: data-highlight=":stopdoc:; :startdoc:"} -->

See: [Directives for allowing or suppressing documentation](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#directives-for-allowing-or-suppressing-documentation)

### Calling sequence

```ruby
# :call-seq:
#   readlines(sep = $/)        -> array
#   readlines(limit)           -> array
#   readlines(sep, limit)      -> array
```
<!-- {: data-highlight=":call-seq:"} -->

Use `:call-seq:` when the generated signature needs to show multiple forms or a return value.

See: [call-seq](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#call-seq)

### Arguments and yields

```ruby
# :args: source, destination = nil
# :yields: value
```
<!-- {: data-highlight=":args:; :yields:"} -->

These directives override the arguments or yielded values reported by RDoc.

See: [Directives for method documentation](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#directives-for-method-documentation)

### Category

```ruby
# :category: Utilities
#
# Escapes HTML characters.
def escape_html(text)
end
```
<!-- {: data-highlight=":category:"} -->

`:category:` applies only to the next documented item.

See: [Directives for organizing documentation](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#directives-for-organizing-documentation)

### Section

```ruby
# :section: Expiry methods
# Methods for expiring records.

def expire!
end
```
<!-- {: data-highlight=":section:"} -->

`:section:` remains active until another section directive changes it.

See: [Directives for organizing documentation](https://ruby.github.io/rdoc/doc/markup_reference/rdoc_rdoc.html#directives-for-organizing-documentation)

### Markup format

```ruby
# :markup: TomDoc
```
<!-- {: data-highlight=":markup: TomDoc"} -->

Place the directive at the beginning of the file to select a supported input format.

See: [Specifying markup format](https://ruby.github.io/rdoc/#specifying-markup-format)

## Also see

- <https://ruby-doc.org/3.4/RDoc/MarkupReference.html>
- <https://ruby-doc.org/3.4/contributing/documentation_guide_md.html>

<!-- {: .-also-see} -->
