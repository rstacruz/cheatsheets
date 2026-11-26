---
title: Travis.yml
subtitle: Travis CI YAML configuration
category: Devops
prism_languages: [yaml]
intro: |
  Quick reference for [Travis CI](https://travis-ci.com/) yaml configuration. See [official documentation](https://docs.travis-ci.com/user/customizing-the-build/).
links:
  - title: Travis CI documentation
    url: https://docs.travis-ci.com/
tier: t3
last_verified_with: "Travis CI build config schema."
updated: 2026-11-26
---

## Reference

<!-- {: .-three-column} -->

### Node.js

```yaml
language: node_js
node_js:
  - '4'
```

Defaults install to `npm install`, and defaults test to `npm test`.

See: [Node.js builds](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/#specify-nodejs-versions)

### Ruby

```yaml
language: ruby
rvm:
  - 2.0.0
  - 1.9.3
  - 1.8.7
```

Defaults install to `bundle install`, defaults test to `rake`.

See: [Ruby builds](https://docs.travis-ci.com/user/languages/ruby/#specify-ruby-versions-and-implementations)

### Build lifecycle

| Lifecycle                          |
| ---------------------------------- |
| `before_install`                   |
| `install`                          |
| ---                                |
| `before_script`                    |
| `script`                           |
| ---                                |
| `after_success` or `after_failure` |
| `after_script`                     |
| ---                                |
| `before_deploy` (optional)         |
| `deploy` (optional)                |
| `after_deploy` (optional)          |

See: [Job lifecycle](https://docs.travis-ci.com/user/job-lifecycle/#job-lifecycle-phases)

### Branches

```yaml
branches:
  except: ['..']
  only: ['master']
```

See: [Build specific branches](https://docs.travis-ci.com/user/customizing-the-build/#build-specific-branches)

### Environment vars

```yaml
env:
  - 'rack=master'
  - 'rack=1.3.4'
```

See: [Environment variables](https://docs.travis-ci.com/user/environment-variables/#define-public-variables)

### Custom test command

```yaml
script: make test
before_script: make pretest
after_script:  make clean

before_script:
  - make pretest1
  - make pretest2
```

See: [Customize the build phase](https://docs.travis-ci.com/user/job-lifecycle/#customize-the-build-phase)

### Branch patterns

```yaml
branches:
  except:
    - legacy

  only:
    - gh-pages
    - /^deploy/
```

See: [Regular expressions](https://docs.travis-ci.com/user/customizing-the-build/#regular-expressions)

### Apt packages

```yaml
before_install:
  - sudo apt-get update -q
  - sudo apt-get install gcc-4.8 -y
```

See: [Installing dependencies](https://docs.travis-ci.com/user/installing-dependencies/#install-packages-on-standard-infrastructure)

### Etc

```yaml
gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x
```

See: [Custom Gemfile locations](https://docs.travis-ci.com/user/languages/ruby/#custom-bundler-arguments-and-gemfile-locations)

### References

- <https://docs.travis-ci.com/user/customizing-the-build/>
- <https://docs.travis-ci.com/user/languages/javascript-with-nodejs/>
- <https://docs.travis-ci.com/user/languages/ruby/>

See: [Build config reference](https://config.travis-ci.com/)
