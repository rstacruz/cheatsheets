---
title: Makefile
subtitle: Build automation file
prism_languages: [makefile]
category: Build tools
last_verified_with: "GNU Make 4.4.1."
updated: 2026-11-24
---

## Variables

### Assignment

```makefile
# recursive: expanded where it is used
FOO = $(NAME)-debug
# simple: expanded right here
NAME := app
# only when not already set
VERSION ?= 1.0
# append, with a space
NAME += -beta
# shell output
REV != git rev-parse --short HEAD
```

`=` keeps the right-hand side unexpanded, so `FOO` picks up later changes to `NAME`; `:=` freezes it. Quotes are literal, so `FOO = "bar"` stores `"bar"`.

### Automatic variables

```makefile
build/app.o: src/app.c src/app.h
	$(CC) -c $< -o $@
```

#### Shorthand

```makefile
$@   # target name
$<   # first prerequisite
$^   # all prerequisites, deduplicated
$+   # all prerequisites, with duplicates
$?   # prerequisites newer than the target
$|   # order-only prerequisites
$*   # stem of the matched pattern rule
```

`$(@D)` is the target's directory, so `mkdir -p $(@D)` creates it first.

## Rules

### Pattern rules

```makefile
build/%.o: src/%.c
	@mkdir -p $(@D)
	$(CC) -c $< -o $@
```

`%` matches any non-empty stem, which is also available as `$*`.

### Phony targets

```makefile
.PHONY: all test clean
all: build/app

test: all
	./build/app --test

clean:
	$(RM) -r build
```

`.PHONY` stops a name from matching a same-named file; `$(RM)` is `rm -f`.

### Command prefixes

```makefile
build:
	@echo "compiling"    # @ hides the command
	-$(CC) -c maybe.c    # - ignores its error
	+$(MAKE) -C vendor   # + runs under make -n
```

#### Prefixes

| Prefix | Effect                               |
| ------ | ------------------------------------ |
| `@`    | Don't echo the command               |
| `-`    | Ignore the command's error           |
| `+`    | Run even with `-n`, `-t`, or `-q`    |

### Include files

```makefile
include config.mk   # must exist
-include deps.mk    # optional, no error when missing
```

Use `-include` (or `sinclude`) for generated `*.d` dependency files.

## Functions

### Text functions

```makefile
srcs  := $(wildcard src/*.c)
objs  := $(patsubst src/%.c,build/%.o,$(srcs))
dirs  := $(sort $(dir $(srcs)))          # src/
names := $(notdir $(basename $(srcs)))   # app
```

`$(srcs:src/%.c=build/%.o)` is the substitution-reference form of `patsubst`.

### Shell and conditionals

```makefile
REV := $(shell git rev-parse --short HEAD)

ifeq ($(shell uname),Darwin)
  CFLAGS += -I/opt/homebrew/include
else
  CFLAGS += -I/usr/include
endif
```

`$(shell cmd)` runs at parse time and trims the trailing newline. Conditionals are decided before any rule runs.

## Running make

### Invocation

```sh
make -j8 build/app   # one target, 8 jobs
make -C src          # run in another directory
make -f build.mk     # read another makefile
```

### Recursion

```makefile
deploy:
	$(MAKE) -C deploy push
```

`$(MAKE)` re-runs make with the current flags; a bare `make` would not inherit them.

### Options

```sh
make -j8 -k target
```

#### Options

| Flag                   | Description                   |
| ---------------------- | ----------------------------- |
| `-j, --jobs=N`         | Run up to N jobs at once      |
| `-n, --dry-run`        | Print commands without running |
| `-B, --always-make`    | Rebuild every target          |
| `-C, --directory=DIR`  | Change directory first        |
| `-f, --file=FILE`      | Read another makefile         |
| `-k, --keep-going`     | Continue after errors         |
| `-s, --silent`         | Don't echo commands           |

## Also see

- [isaacs's Makefile](https://gist.github.com/isaacs/62a2d1825d04437c6f08)
- [Your Makefiles are wrong](https://tech.davis-hansson.com/p/make/)
- [GNU Make manual](https://www.gnu.org/software/make/manual/html_node/index.html)
