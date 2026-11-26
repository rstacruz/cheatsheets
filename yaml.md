---
title: Yaml
subtitle: Human-readable data format
category: Markup
intro: |
  [YAML](https://yaml.org/spec/1.2.2/) is a human-readable data serialization format. This sheet covers dictionaries, lists, block scalars, anchors, and merge keys.
links:
  - title: YAML 1.2.2 specification
    url: https://yaml.org/spec/1.2.2/
  - title: Merge key type
    url: https://yaml.org/type/merge.html
prism_languages: [yaml]
tier: t3
last_verified_with: "YAML 1.2.2."
updated: 2026-11-26
---

## Basics

### Dictionaries and lists

#### Comments and dictionaries

```yaml
# comments start with "#"
# dictionaries are written like "key: value"
name: Martin D'vloper
languages:
  perl: Elite
  python: Elite
  pascal: Lame
```

#### Lists

```yaml
# list items begin with a "- "
foods:
  - Apple
  - Orange
  - Strawberry
  - Mango
```

#### Booleans

```yaml
# booleans are lower case
employed: true
```

See: [Collections](https://yaml.org/spec/1.2.2/#21-collections), [Boolean](https://yaml.org/spec/1.2.2/#10212-boolean)

### Multiline strings

#### Literal block

```yaml
# Literal Block Scalar
Multiline: |
  exactly as you see
  will appear these three
  lines of poetry
```

<!-- {: data-highlight="Multiline: |"} -->

#### Folded block

```yaml
# Folded Block Scalar
Multiline: >
  this is really a
  single line of text
  despite appearances
```

<!-- {: data-highlight="Multiline: >"} -->

See: [Block scalar styles](https://yaml.org/spec/1.2.2/#81-block-scalar-styles)

### Inheritance

```yaml
parent: &defaults
  a: 2
  b: 3

child:
  <<: *defaults
  b: 4
```

<!-- {: data-highlight="<<: *defaults"} -->

See: [Node anchors](https://yaml.org/spec/1.2.2/#692-node-anchors), [Merge key](https://yaml.org/type/merge.html)

### Reference content

```yaml
values: &ref
  a: These values
  b: will be reused below

other_values:
  <<: *ref
  c: and this one
```

<!-- {: data-highlight="&ref; *ref"} -->

See: [Aliases](https://yaml.org/spec/1.2.2/#71-alias-nodes)
