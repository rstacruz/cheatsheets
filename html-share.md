---
title: Share links
subtitle: Social share link markup
category: HTML
updated: 2026-11-24
last_verified_with: "X intent, Facebook sharer.php, LinkedIn share-offsite, wa.me, t.me."
---

## Share links

<!-- {: .-one-column} -->

### X

```html
<a
  href='https://x.com/intent/post?text=DESCRIPTION+URL'
  target='share'
>Post</a>
```

### Facebook

```html
<a
  href='https://www.facebook.com/sharer/sharer.php?u=URL'
  target='share'
>Share</a>
```

### LinkedIn

```html
<a
  href='https://www.linkedin.com/sharing/share-offsite/?url=URL'
  target='share'
>Share</a>
```

### Reddit

```html
<a
  href='https://www.reddit.com/submit?url=URL&amp;title=TITLE'
  target='share'
>Share</a>
```

### Encoding

```html
<a href='https://x.com/intent/post?text=Hi%20there'>Post</a>
```

Percent-encode the placeholders: spaces as `%20` or `+`, `&` as `%26`. Facebook and LinkedIn read Open Graph tags for the preview.

## Other channels

<!-- {: .-one-column} -->

### WhatsApp

```html
<a
  href='https://wa.me/?text=TEXT+URL'
  target='share'
>Share</a>
```

### Telegram

```html
<a
  href='https://t.me/share/url?url=URL&amp;text=TEXT'
  target='share'
>Share</a>
```

### Email

```html
<a href='mailto:?subject=SUBJECT&amp;body=BODY+URL'>Email</a>
```
