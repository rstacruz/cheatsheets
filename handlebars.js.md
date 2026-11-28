---
title: Handlebars.js
subtitle: JavaScript templating engine
logo: { src: /assets/logos/handlebars.svg, mono: true }
category: JavaScript libraries
weight: -1
created_at: 2017-08-28
updated: 2026-11-24
last_verified_with: "Handlebars 4.7.10, verified on Node 26.13.1."
tier: t3
intro: |
  Handlebars templating: compiling templates, escaping, partials, and helpers.
links:
  - title: Handlebars guide
    url: https://handlebarsjs.com/guide/
  - title: Handlebars API reference
    url: https://handlebarsjs.com/api-reference/
  - title: Handlebars on GitHub
    url: https://github.com/handlebars-lang/handlebars.js
---

{% raw %}

## Templates

### Compile and render

```js
import Handlebars from 'handlebars'

const template = Handlebars.compile('<h1>{{title}}</h1>')

template({ title: 'Hello' })
// <h1>Hello</h1>
```

`compile` is the slow step, so compile once and call the result with each context.

See: [Handlebars.compile](https://handlebarsjs.com/api-reference/compilation.html)

### Escaping

```js
import Handlebars from 'handlebars'

const render = Handlebars.compile('<p>{{body}}</p>')

render({ body: '<b>hi</b>' })
// <p>&lt;b&gt;hi&lt;/b&gt;</p>
```

`{{body}}` HTML-escapes the value; `{{{body}}}` inserts it raw.

See: [HTML escaping](https://handlebarsjs.com/guide/expressions.html#html-escaping)

### Partials

```js
import Handlebars from 'handlebars'

Handlebars.registerPartial('post', '<li>{{title}}</li>')

Handlebars.compile('<ul>{{> post}}</ul>')({ title: 'Hi' })
// <ul><li>Hi</li></ul>
```

Register a partial once, then include it with `{{> name}}`.

See: [Partials](https://handlebarsjs.com/guide/partials.html#partials)

## Helpers

### Register a helper

#### Helper

```js
import Handlebars from 'handlebars'

Handlebars.registerHelper('link_to', function () {
  const html = "<a href='" + this.url + "'>" + this.body + '</a>'
  return new Handlebars.SafeString(html)
})
```

#### Template

```js
const context = {
  posts: [{ url: '/hello-world', body: 'Hello World!' }]
}
const source = '<ul>{{#posts}}<li>{{link_to}}</li>{{/posts}}</ul>'
```

#### Render

```js
Handlebars.compile(source)(context)
// <ul><li><a href='/hello-world'>Hello World!</a></li></ul>
```

Helpers run with the current item as `this`. Return HTML in `new Handlebars.SafeString(...)`, or the template escapes it.

See: [Registering helpers](https://handlebarsjs.com/api-reference/helpers.html)

### Built-in helpers

```js
const source = '{{#each posts}}<li>{{title}}</li>{{/each}}'
const posts = [{ title: 'a' }, { title: 'b' }]

Handlebars.compile(source)({ posts })
// <li>a</li><li>b</li>
```

`each` also exposes `{{@index}}`, `{{@first}}` and `{{@last}}`; `if`, `unless` and `with` wrap a block conditionally.

See: [Built-in helpers](https://handlebarsjs.com/guide/builtin-helpers.html#built-in-helpers)

## References

- <https://handlebarsjs.com/guide/>
- <https://handlebarsjs.com/api-reference/>

{% endraw %}
