---
title: Rubygems
category: Ruby
intro: |
  A quick reference to common [rubygems](https://rubygems.org) CLI commands.
---

### Building and publishing

```sh
gem build *.gemspec         # Build a gem
gem install *.gem           # Install locally
gem push *.gem              # Upload to rubygems.org
gem yank foogem -v 0.0.1    # Take it back
```

### Querying

```sh
gem owner foogem -a rico@ricostacruz.com

gem list                    # List local gems
gem which rake              # Point to where lib/rake.rb is
gem search -r rails         # [remote] Search for gems
```

### Opening a gem

```sh
# https://github.com/fnando/gem-open
gem open foogem
GEM_EDITOR="vim" gem open foogem
```

### Changing to a directory

```sh
cd $(basename `gem which rake`)  # Go to a gem's path
```
