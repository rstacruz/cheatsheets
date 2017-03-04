---
title: Git one-liners
---

When did someone work

    git log --all --author='Rico' --pretty="%ai" | awk '{ print $1 }' | sort | uniq
