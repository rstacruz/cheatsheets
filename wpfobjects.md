---
title: WPFObjects
category: PascalABC.NET
---

## Primitives

### Creating

#### Lines

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
wpfObject.Destroy();
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


## References

* [PascalABC.NET help](http://pascalabc.net/downloads/pabcnethelp/index.htm)
