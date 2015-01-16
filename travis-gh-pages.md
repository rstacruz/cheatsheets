---
title: Travis: deploy gh-pages
layout: default
---

Taken from https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db

### Create an OAuth token and encrypt it

Use https://github.com/settings/tokens/new

```sh
# via node
npm install travis-encrypt -g
travis-encrypt -r user/repo GH_TOKEN=[the token here]

# via ruby
gem install travis
travis encrypt -r user/repo GH_TOKEN=[the token here]
```

### Make it run the deploy script on deploy

```
 # .travis.yml
script:
  - bash ./scripts/deploy-to-gh-pages.sh
env:
  global:
    - GH_REF: "github.com/user/repo.git"
    - secure: "nlnXJW/imf/w..."
```

### Write deployer

Create the file `scripts/deploy-to-gh-pages.sh`

```
#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then exit 0; fi
rm -rf out || exit 0
mkdir out

# build
node build.js

# deploy
( cd out
  git init
  git add .
  git commit -m "Deploy to Github Pages" --author "Travis CI <nobody@nobody.org>"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
```
