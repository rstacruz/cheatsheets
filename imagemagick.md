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

### CLI Tools 

```sh
# animate an image sequence on any X server.
magick animate

# mathematically and visually annotate the difference 
# between an image and its reconstruction.
magick compare

# overlap one image over another.
magick composite

# interpret and execute scripts written in the 
# Magick Scripting Language (MSL).
magick conjure

# convert between image formats as well as resize 
# an image, blur, crop, despeckle, dither, draw on, 
# flip, join, re-sample, and much more.
magick convert

# display an image or image sequence on any X server.
magick display

# describe the format and characteristics of 
# one or more image files.
magick identify

# save any visible window on an X server and outputs 
# it as an image file. You can capture a single window, 
# the entire screen, or any rectangular portion of the screen.
magick import

# resize an image, blur, crop, despeckle, dither, draw on, 
# flip, join, re-sample, and much more. Mogrify overwrites 
# the original image file, whereas, magick writes to a
# different image file.
magick mogrify

# create a composite image by combining several separate images. 
# The images are tiled on the composite image optionally adorned
# with a border, frame, image name, and more.
magick montage

# a lightweight tool to stream one or more pixel components of 
# the image or portion of the image to your choice of storage formats.
# It writes the pixel components as they are read from the input image
# a row at a time making stream desirable when working with large images
# or when you require raw pixel components.
magick stream

```
























### References

- <http://www.noah.org/wiki/ImageMagick>
- <https://www.imagemagick.org/>
