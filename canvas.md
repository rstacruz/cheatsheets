---
title: Canvas
subtitle: HTML canvas drawing API
category: Browser APIs
last_verified_with: "WHATWG HTML Standard, Canvas 2D Context."
updated: 2026-11-25
tier: t3
---

### Getting the context

```js
var canvas = document.getElementById('c')
var c = canvas.getContext('2d')
```

See: [getContext()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)

### Basic drawing

```js
// x = 10, y = 20, width = 200, height = 100
c.fillStyle = '#ff0000'
c.strokeStyle = '#ff00ff'
```

#### Line style

```js
c.lineWidth = 5
c.lineCap = 'round'
```

#### Draw a rectangle

```js
c.fillRect(10, 20, 200, 100)
```

#### Stroke and fill

```js
c.stroke()
c.fill()
```

See: [fillRect()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)

### Saving and restoring

```js
c.save()
```

#### Restore

```js
c.restore()
```

Saves: `strokeStyle` `fillStyle` `globalAlpha` `lineWidth` `lineCap` `lineJoin` `miterLimit` `shadowOffsetX` `shadowOffsetY` `shadowBlur` `shadowColor`
`globalCompositeOperation`, Transformations (`translate` `rotate` `scale` `transform` `setTransform`), Clipping path

See: [save()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)


### Animation

```js
onframe: function() {
  c.clearRect(0, 0, w, h)
}
```

See: [Basic animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)

### Transformations

```js
c.translate(0, 0)
c.rotate(Math.PI*2/5)
c.scale(1.0, 1.0)
```

#### Rotate around a point

```js
c.translate(ox, oy)
c.rotate(theta)
c.translate(-ox, -oy)
```

#### Scale around a point

```js
c.translate(-ox*x, -oy*y)
c.scale(x, y)
c.translate(ox/x, oy/y)
```

See [MDN: Transformations][xform].

See: [transform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform)

### Image drawing

```js
c.drawImage(image, dx, dy, [dw, dh]);
/* `image` can be HTML Image/Canvas/Video */
```

See [MDN: Images][images].

See: [drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

### Colors, styles shadows

```js
c.strokeStyle = '#ff00ff';
c.fillStyle = '#ff00ff';
```

#### Shadows

```js
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.shadowOffsetBlur = 3.0;
c.shadowColor = 'rgba(0,0,0,0.2)';
```

See [MDN: Styles][styles]

See: [Applying styles and colors](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)

### Gradients

```js
gr = c.createLinearGradient(x0,y0,x1,y1)
gr = c.createRadialGradient(x0,y0,r0,x1,y1,r1)
pat = c.createPattern(image, 'repeat-x')
```

#### Apply the gradient

```js
c.fillStyle = gr
```

See: [createLinearGradient()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

### Drawing

```js
c.beginPath()
c.moveTo(x,y)
c.lineTo(x,y)
c.quadraticCurveTo(cpx,cpy,x,y)
c.bezierCurveTo(cp1x,cp1y,cp2x,cp2y)
c.arcTo(...)
c.arc(...)
c.closePath()
```

See: [beginPath()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)

### More resources

  * [Canvas Cheatsheet PDF][pdf]

[pdf]: http://www.nihilogic.dk/labs/canvas_sheet/HTML5_Canvas_Cheat_Sheet.pdf
[xform]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Transformations
[styles]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Applying_styles_and_colors
[images]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Using_images

See: [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
