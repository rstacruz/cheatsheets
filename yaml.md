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

### Property

```
html tag with property:
  %main{:role => "main"}
```

```
tag div(css) with property:
  .text-right{style: "margin-top: 5px;"}
```
