---
title: Meta tags
category: HTML
---

```html
<meta charset='utf-8'>

<!-- title -->
<title>...</title>
<meta property='og:title'  content='...'>
<meta name='twitter:title' content='...'>

<!-- url -->
<meta property='og:url'  content='http://...'>
<meta name='twitter:url' content='http://...'>
<link rel='canonical'       href='http://...'>

<!-- desc -->
<meta name='description'         content='...'>
<meta property='og:description'  content='...'>
<meta name='twitter:description' content='...'>

<!-- image -->
<meta property="og:image"  content="http://...">
<meta name="twitter:image" content="http://...">

<!-- ua -->
<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>

<!-- viewport -->
<meta name='viewport' content='width=device-width'>
<meta name='viewport' content='width=1024'>
```

### More opengraph

```html
<meta property="og:site_name" content="...">
<meta property="og:type" content="website">

<meta property="fb:app_id" content="...">
<meta property="fb:admins" content="UID1,UID2"> <!-- unless there's app_id -->

<meta property="og:audio" content="http://.../theme.mp3">
<meta property="og:video" content="http://.../trailer.swf">
```

### Opengraph for articles

```html
article:published_time
article:modified_time
article:expiration_time
article:author
article:section
article:tag
```

### Favicon

```html
<link rel="icon" type="image/png" href="/assets/favicon.png">
```

### Web app

```html
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black"> <!-- black | black-translucent | default -->
```

### Apple-only

```html
<meta name="format-detection" content="telephone=no">
```

### Reference

 * https://dev.twitter.com/docs/cards
 * https://developers.facebook.com/docs/opengraphprotocol/#types
