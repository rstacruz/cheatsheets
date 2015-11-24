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
<meta name="og:site_name" content="...">
<meta name="og:type" content="website">

<meta name="fb:app_id" content="...">
<meta name="fb:admins" content="UID1,UID2"> <!-- unless there's app_id -->

<meta name="og:audio" content="http://.../theme.mp3">
<meta name="og:video" content="http://.../trailer.swf">
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

### Reference

 * https://dev.twitter.com/docs/cards
 * https://developers.facebook.com/docs/opengraphprotocol/#types
