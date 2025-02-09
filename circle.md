---
title: CircleCI
category: Devops
---

### About
{: .-intro}

- <https://circleci.com/docs/config-sample>

### circle.yml

* __machine__: adjusting the VM to your preferences and requirements
* __checkout__: checking out and cloning your git repo
* __dependencies__: setting up your project's language-specific dependencies
* __database__: preparing the databases for your tests
* __test__: running your tests
* __deployment__: deploying your code to your web servers

See: <https://circleci.com/docs/configuration>

### Sample

```yml
## Customize the test machine
machine:

  timezone:
    America/Los_Angeles # Set the timezone

  # Version of ruby to use
  ruby:
    version:
      1.8.7-p358-falcon-perf

  # Override /etc/hosts
  hosts:
    circlehost: 127.0.0.1
    dev.mycompany.com: 127.0.0.1

  # Add some environment variables
  environment:
    CIRCLE_ENV: test
    DATABASE_URL: postgres://ubuntu:@127.0.0.1:5432/circle_test

## Customize checkout
checkout:
  post:
    - git submodule sync
    - git submodule update --init # use submodules

## Customize dependencies
dependencies:
  pre:
    - npm install coffeescript # install from a different package manager
    - gem uninstall bundler # use a custom version of bundler
    - gem install bundler --pre

  override:
    - bundle install: # note ':' here
        timeout: 180 # fail if command has no output for 3 minutes

  # we automatically cache and restore many dependencies between
  # builds. If you need to, you can add custom paths to cache:
  cache_directories:
    - "custom_1"   # relative to the build directory
    - "~/custom_2" # relative to the user's home directory

## Customize database setup
database:
  override:
    # replace CircleCI's generated database.yml
    - cp config/database.yml.ci config/database.yml
    - bundle exec rake db:create db:schema:load

## Customize test commands
test:
  override:
    - phpunit test/unit-tests # use PHPunit for testing
  post:
    - bundle exec rake jasmine:ci: # add an extra test type
        environment:
          RAILS_ENV: test
          RACK_ENV: test

## Customize deployment commands
deployment:
  staging:
    branch: master
    heroku:
      appname: foo-bar-123

## Custom notifications
notify:
  webhooks:
    # A list of hashes representing hooks. Only the url field is supported.
    - url: https://someurl.com/hooks/circle
```
