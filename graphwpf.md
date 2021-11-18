---
title: GraphWPF
category: PascalABC.NET
---

## Primitives

### Lines

```pascal
Line(fromX, fromY, toX, toY);
Line(fromX, fromY, toX, toY, color);
```

### Polylines

```pascal
PolyLine(arrayOfPoints);
PolyLine(arrayOfPoints, color);
```

### Rectangles

#### Stroke

```pascal
DrawRectangle(leftX, upY, width, height);
DrawRectangle(leftX, upY, width, height, color);
```

#### Fill

```pascal
FillRectangle(leftX, upY, width, height);
FillRectangle(leftX, upY, width, height, color);
```

#### Stroke and fill

```pascal
Rectangle(leftX, upY, width, height);
Rectangle(leftX, upY, width, height, color);
```

### Circles

#### Stroke

```pascal
DrawCircle(centerX, centerY, radius);
DrawCircle(centerX, centerY, radius, color);
```

#### Fill

```pascal
FillCircle(centerX, centerY, radius);
FillCircle(centerX, centerY, radius, color);
```

#### Stroke and fill

```pascal
Circle(centerX, centerY, radius);
Circle(centerX, centerY, radius, color);
```

### Ellipses

#### Stroke

```pascal
DrawEllipse(centerX, centerY, radiusX, radiusY);
DrawEllipse(centerX, centerY, radiusX, radiusY, color);
```

#### Fill

```pascal
FillEllipse(centerX, centerY, radiusX, radiusY);
FillEllipse(centerX, centerY, radiusX, radiusY, color);
```

#### Stroke and fill

```pascal
Ellipse(centerX, centerY, radiusX, radiusY);
Ellipse(centerX, centerY, radiusX, radiusY, color);
```

### Polygons

#### Stroke

```pascal
DrawPolygon(arrayOfPoints);
DrawPolygon(arrayOfPoints, color);
```

#### Fill

```pascal
FillPolygon(arrayOfPoints);
FillPolygon(arrayOfPoints, color);
```

#### Stroke and fill

```pascal
Polygon(arrayOfPoints);
Polygon(arrayOfPoints, color);
```

### Text

```pascal
DrawText(leftX, upY, width, height, text);
DrawText(leftX, upY, width, height, text, color);
```

### Images

```pascal
DrawImage(leftX, upY, pathToImage);
DrawImage(leftX, upY, width, height, pathToImage);
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
