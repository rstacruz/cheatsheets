---
title: Underscore-string
category: JavaScript libraries
---

### Usage

    // Use it like so:
    _.str.trim("hey");
    _s.trim("hey");

    // Unless you do:
    _.mixin(_.string.exports());

    // So you can:
    _.trim("hey");
    _("hey").trim();

### Trimming

    _.truncate("Hello world", 4) // => "Hell..."
    _.prune("Hello world", 5)    // => "Hello..."

    _.trim(" foo ")              // => "foo"
    _.trim("-foo-", '-')         // => "foo"
    _.ltrim
    _.rtrim

### Numbers

    _.numberFormat(1000, 2)  // => "1,000.00"

### Caps

    _.capitalize("foo bar")       // => "Foo Bar"
    _.humanize("hey-there foo")   // => "Hey there foo"
    _.titleize('My name is hi')   // => "My Name Is Hi"

    _.dasherize('MozTransform')   // => "-moz-transform"
    _.underscored('MozTransform') // => "moz_transform"
    _.classify('-moz-transform')  // => "MozTransform"
    _.camelize('moz_transform')   // => "MozTransform"

    _.slugify("hey there")        // => "hey-there"

    _.swapCase("hELLO")           // => "Hello"

### Checks

    _.startsWith('image.gif', 'image') // => true
    _.endsWith('image.gif', '.gif')    // => true
    _.isBlank(" ")                     // => true (also for "\n", "")

### HTML

    _.escapeHTML("<div>")
    _.unescapeHTML("&lt;div&gt;")
    _.stripTags("<div>hi</div>")

### Quote

    _.quote("hi", '"') // => '"hi"'
    _.unquote('"hi"')  // => "hi"

### Splits

    _.lines("hi\nthere")     // => ["hi","there"]
    _.words("hi  there you") // => ["hi","there","you"]

### Sprintf

    _.sprintf("%.1f", 1.17)

### Pad

    _.pad("1", 8)               // => "       1"
    _.pad("1", 8, "0")          // => "00000001"
    _.pad("1", 8, " ", "right") // => "1       "
    _.pad("1", 8, " ", "both")  // => "    1   "

    _.lpad(..)  // same as _.pad(.., 'left')
    _.rpad(..)  // same as _.pad(.., 'right')
    _.lrpad(..) // same as _.pad(.., 'both')

### References

* https://github.com/epeli/underscore.string
