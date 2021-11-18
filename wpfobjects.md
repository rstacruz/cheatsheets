---
title: WPFObjects
category: PascalABC.NET
---

## Primitives

### Creating

#### Segments

```pascal
new LineWPF(fromX, fromY, toX, toY);
new LineWPF(fromX, fromY, toX, toY, color);
```

#### Rectangles

```pascal
new RectangleWPF(leftX, upY, width, height);
new RectangleWPF(leftX, upY, width, height, color);
```

#### Circles

```pascal
new CircleWPF(centerX, centerY, radius);
new CircleWPF(centerX, centerY, radius, color);
```

#### Ellipses

```pascal
new EllipseWPF(centerX, centerY, radiusX, radiusY);
new EllipseWPF(centerX, centerY, radiusX, radiusY, color);
```

#### Polygons

```pascal
new PolygonWPF(arrayOfPoints);
new PolygonWPF(arrayOfPoints, color);
```

#### Images

```pascal
new PictureWPF(leftX, upY, pathToImage);
new PictureWPF(leftX, upY, width, height, pathToImage);
```

### Removing

```pascal
myObject.Destroy();
```

## Events

```pascal
OnMouseDown := (mouseX, mouseY, mouseButton) -> begin
  ...
end;

OnMouseUp := (mouseX, mouseY, mouseButton) -> begin
  ...
end;

OnMouseMove := (mouseX, mouseY, mouseButton) -> begin
  ...
end;
```

`mouseButton` is equal to 1 when LMB is pressed and 2 when RMB is pressed respectively.

## References

* [PascalABC.NET help](http://pascalabc.net/downloads/pabcnethelp/index.htm)
