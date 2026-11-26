---
title: Bundler
subtitle: Ruby dependency manager
category: Ruby
last_verified_with: "Bundler 4.1."
updated: 2026-11-25
tier: t3
---

### Commands

```
bundle                  # same as bundle install
bundle install          # installs gems
bundle install -j3      # faster (3 jobs)
bundle update           # update all gems
bundle update rails          # update one gem

bundle outdated         # show outdated gems
cd `bundle show rails`  # inspect a gem's dir

bundle gem              # new gem skeleton
```

See: [bundle install](https://guides.rubygems.org/command-reference/bundle-install/)

### Gems

```
gem 'hello'
gem 'hello', group: 'development'
```

See: [The Gemfile](https://guides.rubygems.org/gemfile/)

### Github support

```
gem 'hello', github: 'rstacruz/hello'
gem 'hello', github: 'rstacruz/hello', 'branch: master'
```

See: [Using git sources](https://guides.rubygems.org/git/)

### Grouping

```
group :development do
  gem 'hello'
end
```

See: [Groups](https://guides.rubygems.org/groups/)

### Deployment

```
$ bundle config set --local without 'test,development'
$ bundle config set --local deployment true
$ bundle install
```

See: [bundle install](https://guides.rubygems.org/command-reference/bundle-install/)

### Local gem development

#### Gemfile

```ruby
gem 'hello', github: 'rstacruz/hello', branch: 'master'
```

#### Terminal

```
# point Bundler at the local checkout
$ bundle config --global local.xxx ~/projects/xxx
```

See: [bundle config](https://guides.rubygems.org/command-reference/bundle-config/)

### Rake Gem tasks

#### Rakefile

```
require 'bundler/gem_tasks'
```

#### Terminal

```
$ rake release
$ rake build
```

See: [Starting with bundle gem](https://guides.rubygems.org/make-your-own-gem/#starting-with-bundle-gem)
