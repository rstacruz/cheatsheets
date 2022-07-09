---
title: Graph3D
category: PascalABC.NET
---

## Primitives

### Creating

#### Segments

```pascal
Segment3D(fromX, fromY, fromZ, toX, toY, toZ, thickness);
Segment3D(fromX, fromY, fromZ, toX, toY, toZ, thickness, color);
```

#### Polylines

```pascal
Polyline3D(arrayOfPoints, thickness);
Polyline3D(arrayOfPoints, thickness, color);
```

#### Parallelepipeds

```pascal
Box(centerX, centerY, centerZ, length, width, height);
Box(centerX, centerY, centerZ, length, width, height, color);
```

#### Spheres

```pascal
Sphere(centerX, centerY, centerZ, radius);
Sphere(centerX, centerY, centerZ, radius, color);
```

#### Ellipsoids

```pascal
Ellipsoid(centerX, centerY, centerZ, radiusX, radiusY, radiusZ);
Ellipsoid(centerX, centerY, centerZ, radiusX, radiusY, radiusZ, color);
```

#### Polygons

```pascal
Polygon3D(arrayOfPoints, thickness);
Polygon3D(arrayOfPoints, thickness, color);
```

### Cloning

```pascal
myObject.Clone();
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

`mouseButton` is equal to 1 when LMB is pressed and 2 when LMB is pressed respectively.

## References

* [PascalABC.NET help](http://pascalabc.net/downloads/pabcnethelp/index.htm)
