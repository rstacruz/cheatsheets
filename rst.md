---
title: ReStructuredText
subtitle: ReStructuredText markup language
logo: { set: icon-park-outline, name: book }
category: Markup
intro: |
  ReStructuredText is a markup language for writing documents.
links:
  - title: Docutils reStructuredText reference
    url: https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html
tier: t3
last_verified_with: "Docutils 0.23."
created_at: 2012-03-16
updated: 2026-11-26
---

### Comments

```
.. @theme 2010
.. include:: ../themes/2010/common.rst
.. contents::
.. |substitute| replace:: replacement name
```
<!-- {: data-highlight=".. include::"} -->

See: [Comments](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#comments)

### Headings

```
Heading
=======

.. class:: brief

Hello there. |substitute| **This is bold**


 - Bullet list with a link_ (or `link with words`_)
 - Yes

.. _link: http://link.org
```
<!-- {: data-highlight="======="} -->

See: [Section titles](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#section-titles)

### PDF page break

```
.. raw:: pdf

   PageBreak oneColumn
```
<!-- {: data-highlight=".. raw:: pdf"} -->

See: [raw directive](https://docutils.sourceforge.io/docs/ref/rst/directives.html#raw)

### Link targets

```
Internal link target_.

.. _target:

This is where _target will end up in.
```
<!-- {: data-highlight=".. _target:"} -->

See: [Internal hyperlink targets](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#internal-hyperlink-targets)

### Tables (?)

```
.. class:: hash-table

.. list-table::

   * - :key:`Cuisine:`
     - :val:`French/fusion`
   * - :key:`Number of ingredients:`
     - :val:`8`
   * - :key:`Preparation time:`
     - :val:`30 hours`
```
<!-- {: data-highlight=".. list-table::"} -->

See: [list-table directive](https://docutils.sourceforge.io/docs/ref/rst/directives.html#list-table)
