---
title: Pry
subtitle: Runtime console for Ruby
category: Ruby libraries
intro: |
  Pry is a runtime development console for Ruby.
links:
  - title: https://github.com/pry/pry
    url: https://github.com/pry/pry
tier: t3
last_verified_with: "Pry 0.16.1, pry-gem 1.0.0, pry-rails 0.3.11, hirb 0.7.3, pry-rescue 1.6.0, pry-remote 0.1.8."
updated: 2026-11-26
---

### cd

```
> cd Array
> ls
  Array.methods: [] try_convert
  Array#methods: & * + abbrev assoc at ...
> show-source
```
<!-- {: data-highlight="cd Array; show-source"} -->

See: [Navigating around state](https://github.com/pry/pry#navigating-around-state), [Code browsing](https://github.com/pry/pry#code-browsing)

### Code

```nohighlight
> show-method Array#select
```
<!-- {: data-highlight="show-method"} -->

See: [Code browsing](https://github.com/pry/pry#code-browsing)

### Docs

```nohighlight
> ri Array
> ri Array#each

> cd Gem
> show-doc try_activate
```
<!-- {: data-highlight="ri; show-doc"} -->

See: [Documentation browsing](https://github.com/pry/pry#documentation-browsing)

### Finding

```nohighlight
> find-method each
  Array#each
  Array#each_index
  Enumerable#each_slice
  ...
```
<!-- {: data-highlight="find-method"} -->

See: [find-method command](https://github.com/pry/pry/blob/master/lib/pry/commands/find_method.rb)

### Editing

```
> edit Pry#repl
```
<!-- {: data-highlight="edit"} -->

See: [Edit methods](https://github.com/pry/pry#edit-methods)

### Gems

```
> gem-cd foo      # Switch to gem's dir
> gem-install foo
> gem-list
```
<!-- {: data-highlight="gem-cd; gem-install; gem-list"} -->

See: [pry-gem manual](https://github.com/pry/pry-gem#manual)

### Misc commands

```
> hist          # History
> wtf?          # Trace of recent exception
```
<!-- {: data-highlight="hist; wtf?"} -->

See: [Command history](https://github.com/pry/pry/blob/master/lib/pry/commands/hist.rb), [wtf?](https://github.com/pry/pry/blob/master/lib/pry/commands/wtf.rb)

## Rails

### Rails console

```sh
$ pry -r ./config/environment
```
<!-- {: data-highlight="pry -r ./config/environment"} -->

Also consider [pry-rails](https://rubygems.org/gems/pry-rails).

See: [Use Pry as your Rails console](https://github.com/pry/pry#use-pry-as-your-rails-console)

### Rails

```
> show-models
> show-routes
> show-middleware
```
<!-- {: data-highlight="show-models; show-routes"} -->

See: [pry-rails usage](https://github.com/pry/pry-rails#usage)

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
<!-- {: data-highlight="ls -m; ls -M; ls -g; ls -c"} -->

See: [ls command](https://github.com/pry/pry/blob/master/lib/pry/commands/ls.rb)

## Shell and plugins

### Shell integration

#### Shell mode

```text
pry(main)> shell-mode
pry(main):/home/x $
```
<!-- {: data-highlight="shell-mode"} -->

#### Dot-prefixed commands

```text
pry(main)> .cat hello.txt
```
<!-- {: data-highlight=".cat"} -->

Shell mode adds the directory to the prompt; commands with `.` run in the shell.

See: [Command shell integration](https://github.com/pry/pry#command-shell-integration)

### hirb

```rb
> table User.all
> view User.all
> view User.all, fields: %w[id name email]
```
<!-- {: data-highlight="table; view"} -->

Add the [hirb](https://rubygems.org/gems/hirb) gem.

See: [Views](https://github.com/cldwalker/hirb#views-anytime-anywhere)

### pry-rescue

#### Block form

```rb
Pry::rescue {
  # raise exceptions here
}
```
<!-- {: data-highlight="Pry::rescue"} -->

#### Rescue command

```sh
bundle exec rescue rspec
```
<!-- {: data-highlight="bundle exec rescue rspec"} -->

#### Inspect the exception

```text
pry(main)> cd-cause
pry(main)> try-again
```
<!-- {: data-highlight="cd-cause; try-again"} -->

Add the [pry-rescue](https://rubygems.org/gems/pry-rescue) gem.

See: [Usage](https://github.com/ConradIrwin/pry-rescue#usage), [cd-cause](https://github.com/ConradIrwin/pry-rescue#cd-cause), [try-again](https://github.com/ConradIrwin/pry-rescue#try-again)

### pry-remote

#### In your code

```rb
binding.remote_pry
```
<!-- {: data-highlight="binding.remote_pry"} -->

#### In the shell

```sh
bundle exec pry-remote
```
<!-- {: data-highlight="bundle exec pry-remote"} -->

Add the [pry-remote](https://rubygems.org/gems/pry-remote) gem.

See: [pry-remote](https://github.com/Mon-Ouie/pry-remote)

## Reference

 * [Pry](https://github.com/pry/pry)
 * [Hirb](https://github.com/cldwalker/hirb)
