---
title: Chunky PNG
category: Ruby libraries
---

### Loading

    image = ChunkyPNG::Image.from_file('filename.png')
    image = ChunkyPNG::Image.from_blob(File.read('file.png'))
    image = ChunkyPNG::Image.from_io(io) 

### Saving

    image.save('filename.png')
    File.open('newfile.png', 'wb') { |io| image.write(io) }
    binary_string = image.to_blob

### Drawing

    image[0, 0] = ChunkyPNG::Color.rgba(255, 0,0, 128)
    image.line(1, 1, 10, 1, ChunkyPNG::Color.from_hex('#aa007f'))

### Canvas

    crop(x, y, w, h)

### Transforms

    new_image = image.flip_horizontally.rotate_right
