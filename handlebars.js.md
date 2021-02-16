---
title: Handlebars.js
category: JavaScript libraries
layout: 2017/sheet
weight: -1
---

{% raw %}

### Helpers

```js
Handlebars.registerHelper('link_to', function() {
  return "<a href='" + this.url + "'>" + this.body + "</a>";
})
```

```js
var context = { posts: [{url: "/hello-world", body: "Hello World!"}] }
var source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>"
```

```js
var template = Handlebars.compile(source)
template(context)
```

Would render:

```html
<ul>
  <li><a href='/hello-world'>Hello World!</a></li>
</ul>
```

{% endraw %}
