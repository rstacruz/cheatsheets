---
title: Pry
category: Ruby libraries
---

### About
{: .-intro}

Pry is a runtime development console for Ruby.

- <https://github.com/pry/pry>

### cd

```
> cd Array
```

```nohighlight
> ls
  Array.methods: [] try_convert
  Array#methods: & * + abbrev assoc at ...
```

```
> show-source
```

### Code

```nohighlight
> show-method Array#select
```

### Docs

```nohighlight
> ri Array
> ri Array#each

> cd Gem
> show-doc try_activate
```

### Finding

```nohighlight
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

    > ls -G xx   # Grep by regex

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

## pry-rescue
Add the [pry-rescue](https://github.com/ConradIrwin/pry-rescue) gem.

```rb
Pry::rescue {
  # raise exceptions here
}
```

Or run:

```
bundle exec rescue rspec
```

Additional commands:

```
pry(main)> cd-cause
pry(main)> try-again
```

## pry-remote
Add the [pry-remote](https://github.com/Mon-Ouie/pry-remote) gem.

```rb
# In your code:
binding.remote_pry

# In the shell:
bundle exec pry-remote
```

## Reference

 * [Pry](https://github.com/pry/pry)
 * [Hirb](https://github.com/cldwalker/hirb)
