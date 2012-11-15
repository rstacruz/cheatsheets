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

### Cool stuff

		gitdir ?= $(shell git --exec-path)
		gitver ?= $(word 3,$(shell git --version))

### Find files

    FILES = $(shell find images -name "*")

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

### Default task

		default:
			@echo "hello."
      @false

### Inclusion

    include assets.make
