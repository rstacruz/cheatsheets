---
title: Travis.yml
category: Devops
---

### Node

```yml
language: node_js
node_js:
- '4'
```

* Provides: 0.10, 0.8, 0.6, 0.11 (latest dev)
* Defaults install to `npm install`
* Defaults test to `npm test`

### Ruby

```yml
language: ruby
rvm:
- 2.0.0
- 1.9.3
- 1.8.7
- rbx-19mode
- jruby-19mode
- jruby-18mode
```

* Defaults install to `bundle install`
* Defaults test to `rake`

### Bash

Setting `language` to **`bash`**, `sh` or `shell` is equivalent to **`minimal`**.

```yaml
language: bash
before_script:
  - bash --version
```

 * No default install
 * No default script

### Build lifecycle

* `before_install`
* `install`
* `before_script`
* `script`
* `after_success` or `after_failure`
* `after_script`
* OPTIONAL `before_deploy`
* OPTIONAL `deploy`
* OPTIONAL `after_deploy`

### Branches

    branches:
      except: [".."]
      only: ["master"]

### Environment vars

    env:
      - "rack=master"
      - "rack=1.3.4"

### Custom test command

    script: make test
    before_script: make pretest
    after_script:  make clean

    before_script:
      - make pretest1
      - make pretest2

### Branches

    branches:
      except:
        - legacy

      only:
        - gh-pages
        - /^deploy/

### [apt] and [homebrew] packages

[apt]: <https://docs.travis-ci.com/user/installing-dependencies#installing-packages-with-the-apt-addon/>
[homebrew]: <https://docs.travis-ci.com/user/installing-dependencies/#installing-packages-on-macos>

Via addons or scripted.

#### addons

```yaml
addons:
  apt:
    update: true
    sources:
    - ubuntu-toolchain-r-test
    packages:
    - gcc-4.8
    - openssl
  homebrew:
    update: true
    packages:
    - openssl
    - coreutils
```

#### scripted

    before_install:
    - if [ "$TRAVIS_OS_NAME" = "linux" ]; then sudo apt-get -qq -y update         ; fi
    - if [ "$TRAVIS_OS_NAME" = "linux" ]; then sudo apt-get -qq -y install gcc-4.8; fi

### Etc

    gemfile:
     - gemfiles/Gemfile.rails-2.3.x
     - gemfiles/Gemfile.rails-3.0.x

### Notifications

    notifications:
      email:
       - dropbox+travis@ricostacruz.com

      email:
        recipients:
         - dropbox+travis@ricostacruz.com
        on_success: <always|never|change>  # default: change
        on_failure: <always|never|change>  # default: always

      irc: "chat.freenode.net#travis"

### References

 * <https://docs.travis-ci.com/user/customizing-the-build/>
 * <https://docs.travis-ci.com/user/languages/javascript-with-nodejs/>
 * <https://docs.travis-ci.com/user/languages/ruby/>
 * <https://docs.travis-ci.com/user/installing-dependencies>
