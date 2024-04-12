---
title: Bundler
category: Ruby
---

### Commands

    bundle                  # same as bundle install
    bundle install          # installs gems
    bundle install -j3      # faster (3 jobs)
    bundle update           # update all gems
    bundle update --source gemname  # update specified gem

    bundle outdated         # show outdated gems
    cd `bundle show rails`  # inspect a gem's dir

    bundle gem              # new gem skeleton

### Gems

    gem 'hello'
    gem 'hello', group: 'development'

### Github support

    gem 'hello', github: 'rstacruz/hello'
    gem 'hello', github: 'rstacruz/hello', 'branch: master'

### Grouping

    group :development do
      gem 'hello'
    end

### Deployment

    $ bundle install --without=test,development --deployment

### Local gem development

In your Gemfile, define a Git source and a branch:

    gem 'hello', github: 'rstacruz/hello', branch: 'master'

And then:

    $ bundle config --global local.xxx ~/projects/xxx

### Rake Gem tasks

    # Rakefile
    require 'bundler/gem_tasks'

Terminal:

    $ rake release
    $ rake build
