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

### Apt packages

    before_install:
    - sudo apt-get update -q
    - sudo apt-get install gcc-4.8 -y
<https://docs.travis-ci.com/user/installing-dependencies/>

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

 * http://about.travis-ci.org/docs/user/build-configuration/
 * http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/
 * http://about.travis-ci.org/docs/user/languages/ruby/
