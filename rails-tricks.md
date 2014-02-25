---
title: Rails tricks
layout: default
---

in config/environments/development.rb:

    # Source maps for Sass
    config.sass.debug_info = true
    config.sass.line_comments = false

    # Don't break apart
    config.assets.debug = false
