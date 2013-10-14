---
title: Imagemagick
layout: default
---

### Resize to fit

    convert input.jpg -resize 80x80^ -gravity center -extent 80x80 icon.png

### Convert all images to another format

    mogrify -format jpg -quality 85 *.png

### Make a pdf

    convert *.jpg hello.pdf

### References

  * http://www.noah.org/wiki/ImageMagick
