---
title: Tabular
category: Vim
---

### Examples

`:Tab /,`

    hello , there
    hi    , you

`:Tab /,/r0`

    hello,there
       hi,  you

`:Tab /,/r1c1l0`

    # the separator counts as a column
    # [r]ight align, [1] space, [c]enter align the comma, [1] space,
    # [l]eft align, [0] spaces
    hello , etc
       hi , etc
    
`:Tab /^[^,]*\zs,/r0`

    abc,hello
      c,hi there
      a,yo

### Specifiers

    l|r|cN    # left-right-center, with N spaces padding (l0)
    r1c1l0    # multiple specifiers (one per column)
              # the separator counts as a column

