---
title: HTML emails
subtitle: Email-compatible HTML markup
category: HTML
updated: 2026-11-25
tier: t3
last_verified_with: "WHATWG HTML Living Standard."
---

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

See: [HTML table element](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)

### Responsive

```html
<style>
@media only screen and (max-device-width: 480px)
</style>
```

`<style>` is supported in the head and body by everything except Gmail. Only use them for responsive styles.

See: [Media Queries](https://www.w3.org/TR/mediaqueries-5/#media-query)

## References

<!-- {: .-one-column} -->

- [CSS support matrix](https://www.campaignmonitor.com/css/) _campaignmonitor.com_
