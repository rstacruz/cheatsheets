title: ReStructuredText
---

### Comments

    .. @theme 2010
    .. include:: ../themes/2010/common.rst
    .. contents::
    .. |substitute| replace:: replacement name

### Headings

    Heading
    =======
    
    .. class:: brief
    
    Hello there. |substitute| **This is bold**
    
    
     - Bullet list with a link_ (or `link with words`_)
     - Yes
    
    .. _link: http://link.org
    
### PDF page break

    .. raw:: pdf
    
       PageBreak oneColumn
    
### Link targets
    
    Internal link target_.
    
    .. _target:
    
    This is where _target will end up in.
    
### Tables (?)
    
    .. class:: hash-table
    
    .. list-table::
    
       * - :key:`Weekly work hours:`
         - :val:`50 hours`
       * - :key:`Cost per hour:`
         - :val:`PhP 1,500/hour`
       * - :key:`Weekly rate:`
         - :val:`PhP 75,000/week`
