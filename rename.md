---
title: rename
category: CLI
---

### Installation

    # http://plasmasturm.org/code/rename/
      brew install rename

### Examples

    # Rename hello.txt to world.txt and so on
      rename 's/hello/world/' *.txt

    # Search and replace
      rename -s .png .jpg.png *.png
      

### Options

    -n    # Simulation
    -l    # Symlink instead of rename
    -i    # Interactive
