---
title: How to use the Jinja loop variable
link_title: Jinja loop index
subtitle: Index rows in loops
logo: { set: icon-park-outline, name: list-numbers }
category: Python
layout: snippet
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-28
links:
  - title: The loop variable
    url: https://jinja.palletsprojects.com/en/stable/templates/#loop-variable
  - title: For loops
    url: https://jinja.palletsprojects.com/en/stable/templates/#for
---

## Loop variables
<!-- {: .-snippets} -->

### Number each row
<!-- {: .-snippet} -->

```jinja2
{% for n in range(3) -%}
{{ loop.index }}. item {{ n }}
{% endfor %}
```
<!-- {: data-highlight="loop.index"} -->

#### Output

```text
1. item 0
2. item 1
3. item 2
```

**Counts iterations from one.** See [loop.index](https://jinja.palletsprojects.com/en/stable/templates/#loop.index).

### Start from zero
<!-- {: .-snippet} -->

```jinja2
{% for n in range(3) -%}
{{ loop.index0 }}: item {{ n }}
{% endfor %}
```
<!-- {: data-highlight="loop.index0"} -->

#### Output

```text
0: item 0
1: item 1
2: item 2
```

**Counts iterations from zero for array indexes.** See [loop.index0](https://jinja.palletsprojects.com/en/stable/templates/#loop.index0).

### Mark first and last
<!-- {: .-snippet} -->

```jinja2
{% for n in range(2) -%}
{{ n }}: {{ loop.first }} / {{ loop.last }}
{% endfor %}
```
<!-- {: data-highlight="loop.first; loop.last"} -->

#### Output

```text
0: True / False
1: False / True
```

**Reports whether the current iteration is the first or last.** See [loop.first](https://jinja.palletsprojects.com/en/stable/templates/#loop.first).

### Count from the end
<!-- {: .-snippet} -->

```jinja2
{% for n in range(3) -%}
{{ n }}: {{ loop.revindex }} of {{ loop.length }}
{% endfor %}
```
<!-- {: data-highlight="loop.revindex; loop.length"} -->

#### Output

```text
0: 3 of 3
1: 2 of 3
2: 1 of 3
```

**`revindex` counts down to one; `length` is the item count.** See [loop.revindex](https://jinja.palletsprojects.com/en/stable/templates/#loop.revindex).

### Reach the outer loop
<!-- {: .-snippet} -->

```jinja2
{% for row in [["a", "b"], ["c"]] -%}
{% set outer = loop -%}
{% for cell in row -%}
{{ outer.index }}.{{ loop.index }}: {{ cell }}
{% endfor -%}
{% endfor %}
```
<!-- {: data-highlight="outer.index"} -->

#### Output

```text
1.1: a
1.2: b
2.1: c
```

**Saves the outer loop before entering the inner one.** See [The loop variable](https://jinja.palletsprojects.com/en/stable/templates/#loop-variable).
