---
title: Makefile
layout: default
---

### Var assignment

    JS_COMPRESSOR := $(uglify)

    # Safe assignment
    prefix ?= /usr/local

### Magic variables

    $^   -- dependencies
    $@   -- the thing to be built

    $@   -- Rule target
    $%   -- Target member name ('foo' in 'foo.c' for '%.c')
    $^   -- Prerequisites (all, without duplication)
    $+   -- Prerequisites (all, with duplication)
    $?   -- Prerequisites (new ones)
    $|   -- Prerequisites (order-only?)
    $<   -- Prerequisite (first)
    $*   -- Basename without extension of the target (?)

### Command prefixes

    -    Ignore errors
    @    Don't print command
    +    Run even if Make is in 'don't execute' mode

Examples:

    build:
        @echo "Building"
        -gcc $< $@
        @echo "Construction complete"

    -include .depend

### Cool stuff

    gitdir ?= $(shell git --exec-path)
    gitver ?= $(word 3,$(shell git --version))

### Find files

    FILES = $(shell find images -name "*")
    FILES = $(shell find test/*.js)

    $(patsubst images/%, assets/%, $(shell find images -name "*"))

### Substitutions

    # Same
    $(SOURCE:.cpp=.o)
    $(patsubst %.cpp, %.c, $(SOURCES))

    $(strip $(string_var))

    $(filter %.less, $(files))
    $(filter-out %.less, $(files))

### Executing

    JS_COMPRESSOR := $(uglify)

    docs:
      $(JS_COMPRESSOR) file.js

### Building files

    %.o: %.c
      ffmpeg -i $< > $@   # Input and output
      foo $^

### Inclusion

    include assets.make
