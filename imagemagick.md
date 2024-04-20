---
title: Imagemagick
intro: |
  A quick reference for common [Imagemagick](https://www.imagemagick.org) commands and switches.
---

### Common options

| Option              | Description                     |
| ------------------- | ------------------------------- |
| `-resize 100x40`    | Resize to a dimension           |
| `-crop 40x30+10+10` | (width)x(height)+(x)+y          |
| `-crop 40x30-10-10` | (width)x(height)+(x)+y          |
| `-flip`             | Vertical                        |
| `-flop`             | Horizontal                      |
| `-transpose`        | Flip vertical + rotate 90deg    |
| `-transverse`       | Flip horizontal + rotate 270deg |
| `-trim`             | Trim image edges                |
| `-rotate 90`        | Rotate 90 degrees               |

### Resize to fit

```sh
convert input.jpg -resize 80x80^ -gravity center -extent 80x80 icon.png
```

### Convert all images to another format

```sh
mogrify -format jpg -quality 85 *.png
```

### Make a pdf

```sh
convert *.jpg hello.pdf
```

### References

- <http://www.noah.org/wiki/ImageMagick>
- <https://www.imagemagick.org/>
