---
title: Inline documentation
---

* Ruby: rdoc
* JavaScript: jsdoc

### RDoc

    # Gets a circle's area
    #
    # @example
    #
    #   area(3)
    #   #=> 28.27
    #
    # @param [Number] r The radius of the ricle
    # @return [true] If so
    #
    # == Definition lists
    #
    # list::  hi.
    # +foo+:: parameterized
    #
    # == Definition lists
    # [foo]   also
    # [bar]   like this

http://rdoc.rubyforge.org/RDoc/Markup.html

### Jsdoc

    /**
     * Ads numbers
     *
     * @this {Circle}
     * @param {Number} r The radius
