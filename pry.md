---

title: Pry
layout: default
---

### cd

```
> cd Array
```

```no-highlight
> ls
  Array.methods: [] try_convert
  Array#methods: & * + abbrev assoc at ...
```

```
> show-source
```

### Code

```no-highlight
> show-method Array#select
```

### Docs

```no-highlight
> ri Array
> ri Array#each

> cd Gem
> show-doc try_activate
```

### Finding

```no-highlight
> find-method each
  Array#each
  Array#each_index
  Enumerable#each_slice
  ...
```

### Editing

    > edit Pry#repl

### Gems

    > gem-cd foo      # Switch to gem's dir
    > gem-install foo
    > gem-list

### Misc commands

    > hist          # History
    > wtf?          # Trace of recent exception

## Rails

### Rails console

Also consider [pry-rails](https://rubygems.org/gems/pry-rails).

    $ pry -r ./config/environment

### Rails

    > show-models
    > show-routes
    > show-middleware

### ls

    > ls         # All

    > ls -m      # Methods
    > ls -M      # Instance methods

    > ls -g      # Globals
    > ls -l      # Local vars
    > ls -c      # Constants

    > ls -i      # Instance vars

    > ls -G xx   # Grey by regex

## Shell integration

shell-mode adds dir to the prompt.

    pry(main)> shell-mode
    pry(main):/home/x $

Commands with `.` are shell commands.

    pry(main)> .cat hello.txt

## hirb
Add the [hirb](https://rubygems.org/gems/hirb) gem.

    > table User.all
    > view User.all
    > view User.all, fields: %w[id name email]

## Reference

 * [Pry](https://github.com/pry/pry)
 * [Hirb](https://github.com/cldwalker/hirb)
