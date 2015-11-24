---
title: CSS selectors
category: CSS
---

    [attr="value"]       /*  =   exact */
    [class~="box"]       /*  ~=  has word */
    [class|="icon"]      /*  |=  exact, or prefix (eg, value-) */
    [href$=".doc"]       /*  $=  ends in */
    [class*="-is-"]      /*  *=  contains */

    h3 + p               /*  +   adjacent sibling */
    article ~ footer     /*  ~   far sibling */
    .container > .box    /*  >   direct child */

    :target (h2#foo:target)
    :disabled

    :nth-child
    :nth-child(3n)
    :nth-child(3n+2)
    :nth-child(-n+4)
    :nth-last-child(...)

    :first-of-type
    :last-of-type
    :nth-of-type
    :only-of-type   - only child of its parent thats like that

    :only-child
