---
title: Yaml
category: Markup
prism_languages: [yaml]
---

### Dictionaries and lists

```yaml
# comments start with "#"
# dictionary are written like "key: value"
name: Martin D'vloper
languages:
  perl: Elite
  python: Elite
  pascal: Lame

# list items beginn with a "- "
foods:
  - Apple
  - Orange
  - Strawberry
  - Mango

# booleans are lower case
employed: true
```


### Multiline strings

```yaml
# Literal Block Scalar
Multiline: |
  exactly as you see
  will appear these three
  lines of poetry
```

```yaml
# Folded Block Scalar
Multiline: <
  this is really a
  single line of text
  despite appearances
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
