---
title: Sed
layout: default
---

### OSX Caveat

To do in place replacements `-i ''` is required (GNU/sed is different)

    sed -i '' -e 's/foo/bar/' example.md


### GNU/sed

To do in place replacements use `-i` without arg

    sed -i -e 's/foo/bar/' example.md
