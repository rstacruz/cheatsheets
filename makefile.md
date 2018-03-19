---
title: Makefile
hljs_languages: [makefile]
layout: 2017/sheet
---

## Var assignment

```makefile
uglify = $(uglify)        # assignment
compressor := $(uglify)   # lazy assignment
prefix ?= /usr/local      # safe assignment
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

  -j, --jobs=N   # parallel processing
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
