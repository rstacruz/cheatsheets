---
title: mako
category: python
layout: 2017/sheet
---

### Basic usage

```
- variable x has content: ${x}
- expression: ${x + 1}
- escaped for HTML: ${x | h}
```

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

### Including Python code

```
<%
    greeting = "Hello world!"
    # arbitrary python code
%>

<%!
# arbitrary python code run at toplevel
# cannot access variables!

def sign_string(number):
    if number > 0:
        return "positive"
    elif number < 0:
        return "negative"
    else:
        return "zero"
%>
```

### Special blocks
```
<%text filter="h">
    This is a raw block where ${nothing is evaluated}
    <%
        not even this
    %>
    and <html is escaped> too with "h" filter
</%text>

<%def name="myfunc(x)">
    this is a reusable macro, with arguments: ${x}
</%def>

${myfunc(42)}

<%doc>
    this is a comment
</%doc>    
```

### Inheritance
`shared.html`:
```
<html>
  <head>
    <title><%block name="title" /></title>
  </head>
  <body>
    <header><h1><%block name="title" /></h1></header>
    <main>${self.body()}</main>
  </body>
</html>
```

`home.html`:
```
<%inherit file="shared.html" />
<%block name="title">Welcome to my site</%block>

This is the body
```

`article.html`:
```
<%inherit file="shared.html" />
<%block name="title">${post.title}</%block>

${post.content}
```


## Library

### Basic usage
```python
from mako.template import Template

mytemplate = Template("hello, ${name}!")
print(mytemplate.render(name="jack"))
```
