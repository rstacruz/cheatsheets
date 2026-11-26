---
title: HTML meta tags
subtitle: Document metadata tags
category: HTML
updated: 2026-11-25
tier: t3
last_verified_with: "WHATWG HTML Living Standard, Open Graph protocol."
weight: -3
intro: |
  [Meta tags](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element) add document metadata. This sheet covers charset, description, Open Graph, Apple tags, and progressive web app tags.
links:
  - title: meta element
    url: https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
  - title: Open Graph protocol
    url: https://ogp.me/
  - title: Safari supported meta tags
    url: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
---

## Metadata

### Meta tags

#### Character encoding
```html
<meta charset='utf-8'>
```
<!-- {: data-highlight="charset"} -->

#### Title
```html
<!-- title -->
<title>···</title>
<meta property='og:title'  content='···'>
<meta name='twitter:title' content='···'>
```

<!-- {: data-highlight="title"} -->

#### URL
```html
<!-- url -->
<link rel='canonical'         href='http://···'>
<meta property='og:url'       content='http://···'>
<meta name='twitter:url'      content='http://···'>
```
<!-- {: data-highlight="canonical"} -->

#### Description
```html
<!-- description -->
<meta name='description'          content='···'>
<meta property='og:description'   content='···'>
<meta name='twitter:description'  content='···'>
```

<!-- {: data-highlight="description"} -->

#### Image
```html
<!-- image -->
<meta property="og:image"  content="http://···">
<meta name="twitter:image" content="http://···">
```
<!-- {: data-highlight="og:image; twitter:image"} -->

#### Compatibility
```html
<!-- ua -->
<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
```
<!-- {: data-highlight="X-UA-Compatible"} -->

#### Viewport
```html
<!-- viewport -->
<meta name='viewport' content='width=device-width'>
<meta name='viewport' content='width=1024'>
```
<!-- {: data-highlight="viewport"} -->

See: [meta element](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)

### More opengraph

#### Site
```html
<meta property='og:site_name' content='···'>
<meta property='og:type' content='website'>
```
<!-- {: data-highlight="og:site_name; og:type"} -->

#### Facebook
```html
<meta property='fb:app_id' content='···'>
<meta property='fb:admins' content='UID1,UID2'>
<!-- ···unless there's app_id -->
```
<!-- {: data-highlight="fb:app_id; fb:admins"} -->

#### Media
```html
<meta property='og:audio' content='http://···/theme.mp3'>
<meta property='og:video' content='http://···/trailer.swf'>
```
<!-- {: data-highlight="og:audio; og:video"} -->

See: [The Open Graph protocol](https://ogp.me/#metadata)

### Opengraph for articles

- `article:published_time`
- `article:modified_time`
- `article:expiration_time`
- `article:author`
- `article:section`
- `article:tag`

<!-- {: .-enum-wide} -->

See: [Open Graph article type](https://ogp.me/#type_article)

### Apple-only

```html
<meta name='format-detection' content='telephone=no'>
```
<!-- {: data-highlight="format-detection"} -->

See: [Apple: Supported Meta Tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

## Progressive web apps

### Add to homescreen

```html
<meta name='mobile-web-app-capable' content='yes'>
<meta name='apple-mobile-web-app-capable' content='yes'>
```
<!-- {: data-highlight="mobile-web-app-capable; apple-mobile-web-app-capable"} -->

#### Status bar
```html
<meta name='apple-mobile-web-app-status-bar-style' content='black'>
<!-- black | black-translucent | default -->
```
<!-- {: data-highlight="apple-mobile-web-app-status-bar-style"} -->

See: [Apple: Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

### Theme color

```html
<meta name='theme-color' content='#ff00ff'>
```
<!-- {: data-highlight="theme-color"} -->

Android-only.

See: [MDN: theme-color](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color)

### Manifest

```html
<link rel='manifest' href='/manifest.json'>
```
<!-- {: data-highlight="manifest"} -->

Android-only.

See: [MDN: rel="manifest"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/manifest)

### Icons

#### Minimal
```html
<!-- Minimal -->
<link rel='icon' type='image/png' href='favicon@32.png'>
<link rel='icon' sizes='192x192' href='icon@192.png'>
<link rel='apple-touch-icon' href='icon@152.png'>
<meta name='msapplication-square310x310logo' content='icon@310.png'>
```
<!-- {: data-highlight="rel='icon'"} -->

#### Apple
```html
<!-- Apple -->
<link rel='apple-touch-icon' href='touch-icon-iphone.png'>
<link rel='apple-touch-icon' sizes='76x76' href='touch-icon-ipad.png'>
<link rel='apple-touch-icon' sizes='120x120'
  href='touch-icon-iphone-retina.png'>
<link rel='apple-touch-icon' sizes='152x152'
  href='touch-icon-ipad-retina.png'>
```
<!-- {: data-highlight="apple-touch-icon"} -->

#### Microsoft
```html
<!-- Microsoft -->
<meta name='msapplication-square70x70logo'
  content='icon_smalltile.png'>
<meta name='msapplication-square150x150logo'
  content='icon_mediumtile.png'>
<meta name='msapplication-wide310x150logo'
  content='icon_widetile.png'>
```
<!-- {: data-highlight="msapplication-square70x70logo"} -->

Chrome on Android recommends a 192x192 icon.

See: [MDN: rel="icon"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel#icon)

## Reference

<!-- {: .-one-column} -->

* <https://ogp.me/#types>
* <https://ogp.me/#metadata>

<!-- {: .-also-see} -->
