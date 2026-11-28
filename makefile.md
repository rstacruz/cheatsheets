---
title: Makefile
subtitle: Build automation file
logo: { set: icon-park-outline, name: tool }
prism_languages: [makefile]
category: Build tools
last_verified_with: "GNU Make 4.4.1."
created_at: 2012-03-16
updated: 2026-11-24
tier: t3
intro: |
  GNU make builds targets from dependency rules. This reference covers variables, pattern rules, functions, and running make.
links:
  - title: GNU Make manual
    url: https://www.gnu.org/software/make/manual/html_node/index.html
  - title: make(1) manual
    url: https://man7.org/linux/man-pages/man1/make.1.html
  - title: GNU Make source
    url: https://git.savannah.gnu.org/cgit/make.git
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

See: [Setting variables](https://www.gnu.org/software/make/manual/html_node/Setting.html)

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

See: [Automatic variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)

## Rules

### Pattern rules

```makefile
build/%.o: src/%.c
	@mkdir -p $(@D)
	$(CC) -c $< -o $@
```

`%` matches any non-empty stem, which is also available as `$*`.

See: [Pattern rules](https://www.gnu.org/software/make/manual/html_node/Pattern-Rules.html)

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

See: [Phony targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html)

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

See: [Recipe syntax](https://www.gnu.org/software/make/manual/html_node/Recipe-Syntax.html)

### Include files

```makefile
include config.mk   # must exist
-include deps.mk    # optional, no error when missing
```

Use `-include` (or `sinclude`) for generated `*.d` dependency files.

See: [Including other makefiles](https://www.gnu.org/software/make/manual/html_node/Include.html)

## Functions

### Text functions

```makefile
srcs  := $(wildcard src/*.c)
objs  := $(patsubst src/%.c,build/%.o,$(srcs))
dirs  := $(sort $(dir $(srcs)))          # src/
names := $(notdir $(basename $(srcs)))   # app
```

`$(srcs:src/%.c=build/%.o)` is the substitution-reference form of `patsubst`.

See: [Text functions](https://www.gnu.org/software/make/manual/html_node/Text-Functions.html)

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

See: [Shell function](https://www.gnu.org/software/make/manual/html_node/Shell-Function.html)

## Running make

### Invocation

```sh
make -j8 build/app   # one target, 8 jobs
make -C src          # run in another directory
make -f build.mk     # read another makefile
```

See: [make(1)](https://man7.org/linux/man-pages/man1/make.1.html)

### Recursion

```makefile
deploy:
	$(MAKE) -C deploy push
```

`$(MAKE)` marks the line as recursive, so `make -n`, `-t` and `-q` still run it; both forms inherit the current flags through `MAKEFLAGS`.

See: [make(1)](https://man7.org/linux/man-pages/man1/make.1.html)

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

See: [make(1) options](https://man7.org/linux/man-pages/man1/make.1.html#OPTIONS)

## Also see

- [isaacs's Makefile](https://gist.github.com/isaacs/62a2d1825d04437c6f08)
- [Your Makefiles are wrong](https://tech.davis-hansson.com/p/make/)
- [GNU Make manual](https://www.gnu.org/software/make/manual/html_node/index.html)
