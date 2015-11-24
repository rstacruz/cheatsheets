---
title: Email
category: HTML
---

### Avoid these

 * position (Yahoo, Gmail)
 * box-shadow (Yahoo, Gmail)
 * height (Outlook)
 * width in p/div (Outlook)
 * padding in p/div (Outlook)
 * data-URI (all webmail)

### Basic layout

    <table cellpadding=0 cellspacing=0"
      <tr>
        <td width=auto>
        <td width=600px background=white>
        <td width=auto>

### Responsive

    @media only screen and (max-device-width: 480px)
