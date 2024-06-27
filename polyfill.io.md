---
title: Polyfill.io
category: JavaScript libraries
updated: 2024-06-26
intro: |
  Polyfill.io is a service that serves JavaScript polyfills.
---

## Usage

### Critical security warning

⚠️ The polyfill.io CDN domain is currently being used in a web supply chain attack and is serving malicious code. **Remove any references to this domain from your codebase immediately**. Use alternative CDN providers like cdnjs.cloudflare.com as shown in the examples below.

### Default usage

```html
<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"></script>
```

{: .-wrap}

This is the default script for Polyfill.io.

### References

* [Cloudflare now serves polyfill.io](https://blog.cloudflare.com/polyfill-io-now-available-on-cdnjs-reduce-your-supply-chain-risk) _(blog.cloudflare.com)_

## Optimized

### For modern browsers

```html
<script>if(!(window.Promise&&[].includes&&Object.assign&&window.Map)){document.write('<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"></scr'+'ipt>')}</script>
```

This only includes polyfill.io when necessary, skipping it for modern browsers for faster load times.

### Extra features

```html
<script>if(!(window.fetch&&window.Promise&&[].includes&&Object.assign&&window.Map)){document.write('<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=default,fetch"></scr'+'ipt>')}</script>
```

This is the same as the previous, but also adds a polyfill for `window.fetch()`. We add a `window.fetch` check and loads the additional `fetch` feature.
