---
title: Chunky PNG
category: Ruby libraries
---

### Loading

```ruby
image = ChunkyPNG::Image.from_file('file.png')
```

#### Alternate ways

```ruby
image = ChunkyPNG::Image.from_blob(File.read('file.png'))
image = ChunkyPNG::Image.from_io(io) 
```

Loads from `file.png`.

### Saving

```ruby
image.save('filename.png')
```

#### Alternate ways

```ruby
File.open('newfile.png', 'wb') { |io| image.write(io) }
binary_string = image.to_blob
```

Writes an image to `newfile.png`.

### Drawing

```ruby
image[0, 0] = ChunkyPNG::Color.rgba(255, 0,0, 128)
image.line(1, 1, 10, 1, ChunkyPNG::Color.from_hex('#aa007f'))
```

### Canvas

```ruby
crop(x, y, w, h)
```

### Transforms

```ruby
new_image = image.flip_horizontally.rotate_right
```
