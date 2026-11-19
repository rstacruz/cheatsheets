---
title: Pry
subtitle: Runtime console for Ruby
category: Ruby libraries
intro: |
  Pry is a runtime development console for Ruby.
links:
  - title: https://github.com/pry/pry
    url: https://github.com/pry/pry
---

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

```
> edit Pry#repl
```

### Gems

```
> gem-cd foo      # Switch to gem's dir
> gem-install foo
> gem-list
```

### Misc commands

```
> hist          # History
> wtf?          # Trace of recent exception
```

## Rails

### Rails console

```
$ pry -r ./config/environment
```

Also consider [pry-rails](https://rubygems.org/gems/pry-rails).

### Rails

```
> show-models
> show-routes
> show-middleware
```

### ls

```
> ls         # All

> ls -m      # Methods
> ls -M      # Instance methods

> ls -g      # Globals
> ls -l      # Local vars
> ls -c      # Constants

> ls -i      # Instance vars

> ls -G xx   # Grep by regex
```

## Shell and plugins

### Shell integration

```
pry(main)> shell-mode
pry(main):/home/x $
```

```
pry(main)> .cat hello.txt
```

shell-mode adds dir to the prompt.

Commands with `.` are shell commands.

### hirb

```
> table User.all
> view User.all
> view User.all, fields: %w[id name email]
```

Add the [hirb](https://rubygems.org/gems/hirb) gem.

### pry-rescue

```rb
Pry::rescue {
  # raise exceptions here
}
```

```
bundle exec rescue rspec
```

```
pry(main)> cd-cause
pry(main)> try-again
```

Add the [pry-rescue](https://github.com/ConradIrwin/pry-rescue) gem.

Or run:

Additional commands:

### pry-remote

```rb
# In your code:
binding.remote_pry
```

```rb
# In the shell:
bundle exec pry-remote
```

Add the [pry-remote](https://github.com/Mon-Ouie/pry-remote) gem.

## Reference

 * [Pry](https://github.com/pry/pry)
 * [Hirb](https://github.com/cldwalker/hirb)
