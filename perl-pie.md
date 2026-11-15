---
title: Perl-pie
category: CLI
intro: |
  Use `perl` to search and replace across many files.
links:
  - title: perlrun
    url: https://perldoc.perl.org/perlrun
---

### Search and replace

```sh
perl -p -i -e 's/hello/hola/g' *.txt
```

### Back-referencing

Use `\1` et al.

```sh
# '@include align-items(center);' => 'align-items: center;'
perl -p -i -e "s/\@include (align-items)\((.*)\);/\1: \2;/g"
```
