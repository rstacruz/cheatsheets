---
title: Xpath
layout: default
---

### Prefixes

    //  anywhere              # //hr[@class='edge']
    ./  relative              # ./a
    /   root                  # /html/body/div

### Conditions (`[]`)

                               # div[@class="head"]
                               # div[@class="head" and @id="top"]

    contains()                 # font[contains(@class,"head")]
    starts-with()              # font[starts-with(@class,"head")]
    ends-with()                # font[ends-with(@class,"head")]

    text()                     # button[text()="Submit"]
    name()                     # div[child[name()='div']]
    lang(str)
    namespace-uri()

    count()                    # table[count(tr)=1]
    last()                     # tr[last()]
    position()                 # ol/li[position()=2]

    not(expr)

### Axes

    /   child                 # div/a   div[child::a]
    //  descendant            # div//a
    @   attribute             # input[@type="text"]
    ..  parent                # span[parent::[name()='div']]

        ancestor
        ancestor-or-self
        following
        following-sibling
        preceding
        preceding-sibling

### Nesting

    a[/span[@class="heading"]]

