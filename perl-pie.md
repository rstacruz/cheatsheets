---
title: Perl-pie
subtitle: In-place file editing
category: CLI
intro: |
  Use `perl` to search and replace across many files.
links:
  - title: perlrun
    url: https://perldoc.perl.org/perlrun
tier: t3
last_verified_with: "Perl 5.44.0."
updated: 2026-11-25
---

### Search and replace

```sh
perl -p -i -e 's/hello/hola/g' *.txt
```
<!-- {: data-highlight="perl -p -i -e"} -->

See: [perlrun -p](https://perldoc.perl.org/perlrun#-p)

### Back-referencing

```sh
# '@include align-items(center);' => 'align-items: center;'
perl -p -i -e "s/\@include (align-items)\((.*)\);/\1: \2;/g"
```
<!-- {: data-highlight="\1: \2"} -->

Use `\1`, `\2` to reinsert capture groups.

See: [Capture groups](https://perldoc.perl.org/perlre#Capture-groups)
