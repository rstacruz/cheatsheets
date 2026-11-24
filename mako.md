---
title: Mako
subtitle: Python template compiler
category: Python
last_verified_with: "Mako 1.4.3."
updated: 2026-11-24
tier: t3
intro: |
  Mako templates: expressions, control structures, Python blocks, inheritance, and rendering from Python.
links:
  - title: Mako syntax documentation
    url: https://docs.makotemplates.org/en/latest/syntax.html
  - title: Mako usage documentation
    url: https://docs.makotemplates.org/en/latest/usage.html
  - title: Mako on GitHub
    url: https://github.com/sqlalchemy/mako
---

## Syntax

### Expressions

```
Variable x has content: ${x}
Expression: ${x + 1}
Escaped for HTML: ${html | h}
```

`h` escapes HTML; built-in filters also include `u`, `x`, `trim`, `entity`, `str` and `n`.

See: [Expression substitution](https://docs.makotemplates.org/en/latest/syntax.html#expression-substitution)

### Control structures

```
% for x in range(5):
    % if x % 2 == 0:
    ${x} is even!
    % else:
    ${x} is odd!
    % endif
% endfor
```

A control line starts with `%`, which may be indented but must come before any text.

See: [Control structures](https://docs.makotemplates.org/en/latest/syntax.html#control-structures)

### Including Python code

#### Local variables

```
<%
    greeting = "Hello world!"
%>
${greeting}
```

#### Module level

```
<%!
def sign_string(number):
    if number > 0:
        return "positive"
    elif number < 0:
        return "negative"
    else:
        return "zero"
%>
```

`<%! %>` runs once when the template compiles, so it cannot read render-time variables.

See: [Python blocks](https://docs.makotemplates.org/en/latest/syntax.html#python-blocks)

### Special blocks

#### Raw text

```
<%text filter="h">
    This is a raw block where ${nothing is evaluated}
    <%
        not even this
    %>
    and <html is escaped> too with "h" filter
</%text>
```

#### Reusable def

```
<%def name="myfunc(x)">
    this is a reusable macro, with arguments: ${x}
</%def>

${myfunc(42)}
```

#### Comment

```
<%doc>
    this is a comment
</%doc>
```

`<%doc>` holds a comment block; `##` comments out a single line.

See: [Tags](https://docs.makotemplates.org/en/latest/syntax.html#tags)

### Inheritance

#### shared.html

```html
<html>
  <head>
    <title><%block name="title" /></title>
  </head>
  <body>
    <header><h1>${self.title()}</h1></header>
    <main>${self.body()}</main>
  </body>
</html>
```

#### home.html

```html
<%inherit file="shared.html" />
<%block name="title">Welcome to my site</%block>

This is the body
```

#### article.html

```html
<%inherit file="shared.html" />
<%block name="title">${post.title}</%block>

${post.content}
```

`${self.body()}` renders the inheriting template; `${self.title()}` renders a block twice, since a name may only be defined once.

See: [Inheritance](https://docs.makotemplates.org/en/latest/syntax.html#inherit)

## Library

### Render a string

```python
from mako.template import Template

print(Template("hello, ${name}!").render(name="jack"))
```
<!-- {: data-highlight="Template"} -->

See: [Template](https://docs.makotemplates.org/en/latest/usage.html#mako.template.Template)

### Load templates from disk

```python
from mako.lookup import TemplateLookup

lookup = TemplateLookup(directories=["templates"])
print(lookup.get_template("home.html").render())
```
<!-- {: data-highlight="TemplateLookup"} -->

`TemplateLookup` resolves `<%inherit>` and `<%include>` paths against its directories.

See: [TemplateLookup](https://docs.makotemplates.org/en/latest/usage.html#mako.lookup.TemplateLookup)
