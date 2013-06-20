title: Travis (.travis.yml)
---

### Node

    language: node_js
    node_js:
      - "0.10"

 * Provides: 0.10, 0.8, 0.6, 0.11 (latest dev)
 * Defaults install to `npm install`
 * Defaults test to `npm test`

### Ruby

    language: ruby
    rvm:
      - 2.0.0
      - 1.9.3
      - 1.8.7
      - rbx-19mode
      - jruby-19mode
      - jruby-18mode

 * * Defaults install to `bundle install`
 * Defaults test to `rake`

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
