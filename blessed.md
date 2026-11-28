---
title: Blessed
created_at: 2015-12-10
subtitle: Terminal UI library
category: Hidden
# Unmaintained since 2016; API frozen at v0.1.81 (community fork neo-blessed).
tags: [Archived]
archived: |
  Blessed has been unmaintained since 2016, frozen at v0.1.81. Try
  [Ink](https://github.com/vadimdemedes/ink) or the `neo-blessed` fork.
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
