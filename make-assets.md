---
title: Make for assets
tags: [Archived]
archived: This sheet may be listing practices that are outdated.
---

### Basic compiling

```makefile
bin := ./node_modules/.bin

all: build/foo.js

build/%.js: src/%.coffee
    @$(bin)/coffee < $^ > $@
```

### Stylus + Autoprefixer

    bin := ./node_modules/.bin
    stylus := $(bin)/stylus
    autoprefixer := $(bin)/autoprefixer
    styl_files := $(shell find web/ -name "*.styl")

    all: public/app.css

    public/app.css: css/app.styl

    %.css: %.styl $(styl_files)
        @$(stylus) $< | $(autoprefixer) -b "> 1%" > $@

### Hint

    hint:
       $(js_files)

### Watching

    watch:
        @echo "... watching for changes"
        @while true; do make -s; sleep 1; done

### Browserify

    js_files := $(shell find web/ -name "*.js")

    public/app.js: web/app.js
    public/vendor.js: web/vendor.js

    public/%.js: web/%.js $(js_files)
        $(browserify) -t [ cssify -x .css ] $< > $@
