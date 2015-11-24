---
title: PSD.rb
category: Ruby libraries
---

### Opening

    psd = PSD.new(file, parse_layer_images: true)
    psd.parse!

### Traversing

    # Gets the root node.
    # A #<Node> can be a Group or a Layer.
    node = psd.tree

    node.root
    node.descendants
    node.ancestors
    node.siblings
    node.subtree

    node.descendant_groups
    node.descendant_layers

### Layer info

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

### Layer text

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

### Layer effects

    fx = node.info[:object_effects]
    fx.data['Scl ']   # ?
    fx.data['GrFl']   # Gradient fill

### Layer mask

    node.mask["mask_size"] == 0    # No mask
    node.mask["mask_size"] == 20   # Has mask
    node.mask["top"]
    node.mask["left"]
    node.mask["bottom"]
    node.mask["right"]

### Reference

 * https://github.com/layervault/psd.rb
