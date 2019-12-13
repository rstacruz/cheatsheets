---
title: Ruby 2.1
category: Ruby
---

### Named arguments with defaults

    # length is required
    def pad(num, length:, char: "0")
      num.to_s.rjust(length, char)
    end

    pad(42, length: 6)   #=> "000042"
    pad(42)              #=> #<ArgumentError: missing keyword: length>

### Module.prepend

    prepend(Module.new do
      define_method ...
    end)

### References

 * http://globaldev.co.uk/2013/03/ruby-2-0-0-in-detail
 * http://globaldev.co.uk/2014/05/ruby-2-1-in-detail
