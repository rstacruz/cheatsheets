---
title: Imagemagick
---

### Stuff

    -resize 100x40
    -crop 40x30+10+10   # (width)x(height)+(x)+y
    -crop 40x30-10-10   # (width)x(height)+(x)+y
    -flip               # vertical
    -flop               # horizontal
    -transpose          # flip vertical + rotate 90deg
    -transverse         # flip horizontal + rotate 270deg
    -trim               # trim image edges
    -rotate 90

### Resize to fit

    convert input.jpg -resize 80x80^ -gravity center -extent 80x80 icon.png

### Convert all images to another format

    mogrify -format jpg -quality 85 *.png

### Make a pdf

    convert *.jpg hello.pdf

### References

  * http://www.noah.org/wiki/ImageMagick
