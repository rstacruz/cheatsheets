---
title: Riot.js
category: JavaScript libraries
layout: default-ad
---

## Tags

```js
/* tag-name.tag */
<tag-name>
  <div>
    hello {name}
  </div>

  this.name = opts.name
</tag-name>
```

```html
<!-- in html -->
<tag-name>
<script>riot.mount('*')</script>
<script>riot.mount('tag-name')</script>
<script>riot.mount('tag-name', { title: 'my app', ... })</script>
```

## Expressions

```
{value}
{value || 'its a js expression'}

<input checked={null}>   /* null values ignore the tag */
<p class={ selected: true }>
```

### Loops

```
<li each={movies}>{title}</li>
```

### Conditional
```
<div if={error}>
<div show={error}> /* show using display: '' */
<div hide={error}> /* hide using display: none */
```

### Events

```js
<button onclick={go}>

this.go = function (e) { ... }
```

## API

```js
this.update()
this.update({ data: 'hi' }

this.unmount()
this.unmount(true) // keep parent tag

riot.update() // update all
```

## Nesting

```
<my-tag>
  <child></child>
  var child = this.tags.child
</my-tag>
```

### Names

```
<my-tag>
  <child name='xyz'></child>
  var child = this.tags.xyz
</my-tag>
```

## Nested HTML

```js
<yield/>
```

### Yield to/from

```js
<post>
  <yield to='title'>Hello</yield>
  <yield to='body'>Hey there world</yield>
</post>
```

```js
<post>
  <yield from='title'/>
  <yield from='body'/>
</post>
```

## Router

```js
riot.route('customers/*/edit', (id) => {
})
riot.route('customers/234/edit')
riot.route.start()
riot.route.start(true) // exec the current url
```

## Lifecycle

```js
this.on('before-mount', function() {
// before the tag is mounted
})

this.on('mount', function() {
// right after the tag is mounted on the page
})

this.on('update', function() {
// allows recalculation of context data before the update
})

this.on('updated', function() {
// right after the tag template is updated
})

this.on('before-unmount', function() {
// before the tag is removed
})

this.on('unmount', function() {
// when the tag is removed from the page
})

// curious about all events ?
this.on('all', function(eventName) {
console.info(eventName)
})
```
