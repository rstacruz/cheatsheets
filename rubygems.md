---
title: Rubygems
subtitle: Ruby gem package manager
logo: { src: /assets/logos/ruby.svg }
category: Ruby
intro: |
  A quick reference to common rubygems CLI commands.
links:
  - title: rubygems
    url: https://rubygems.org
tier: t3
last_verified_with: "RubyGems 4.1.1."
updated: 2026-11-26
---

### Building and publishing

```sh
gem build *.gemspec         # Build a gem
gem install *.gem           # Install locally
gem push *.gem              # Upload to rubygems.org
gem yank foogem -v 0.0.1    # Take it back
```
<!-- {: data-highlight="gem build; gem install; gem push; gem yank"} -->

See: [Publishing gems](https://guides.rubygems.org/publishing/)

### Querying

#### Manage owners

```sh
gem owner foogem -a rico@ricostacruz.com
```
<!-- {: data-highlight="gem owner"} -->

#### List and search

```sh
gem list                    # List local gems
gem which rake              # Point to where lib/rake.rb is
gem search -r rails         # [remote] Search for gems
```
<!-- {: data-highlight="gem list; gem search"} -->

See: [gem owner](https://guides.rubygems.org/command-reference/#gem-owner), [gem list](https://guides.rubygems.org/command-reference/#gem-list), [gem search](https://guides.rubygems.org/command-reference/#gem-search)

### Opening a gem

```sh
# https://github.com/fnando/gem-open
gem open foogem
GEM_EDITOR="vim" gem open foogem
```
<!-- {: data-highlight="gem open; GEM_EDITOR"} -->

See: [gem-open](https://github.com/fnando/gem-open)

### Changing to a directory

```sh
cd $(basename `gem which rake`)  # Go to a gem's path
```
<!-- {: data-highlight="gem which"} -->

See: [gem which](https://guides.rubygems.org/command-reference/#gem-which)
