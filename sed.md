---
title: Sed
category: CLI
---

### OSX Caveat

To do in place replacements `-i ''` is required (GNU/sed is different)

    sed -i '' -e 's/foo/bar/' example.md

### GNU/sed

To do in place replacements use `-i` without arg

    sed -i -e 's/foo/bar/' example.md

### Yes

Print until a certain line is met

    sed '/begin api/q'

Print until a certain line is met, but not that line

    sed '/^# begin/,$d'

Print everything after a given line

    sed -n '/end api/,$p'
