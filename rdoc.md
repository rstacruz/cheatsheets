---
title: Rdoc
category: Markup
---

### Basic RDoc format

```rb
# Foo.
#
# @example
#
#   y
#   g
#
# @param [String] param_name The xx and xx.
#
# @see https://example.com/
#
# @return [true] if so
```

### Hash parameters

```rb
# @param [Hash] opts the options to create a message with.
# @option opts [String] :subject The subject
# @option opts [String] :from ('nobody') From address
# @option opts [String] :to Recipient email
# @option opts [String] :body ('') The email's body
```

### Parameter types

```rb
# @param (see User#initialize)
# @param [OptionParser] opts the option parser object
# @param [Array<String>] args the arguments passed from input. This
#   array will be modified.
# @param [Array<String, Symbol>] list the list of strings and symbols.
# @param [Hash<Symbol, String>] a hash with symbol keys and string values
#
# The options parsed out of the commandline.
# Default options are:
#   :format => :dot
```

### Exceptions
```rb
# @raise [AccountBalanceError] if the account does not have
#   sufficient funds to perform the transaction
```

### Inline

```markdown
*bold*
_emphasized_
+code+
```

```markdown
{ObjectName#method optional title}
{Class::CONSTANT My constant's title}
{#method_inside_current_namespace}
```

```markdown
https://www.example.com/
See Models::User@Examples
{Google}[https://google.com/]
```

### Skip

```rb
def input # :nodoc:
```

```rb
module MyModule # :nodoc: all
```

### Definition lists

```rb
# == Definition lists
#
# list::  hi.
# +foo+:: parameterized
```

```rb
# == Definition lists
# [foo]   also
# [bar]   like this
```

### Return types

```rb
# @return [String]
# @return [String, nil] the name
```

### Callseq

```rb
# :call-seq:
#   ARGF.readlines(sep=$/)     -> array
#   ARGF.readlines(limit)      -> array
#   ARGF.readlines(sep, limit) -> array
#
#   ARGF.to_a(sep=$/)     -> array
#   ARGF.to_a(limit)      -> array
#   ARGF.to_a(sep, limit) -> array
```

### Category

```rb
# :category: Utilities
```

### Sections

```rb
# :section: Expiry methods
# methods relating to expiring

def expire!
def expired?
...
```

### Using tomdoc

```rb
# :markup: TomDoc
```

Place this at the beginning of the file.

## Also see
{: .-one-column}

* <https://docs.ruby-lang.org/en/2.1.0/RDoc/Markup.html>
* <https://www.rubydoc.info/gems/yard/file/docs/GettingStarted.md>
* <https://rubydoc.info/gems/yard/file/docs/Tags.md>
{: .-also-see}
