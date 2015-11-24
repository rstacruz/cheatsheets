---
title: Deploy gh-pages via Travis
category: Git
---

Taken from https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db

### Create an OAuth token and encrypt it

Use https://github.com/settings/tokens/new

```sh
# via ruby
gem install travis
travis encrypt -r user/repo GITHUB_TOKEN=[the token here]
```

### Make it run the deploy script on deploy

```yaml
 # .travis.yml
script:
  - bash ./scripts/deploy-to-gh-pages.sh
env:
  global:
    - GITHUB_REPO: "user/repo"
    - secure: "nlnXJW/imf/w..."  # <-- from travis-encrypt
```

### Write deployer

Create the file `scripts/deploy-to-gh-pages.sh`

```sh
#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

rm -rf public
mkdir public

# config
git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

# build (CHANGE THIS)
make

# deploy
cd public
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
```

From Ractive, this might be useful in certain cases:

```
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then exit 0; fi
```
