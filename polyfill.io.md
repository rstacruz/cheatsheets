---
title: Polyfill.io
category: JavaScript libraries
updated: 2017-10-26
layout: 2017/sheet
intro: |
  [Polyfill.io](https://polyfill.io) is a service that serves JavaScript polyfills.
---

## Usage

### Default usage

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```
{: .-wrap}

This is the default script for Polyfill.io.

### References

- [API example](https://polyfill.io/v2/docs/api) _(polyfill.io)_
- [List of features](https://polyfill.io/v2/docs/features) _(polyfill.io)_

## Optimized

### For modern browsers

```html
<script>(function(d,s){
if(window.Promise&&[].includes&&Object.assign&&window.Map)return;
var sc=d.getElementsByTagName(s)[0],js=d.createElement(s);
js.src='https://cdn.polyfill.io/v2/polyfill.min.js';
sc.parentNode.insertBefore(js, sc);
}(document,'script'))</script>
```

This only includes polyfill.io when necessary, skipping it for modern browsers for faster load times.

### Extra features

```html
<script>(function(d,s){
if(window.fetch&&window.Promise&&[].includes&&Object.assign&&window.Map)return;
var sc=d.getElementsByTagName(s)[0],js=d.createElement(s);
js.src='https://cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch';
sc.parentNode.insertBefore(js, sc);
}(document,'script'))</script>
```
{: data-line="2,4"}

This is the same as the previous, but also adds a polyfill for `window.fetch()`. We add a `window.fetch` check and loads the additional `fetch` feature.
