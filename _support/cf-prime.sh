#!/usr/bin/env bash

(
  echo https://cheatsheets.brucebentley.dev/
  (
    git ls-files \
      | grep -E '\.md$' \
      | grep -v -E 'CONTRIBUTING|README|Readme' \
      | grep -v -E '^_' \
      | sort \
      | uniq \
      | sed 's/\.md$//g'
  ) \
    | sed 's#^#https://cheatsheets.brucebentley.dev/#g'
) \
  | xargs curl >/dev/null
