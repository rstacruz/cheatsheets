---
title: Yaml
category: Markup
layout: 2017/sheet
prism_languages: [yaml]
---

### Multiline strings

```yaml
Multiline: |
  hello
  world
```

### Inheritance

```yaml
parent: &defaults
  a: 2
  b: 3

child:
  <<: *defaults
  b: 4
```

### Reference content

```yaml
values: &ref
  - These values
  - will be reused below
  
other_values:
  <<: *ref
```
