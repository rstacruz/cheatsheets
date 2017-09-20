---
title: Blessed
category: JavaScript libraries
layout: 2017/sheet
---

### Screen

```js
screen = blessed.screen({
  smartCSR: true       // optimize for flickering
  autoPadding: true    // ..
})

screen.append(Element)
screen.destroy()

screen.width
screen.height
screen.title = 'My window title'
screen.key(['escape', 'q', 'C-c'], (ch, key) => { ... })
```

### Element

```js
box = blessed.box({
  style: { fg, bg, border.fg, scrollbar.bg, focus.bg, hover.bg },
  border: { type: 'line'|'bg', bg, fg, bold, underline }
  tags: true,  // parse {bold}tags{/bold}

  top, left, width, height,
  width: '100%',
  height: '100%-1',
  top: 'center'
})
```

### Tags

```
{bold}
{right} {center}
{|}    left-right separator
{#c0ff33-fg}{/}
```

```
blessed.escape('...')
```
