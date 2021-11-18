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

### Rectangles

#### Stroke

```pascal
DrawRectangle(leftX, upX, width, height);
DrawRectangle(leftX, upX, width, height, color);
```

#### Fill

```pascal
FillRectangle(leftX, upX, width, height);
FillRectangle(leftX, upX, width, height, color);
```

#### Stroke and fill

```pascal
Rectangle(leftX, upX, width, height);
Rectangle(leftX, upX, width, height, color);
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

## References

* [PascalABC.NET help](http://pascalabc.net/downloads/pabcnethelp/index.htm)

{% endraw %}
