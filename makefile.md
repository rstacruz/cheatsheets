---
title: Makefile
prism_languages: [makefile]
layout: 2017/sheet
category: CLI
---

## Var assignments and functions

```makefile
uglify = $(uglify)        # lazy assignment
compressor := $(uglify)   # immediate assignment
prefix ?= /usr/local      # safe lazy assignment: assign only if it hasn't been defined before.
```

`=` expressions are only evaluated when they're being used and are like functions without parameters.
```makefile
uglify = $1                     # function returning the first parameter $1
compressor := $(call uglify,a)  # function uglify returns a, which is assigned immediately to compressor
```

## Rules


```makefile
output file(s): input file(s) | order-only input file(s)/directory ; recipe
	recipe
```

`order-only` means that recipe will not be executed, if timestamp changes.
`recipe`is a script sent to the shell. If `.ONESHELL` is not specified, each line is sent separately.

Note that the recipe in the second line starts with TAB by default.

## Useful defaults

In what follows is explained and copied from [Your Makefiles are wrong](https://tech.davis-hansson.com/p/make/).
```Makefile
SHELL := bash                               # Use Bash instead of the default console
.ONESHELL:                                  # The whole recipe is executed by Bash
.SHELLFLAGS := -eu -o pipefail -c           # Shows problems in recipes
.DELETE_ON_ERROR:                           # If rule fails, the targets will be deleted.
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.RECIPEPREFIX = >                           # Use > instead of TABs for recipes. Only supported in modern GNU Make
```

## Magic variables

```makefile
out.o: src.c src.h
  $@   # "out.o" (target)
  $<   # "src.c" (first prerequisite)
  $^   # "src.c src.h" (all prerequisites)

%.o: %.c
  $*   # the 'stem' with which an implicit rule matches ("foo" in "foo.c")

also:
  $+   # prerequisites (all, with duplication)
  $?   # prerequisites (new ones)
  $|   # prerequisites (order-only?)

  $(@D) # target directory
```

## Command prefixes

| Prefix | Description |
| ------ | ----------- |
| `-` | Ignore errors |
| `@` | Don't print command |
| `+` | Run even if Make is in 'don't execute' mode |

```makefile
build:
    @echo "compiling"
    -gcc $< $@

-include .depend
```

## Find files

```makefile
js_files  := $(wildcard test/*.js)
all_files := $(shell find images -name "*")
```

## Substitutions

```makefile
file     = $(SOURCE:.cpp=.o)   # foo.cpp => foo.o
outputs  = $(files:src/%.coffee=lib/%.js)

outputs  = $(patsubst %.c, %.o, $(wildcard *.c))
assets   = $(patsubst images/%, assets/%, $(wildcard images/*))
```

## More functions

```makefile
$(strip $(string_var))

$(filter %.less, $(files))
$(filter-out %.less, $(files))
```

## Building files

```makefile
%.o: %.c
  ffmpeg -i $< > $@   # Input and output
  foo $^
```

## Includes

```makefile
-include foo.make
```

## Options

```sh
make
  -e, --environment-overrides
  -B, --always-make
  -s, --silent
  -d, --debug
  -p, -print-data-base   # print rules and variables that results from reading the makefile

  -j [N], --jobs[=N]         # parallel processing by N jobs
```

## Conditionals

```makefile
foo: $(objects)
ifeq ($(CC),gcc)
        $(CC) -o foo $(objects) $(libs_for_gcc)
else
        $(CC) -o foo $(objects) $(normal_libs)
endif
```

## Recursive

```makefile
deploy:
  $(MAKE) deploy2
```

## Further reading

 * [isaacs's Makefile](https://gist.github.com/isaacs/62a2d1825d04437c6f08)
 * [Your Makefiles are wrong](https://tech.davis-hansson.com/p/make/)
 * [Manual](https://www.gnu.org/software/make/manual/html_node/index.html)

