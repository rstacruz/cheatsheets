---
title: Travis.yml
category: Devops
layout: 2017/sheet
prism_languages: [yaml]
intro: |
  Quick reference for [Travis CI](https://travis-ci.org) yaml configuration. See [official documentation](https://docs.travis-ci.com/user/customizing-the-build/).
---

## Reference
{:.-three-column}

### Node.js

```yaml
language: node_js
node_js:
  - '4'
```

Defaults install to `npm install`, and defaults test to `npm test`.

### Ruby

```yaml
language: ruby
rvm:
  - 2.0.0
  - 1.9.3
  - 1.8.7
```

Defaults install to `bundle install`, defaults test to `rake`.

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

### Branches

```yaml
branches:
  except: ['..']
  only: ['master']
```

### Environment vars

```yaml
env:
  - 'rack=master'
  - 'rack=1.3.4'
```

### Custom test command

```yaml
script: make test
before_script: make pretest
after_script:  make clean

before_script:
  - make pretest1
  - make pretest2
```

### Branches

```yaml
branches:
  except:
    - legacy

  only:
    - gh-pages
    - /^deploy/
```

### Apt packages

```yaml
before_install:
  - sudo apt-get update -q
  - sudo apt-get install gcc-4.8 -y
```

<https://docs.travis-ci.com/user/installing-dependencies/>

### Etc

```yaml
gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x
```

### References

- http://about.travis-ci.org/docs/user/build-configuration/
- http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/
- http://about.travis-ci.org/docs/user/languages/ruby/
