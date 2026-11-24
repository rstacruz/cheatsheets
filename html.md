---
title: HTML
subtitle: Document markup language
category: HTML
last_verified_with: "WHATWG HTML Living Standard, MDN Web Docs."
updated: 2026-11-24
---

## Document

### Skeleton

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Page title</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

The doctype is not an element and comes first; `<meta charset>` belongs in the first 1024 bytes.

### Viewport

```html
<meta name="viewport"
  content="width=device-width, initial-scale=1">
```

Match the device width, and leave out `user-scalable=no`, which blocks zoom. `viewport-fit=cover` extends the page under a notch.

### Icons

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Browsers pick the best match; the 180×180 PNG is the iOS home screen icon, and the `-precomposed` suffix is gone since iOS 7.

## Metadata

### Description and social cards

```html
<meta name="description" content="One-line page summary">
<meta property="og:title" content="Page title">
<meta property="og:description" content="One-line page summary">
<meta property="og:image" content="https://example.com/preview.png">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

Chat apps and social sites read the Open Graph tags; `twitter:card` picks the large image layout.

### Scripts

```html
<script src="/app.js" defer></script>
<script type="module" src="/app.js"></script>
<script src="/analytics.js" async></script>
```

`defer` keeps execution order after parsing, `type="module"` defers as well and enables imports, and `async` runs whenever the file arrives.

### Preload and fonts

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/inter.woff2" as="font"
  type="font/woff2" crossorigin>
```

A font preload needs `crossorigin` even for a same-origin file, or the browser fetches it twice.

## Structure

### Landmarks

```html
<body>
  <header>...</header>
  <nav aria-label="Main">...</nav>
  <main>
    <article>
      <h1>Post title</h1>
      <section aria-labelledby="comments">...</section>
    </article>
    <aside>Related</aside>
  </main>
  <footer>...</footer>
</body>
```

Keep one `<main>` per page; a `<header>` or `<footer>` inside `<article>` belongs to that article.

### Inline semantics

```html
<p>
  Use <strong>bold</strong> for importance and <em>stress</em>.
  Press <kbd>Ctrl</kbd>+<kbd>C</kbd>.
  <abbr title="Application Programming Interface">API</abbr>
  shipped <time datetime="2026-11-24">today</time>.
  <mark>Highlight</mark> and <code>npm test</code>.
</p>
```

`<b>` and `<i>` only change appearance; `<strong>` and `<em>` also carry meaning.

### Details and dialog

#### Disclosure

```html
<details>
  <summary>Shipping details</summary>
  <p>Free over $50.</p>
</details>
```

#### Modal

```html
<dialog id="confirm">
  <p>Delete this item?</p>
  <form method="dialog"><button>OK</button></form>
</dialog>
```

#### Open it

```js
document.querySelector("#confirm").showModal()
```

`showModal()` traps focus and adds a backdrop; `show()` opens it without the modal behaviour.

## Media

### Images

```html
<img src="/photo-800.jpg"
  srcset="/photo-400.jpg 400w, /photo-800.jpg 800w"
  sizes="(min-width: 40em) 50vw, 100vw"
  width="800" height="533" alt="A cat asleep">
```

Always give `width` and `height` to reserve space, and add `loading="lazy"` below the fold.

### Picture

```html
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <img src="/hero.jpg" alt="Mountain at dawn">
</picture>
```

The `<img>` inside is required: it renders when no `<source>` matches.

### Video

```html
<video controls playsinline poster="/poster.jpg">
  <source src="/clip.mp4" type="video/mp4">
  <track kind="captions" src="/clip-en.vtt" srclang="en" default>
</video>
```

`playsinline` stops iOS from taking the video full screen; `crossorigin` is only needed to read frames in a canvas.

### Links

```html
<a href="/pricing">Pricing</a>
<a href="/report.pdf" download>Report</a>
<a href="mailto:hi@example.com">Email us</a>
<a href="#faq">Skip to FAQ</a>
<a href="https://example.com" target="_blank"
  rel="noreferrer">External</a>
```

`target="_blank"` already implies `noopener`; add `rel="noreferrer"` to hide the referrer too.

## Forms

### Inputs

```html
<form action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q" type="search" placeholder="Docs">
  <label>
    <input type="checkbox" name="beta" checked> Beta
  </label>
  <button type="submit">Go</button>
</form>
```

A wrapping `<label>` does not need `for`; the `id`/`for` pair covers the rest.

### Input types

```html
<input type="email" name="email">
<input type="number" name="qty" min="1" step="1">
<input type="date" name="due">
<input type="range" name="volume" min="0" max="100">
<input type="color" name="brand">
<input type="file" name="photo" accept="image/*" multiple>
```

#### Common types

| Type | Use |
| --- | --- |
| `text` | Free text, the default |
| `email` | Address, checked on submit |
| `password` | Masked entry |
| `search` | Text with a clear button |
| --- | --- |
| `number` | Numeric stepper |
| `range` | Slider between min and max |
| `date` | Year, month, and day picker |
| `color` | Color picker, `#rrggbb` |
| `file` | File picker, `accept` filters types |

### Validation

```html
<input type="password" minlength="12" autocomplete="new-password">
<input type="text" pattern="[A-Z]{3}-\d{4}" title="ABC-1234">
<input type="url" name="site" inputmode="url" required>
```

Validation runs on submit; `novalidate` on the form opts out, and `:invalid` styles a failing field.

### Select and datalist

#### Select

```html
<select name="plan">
  <option value="free">Free</option>
  <option value="pro" selected>Pro</option>
</select>
```

#### Datalist

```html
<input list="cities" name="city">
<datalist id="cities">
  <option value="Lisbon">
  <option value="Oslo">
</datalist>
```

A `<select>` limits the choice; a `<datalist>` only suggests values and still accepts free text.

## Tables

### Basic table

```html
<table>
  <caption>Q3 revenue</caption>
  <thead>
    <tr><th scope="col">Region</th><th scope="col">Total</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">EU</th><td>12k</td></tr>
  </tbody>
</table>
```

`<caption>` names the table; `scope` binds each header to its row or column.

### Spanning cells

```html
<tr>
  <td colspan="2">Merged across two columns</td>
</tr>
<tr>
  <td rowspan="2">Spans two rows</td>
  <td>Next to it</td>
</tr>
```

Keep spans small: layout tables and deep nesting confuse screen readers.

## Legacy

### Obsolete elements

| Element | Use instead |
| --- | --- |
| `<marquee>` | CSS animation |
| `<blink>` | CSS animation |
| `<center>` | `text-align` |
| `<font>` | CSS font properties |
| `<big>` | CSS `font-size` |
| --- | --- |
| `<frame>` | `<iframe>` |
| `<bgsound>` | `<audio>` |
| `<applet>` | `<object>` |
| `<keygen>` | `<input>` with WebCrypto |
| --- | --- |
| `<acronym>` | `<abbr>` |
| `<strike>` | `<s>` or `<del>` |
| `<tt>` | `<code>` |

Browsers still parse most of these so old pages render, but new markup should use the replacement.

### Conditional comments

```html
<!--[if lt IE 9]>
<script src="/html5shiv.js"></script>
<![endif]-->
```

Downlevel-hidden comments only ran in IE 9 and older; every other browser treats them as comments.
