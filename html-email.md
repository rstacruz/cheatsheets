---
title: HTML emails
subtitle: Email-compatible HTML markup
category: Hidden
# Static email-client CSS support tables go stale; caniemail.com is current.
tags: [Archived]
archived: |
  Email-client CSS support changes with each client release, so this static support table cannot stay current. Use [Can I email](https://www.caniemail.com/) instead.
created_at: 2017-08-29
updated: 2026-11-25
last_verified_with: "WHATWG HTML Living Standard."
intro: |
  [HTML email](https://www.caniemail.com/) markup for Outlook and webmail clients, with table-based layout and CSS support notes.
links:
  - title: Can I email
    url: https://www.caniemail.com/
  - title: HTML tables
    url: https://html.spec.whatwg.org/multipage/tables.html#the-table-element
---

## CSS support

### Properties to avoid

| Property             | Where                   |
| ---                  | ---                     |
| `position`           | (Outlook, Gmail, Yahoo) |
| `display`            | (Outlook, Gmail)        |
| `float`              | (Outlook)               |
| ---                  | ---                     |
| `height`             | (Outlook)               |
| `width` _in p/div_   | (Outlook)               |
| `padding` _in p/div_ | (Outlook)               |
| `background`         | (Outlook, Gmail)        |
| `min-width`          | (Outlook)               |
| `max-width`          | (Outlook)               |
| ---                  | ---                     |
| `opacity`            | (Outlook, Gmail, Yahoo) |
| `box-shadow`         | (Outlook, Gmail, Yahoo) |
| ---                  | ---                     |
| `rgba()`             | (Outlook)               |
| `data-uri`           | (all webmail)           |

<!-- see: none: email-client CSS support has no upstream spec -->

### Selectors to avoid

| Selector | Where |
| --- | --- |
| `E[attr]`                  | (Outlook, Gmail)        |
| `E:nth-child(n)`           | (Outlook, Gmail)        |
| `::before` _and_ `::after` | (Outlook, Yahoo, Gmail) |
| `E F`                      | (Gmail)                 |
| `E + F`, `E > F` _etc_     | (Outlook, Gmail)        |

Inline your CSS as much as possible.

<!-- see: none: email-client selector support has no upstream spec -->

## Layout

### Basic layout

```html
<table cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td width="auto"></td>
    <td width="600" background="#ffffff">
      ···
    </td>
    <td width="auto"></td>
  </tr>
</table>
```
<!-- {: data-highlight="presentation"} -->

See: [HTML table element](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)

### Responsive

```html
<style>
@media only screen and (max-device-width: 480px) {
  ···
}
</style>
```
<!-- {: data-highlight="@media"} -->

`<style>` is supported in the head and body by everything except Gmail. Only use it for responsive styles.

See: [Media Queries](https://www.w3.org/TR/mediaqueries-5/#media-query)

## References

<!-- {: .-one-column} -->

- [CSS support matrix](https://www.campaignmonitor.com/css/) _campaignmonitor.com_
