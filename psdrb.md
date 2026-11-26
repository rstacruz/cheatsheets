---
title: PSD.rb
subtitle: Photoshop file parser
category: Ruby libraries
intro: |
  PSD.rb parses Photoshop documents in Ruby.
links:
  - title: PSD.rb
    url: https://github.com/layervault/psd.rb
tier: t3
last_verified_with: "PSD.rb 3.9.0."
updated: 2026-11-26
---

### Opening

```ruby
psd = PSD.new(file, parse_layer_images: true)
psd.parse!
```
<!-- {: data-highlight="psd.parse!"} -->

See: [Loading a PSD](https://github.com/layervault/psd.rb#loading-a-psd)

### Traversing

```ruby
# Gets the root node.
# A #<Node> can be a Group or a Layer.
node = psd.tree

node.root
node.descendants
node.ancestors
node.siblings
node.subtree

  # Filtered by node type
node.descendant_groups
node.descendant_layers
```
<!-- {: data-highlight="descendant_groups; descendant_layers"} -->

See: [Traversing the document](https://github.com/layervault/psd.rb#traversing-the-document)

### Layer info

```ruby
node.name   #=> "Layer 2"

node.top    #=> 3
node.left   #=> 3
node.bottom
node.right

# Note: these are interchanged (?)
node.width
node.height

node.visible?
node.hidden?

node.layer?
node.group?

node.blending_mode  #=> "normal"
node.opacity        #=> 0..255
node.fill_opacity   #=> 0..255
```
<!-- {: data-highlight="visible?; hidden?; layer?; group?"} -->

See: [Accessing layer data](https://github.com/layervault/psd.rb#accessing-layer-data)

### Layer text

```ruby
node.text                  #=> (Hash)
node.text[:value]          #=> "Text here"
node.text[:font][:name]    #=> "Arial"
node.text[:font][:sizes]   #=> [6.9]
node.text[:font][:colors]  #=> [[255,255,255,255]]
node.text[:font][:css]     #=> "font-family: ...;"
node.text[:left]           #=> 3
node.text[:top]
node.text[:right]
node.text[:bottom]
node.text[:transform]      #=> (Hash)
```
<!-- {: data-highlight="node.text[:value]; node.text[:font][:name]"} -->

See: [Text data example](https://github.com/layervault/psd.rb/blob/master/examples/export_text_data.rb)

### Layer effects

```ruby
fx = node.info[:object_effects]

fx.data['Scl ']   # ?
fx.data['GrFl']   # Gradient fill
```
<!-- {: data-highlight="node.info[:object_effects]"} -->

See: [Layer effects info](https://github.com/layervault/psd.rb/blob/master/lib/psd/layer/info/layer_effects.rb)

### Layer mask

```ruby
node.mask["mask_size"] == 0    # No mask
node.mask["mask_size"] == 20   # Has mask
node.mask["top"]
node.mask["left"]
node.mask["bottom"]
node.mask["right"]
```
<!-- {: data-highlight='node.mask["mask_size"]'} -->

See: [Layer mask](https://github.com/layervault/psd.rb/blob/master/lib/psd/layer/mask.rb)

### Reference

 * [layervault/psd.rb](https://github.com/layervault/psd.rb) _(github.com)_
