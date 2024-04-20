---
title: ReStructuredText
category: Markup
---

### About
{: .-intro}

ReStructuredText is a markup language for writing documents.

- <https://en.wikipedia.org/wiki/ReStructuredText>

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
    
       * - :key:`Cuisine:`
         - :val:`French/fusion`
       * - :key:`Number of ingredients:`
         - :val:`8`
       * - :key:`Preparation time:`
         - :val:`30 hours`
