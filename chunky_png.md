---
title: Chunky PNG
subtitle: Ruby PNG manipulation library
logo: { set: icon-park-outline, name: picture }
category: Ruby libraries
last_verified_with: "ChunkyPNG 1.4."
updated: 2026-11-25
tier: t3
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

See: [Image.from_file](https://www.rubydoc.info/gems/chunky_png/1.4.0/ChunkyPNG/Canvas/PNGDecoding#from_file-instance_method)

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

See: [Image#save](https://www.rubydoc.info/gems/chunky_png/1.4.0/ChunkyPNG/Canvas/PNGEncoding#save-instance_method)

### Drawing

```ruby
image[0, 0] = ChunkyPNG::Color.rgba(255, 0,0, 128)
image.line(1, 1, 10, 1, ChunkyPNG::Color.from_hex('#aa007f'))
```

See: [Drawing methods](https://github.com/wvanbergen/chunky_png/blob/master/lib/chunky_png/canvas/drawing.rb)

### Canvas

```ruby
crop(x, y, w, h)
```

See: [Canvas#crop](https://github.com/wvanbergen/chunky_png/blob/master/lib/chunky_png/canvas/operations.rb)

### Transforms

```ruby
new_image = image.flip_horizontally.rotate_right
```

See: [Canvas transforms](https://github.com/wvanbergen/chunky_png/blob/master/lib/chunky_png/canvas/operations.rb)
