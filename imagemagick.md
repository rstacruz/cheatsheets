---
title: Imagemagick
category: Media tools
subtitle: Image conversion and editing suite
updated: 2026-11-25
tier: t3
last_verified_with: "ImageMagick 7.1.2-36."
intro: |
  A quick reference for common [Imagemagick](https://www.imagemagick.org) commands and switches.
links:
  - title: Imagemagick
    url: https://www.imagemagick.org
---

## Commands

### Common options

| Option              | Description                     |
| ------------------- | ------------------------------- |
| `-resize 100x40`    | Resize to a dimension           |
| `-crop 40x30+10+10` | (width)x(height)+(x)+y          |
| `-crop 40x30-10-10` | (width)x(height)+(x)+y          |
| ---                 | ---                             |
| `-flip`             | Vertical                        |
| `-flop`             | Horizontal                      |
| `-transpose`        | Flip vertical + rotate 90deg    |
| `-transverse`       | Flip horizontal + rotate 270deg |
| ---                 | ---                             |
| `-trim`             | Trim image edges                |
| `-rotate 90`        | Rotate 90 degrees               |

See: [ImageMagick command-line options](https://imagemagick.org/command-line-options/)

### Resize to fit

```sh
convert input.jpg -resize 80x80^ -gravity center \
  -extent 80x80 icon.png
```
<!-- {: data-highlight="-resize 80x80^"} -->

See: [-resize](https://imagemagick.org/command-line-options/#resize)

### Convert all images to another format

```sh
mogrify -format jpg -quality 85 *.png
```
<!-- {: data-highlight="-format jpg"} -->

See: [mogrify](https://imagemagick.org/mogrify/)

### Make a pdf

```sh
convert *.jpg hello.pdf
```
<!-- {: data-highlight="hello.pdf"} -->

See: [PDF](https://imagemagick.org/formats/#supported)

## References

- <https://www.imagemagick.org/>

See: [ImageMagick command-line options](https://imagemagick.org/script/command-line-options.php)
