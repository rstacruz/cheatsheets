---
title: Canvas
category: JavaScript
layout: 2017/sheet
---

### Getting the context

```js
var canvas = document.getElementById('c')
var c = canvas.getContext('2d')
```

### Basic drawing

```js
// x = 10, y = 20, width = 200, height = 100
c.fillStyle = '#ff0000'
c.strokeStyle = '#ff00ff'
```

```js
c.lineWidth = 5
c.lineCap = 'round'
```

```js
c.fillRect(10, 20, 200, 100)
```

```js
c.stroke()
c.fill()
```

### Saving and restoring

```js
c.save()
```

```js
c.restore()
```

Saves: `strokeStyle` `fillStyle` `globalAlpha` `lineWidth` `lineCap` `lineJoin` `miterLimit` `shadowOffsetX` `shadowOffsetY` `shadowBlur` `shadowColor`
`globalCompositeOperation`, Transformations (`translate` `rotate` `scale` `transform` `setTransform`), Clipping path


### Animation

```js
onframe: function() {
  c.clearRect(0, 0, w, h)
}
```

### Transformations

```js
c.translate(0, 0)
c.rotate(Math.PI*2/5)
c.scale(1.0, 1.0)
```

To rotate along origin:

```js
c.translate(ox, oy)
c.rotate(theta)
c.translate(-ox, -oy)
```

To scale along origin:

```js
c.translate(-ox*x, -oy*y)
c.scale(x, y)
c.translate(ox/x, oy/y)
```

See [MDN: Transformations][xform].

### Image drawing

```js
c.drawImage(image, dx, dy, [dw, dh]);
/* `image` can be HTML Image/Canvas/Video */
```

See [MDN: Images][images].

### Colors, styles shadows

```js
c.strokeStyle = '#ff00ff';
c.fillStyle = '#ff00ff';
```

```js
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.shadowOffsetBlur = 3.0;
c.shadowColor = 'rgba(0,0,0,0.2)';
```

See [MDN: Styles][styles]

### Gradients

```js
gr = c.createLinearGradient(x0,y0,x1,y1)
gr = c.createRadialGradient(x0,y0,r0,x1,y1,r1)
pat = c.createPattern(image, 'repeat-x')
```

```js
c.fillStyle = gr
```

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

### More resources

  * [Canvas Cheatsheet PDF][pdf]

[pdf]: http://www.nihilogic.dk/labs/canvas_sheet/HTML5_Canvas_Cheat_Sheet.pdf
[xform]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Transformations
[styles]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Applying_styles_and_colors
[images]: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Using_images
