---
title: HTML meta tags
category: HTML
updated: 2020-03-20
weight: -3
---

### Meta tags

```html
<meta charset='utf-8'>
```

```html
<!-- title -->
<title>···</title>
<meta property='og:title'  content='···'>
<meta name='twitter:title' content='···'>
```
{: data-line="2"}

```html
<!-- url -->
<link rel='canonical'       href='http://···'>
<meta property='og:url'  content='http://···'>
<meta name='twitter:url' content='http://···'>
```
{: data-line="2"}

```html
<!-- description -->
<meta name='description'         content='···'>
<meta property='og:description'  content='···'>
<meta name='twitter:description' content='···'>
```
{: data-line="2"}

```html
<!-- image -->
<meta property="og:image"  content="http://···">
<meta name="twitter:image" content="http://···">
```

```html
<!-- ua -->
<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
```

```html
<!-- viewport -->
<meta name='viewport' content='width=device-width'>
<meta name='viewport' content='width=1024'>
```

### More opengraph

```html
<meta property='og:site_name' content='···'>
<meta property='og:type' content='website'>
```

```html
<meta property='fb:app_id' content='···'>
<meta property='fb:admins' content='UID1,UID2'>
<!-- ···unless there's app_id -->
```

```html
<meta property='og:audio' content='http://···/theme.mp3'>
<meta property='og:video' content='http://···/trailer.swf'>
```

See: [OpenGraph protocol](https://developers.facebook.com/docs/opengraphprotocol/) _(developers.facebook.com)_

### Opengraph for articles

- `article:published_time`
- `article:modified_time`
- `article:expiration_time`
- `article:author`
- `article:section`
- `article:tag`

### Apple-only

```html
<meta name='format-detection' content='telephone=no'>
```

## Progressive web apps

### Add to homescreen

```html
<meta name='mobile-web-app-capable' content='yes'>
<meta name='apple-mobile-web-app-capable' content='yes'>
```

```html
<meta name='apple-mobile-web-app-status-bar-style' content='black'>
<!-- black | black-translucent | default -->
```

### Theme color

```html
<meta name='theme-color' content='#ff00ff'>
```

Android-only.
See: [Theme color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)

### Manifest

```html
<link rel='manifest' href='/manifest.json'>
```

Android-only.
See: [Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)

### Icons

```html
<!-- Minimal -->
<link rel='icon' type='image/png' href='favicon@32.png'>
<link rel='icon' sizes='192x192' href='icon@192.png'>
<link rel='apple-touch-icon' href='icon@152.png'>
<meta name='msapplication-square310x310logo' content='icon@310.png'>
```

```html
<!-- Apple -->
<link rel='apple-touch-icon' href='touch-icon-iphone.png'>
<link rel='apple-touch-icon' sizes='76x76' href='touch-icon-ipad.png'>
<link rel='apple-touch-icon' sizes='120x120' href='touch-icon-iphone-retina.png'>
<link rel='apple-touch-icon' sizes='152x152' href='touch-icon-ipad-retina.png'>
```

```html
<!-- Microsoft -->
<meta name='msapplication-square70x70logo' content='icon_smalltile.png'>
<meta name='msapplication-square150x150logo' content='icon_mediumtile.png'>
<meta name='msapplication-wide310x150logo' content='icon_widetile.png'>
```

Chrome on Android recommends [192x192](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android).
See: [Icons](https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/)

## Reference
{: .-one-column}

 * <https://dev.twitter.com/cards>
 * <https://developers.facebook.com/docs/opengraphprotocol/#types>
{: .-also-see}
