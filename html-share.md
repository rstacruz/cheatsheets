---
title: Share links
subtitle: Social share link markup
logo: { set: icon-park-outline, name: share }
category: HTML
updated: 2026-11-24
last_verified_with: "X intent, Facebook sharer.php, LinkedIn share-offsite, wa.me, t.me."
tier: t3
intro: |
  Share-link URLs for social networks, messaging apps, and email.
links:
  - title: X web intents
    url: https://developer.x.com/en/docs/x-for-websites/web-intents/overview
  - title: Facebook share dialog
    url: https://developers.facebook.com/docs/sharing/reference/share-dialog
  - title: WhatsApp click to chat
    url: https://faq.whatsapp.com/5913398998672934
---

## Share links

<!-- {: .-three-column} -->

### X

```html
<a
  href='https://x.com/intent/post?text=DESCRIPTION+URL'
  target='share'
>Post</a>
```
<!-- {: .-wrap} -->

See: [X web intents](https://developer.x.com/en/docs/x-for-websites/web-intents/overview)

### Facebook

```html
<a
  href='https://www.facebook.com/sharer/sharer.php?u=URL'
  target='share'
>Share</a>
```
<!-- {: .-wrap} -->

See: [Facebook share dialog](https://developers.facebook.com/docs/sharing/reference/share-dialog)

### LinkedIn

```html
<a
  href='https://www.linkedin.com/sharing/share-offsite/?url=URL'
  target='share'
>Share</a>
```
<!-- {: .-wrap} -->

See: [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)

### Reddit

```html
<a
  href='https://www.reddit.com/submit?url=URL&amp;title=TITLE'
  target='share'
>Share</a>
```
<!-- {: .-wrap} -->

See: [Reddit API](https://www.reddit.com/dev/api/)

### Encoding

```html
<a href='https://x.com/intent/post?text=Hi%20there'>Post</a>
```
<!-- {: .-wrap} -->

Percent-encode the placeholders: spaces as `%20` or `+`, `&` as `%26`. Facebook and LinkedIn read Open Graph tags for the preview.

See: [Percent-encoding](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding)

## Other channels

<!-- {: .-three-column} -->

### WhatsApp

```html
<a
  href='https://wa.me/?text=TEXT+URL'
  target='share'
>Share</a>
```

See: [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934)

### Telegram

```html
<a
  href='https://t.me/share/url?url=URL&amp;text=TEXT'
  target='share'
>Share</a>
```
<!-- {: .-wrap} -->

See: [Telegram share widget](https://core.telegram.org/widgets/share)

### Email

```html
<a href='mailto:?subject=SUBJECT&amp;body=BODY+URL'>Email</a>
```
<!-- {: .-wrap} -->

See: [RFC 6068: mailto URI](https://www.rfc-editor.org/rfc/rfc6068)
