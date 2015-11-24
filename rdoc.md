---
title: Rdoc
category: Markup
---

### Basic RDoc format

    # Foo.
    # 
    # @example
    #
    #   y
    #   g
    #
    # @param [String] param_name The xx and xx.
    #
    # @see http://url.com
    #
    # @return [true] if so
    #
    # == Definition lists
    #
    # list::  hi.
    # +foo+:: parameterized
    #
    # == Definition lists
    # [foo]   also
    # [bar]   like this

### Inline

    *bold*
    _emphasized_
    +code+

    http://www.link.com
    See Models::User@Examples
    {Google}[http://google.com]

### Skip

    def input # :nodoc:

    module MyModule # :nodoc: all

### Return types

    # @return [String]
    # @return [String, nil] the name

### Callseq

    # :call-seq:
    #   ARGF.readlines(sep=$/)     -> array
    #   ARGF.readlines(limit)      -> array
    #   ARGF.readlines(sep, limit) -> array
    # 
    #   ARGF.to_a(sep=$/)     -> array
    #   ARGF.to_a(limit)      -> array
    #   ARGF.to_a(sep, limit) -> array

### Category

    # :category: Utilities

### Sections

    # :section: Expiry methods
    # methods relating to expiring

    def expire!
    def expired?
    ...

### Using tomdoc

    # :markup: TomDoc
    # at the beginning ofthe file

http://rdoc.rubyforge.org/RDoc/Markup.html
http://www.rubydoc.info/gems/yard/file/docs/GettingStarted.md
