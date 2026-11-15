---
title: Microformats
subtitle: Semantic HTML markup patterns
category: Hidden
# Predates microformats2; mixes hAtom classes with unattached schema.org microdata.
tags: [Archived]
archived: |
  This predates microformats2 and mixes hAtom class names with unattached
  schema.org microdata, so parsers extract nothing. Use
  [h-entry](https://microformats.org/wiki/h-entry) instead.
---

### Author

``` html
<span class="entry-author" itemprop="author" itemscope="itemscope" itemtype="https://schema.org/Person">
  <a href="https://AUTHORPAGE" class="entry-author-link" itemprop="url" rel="author">
    <span class="entry-author-name" itemprop="name">AUTHORNAME</span>
  </a>
</span>
```

### Time

``` html
<time class="entry-time" itemprop="datePublished" datetime="2009-02-09T20:04:00+00:00">February 9, 2009</time>
```
