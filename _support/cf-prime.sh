#!/usr/bin/env bash

(
  echo https://devhints.io/
  (
    git ls-files \
      | grep -E '\.md$' \
      | grep -v -E 'CONTRIBUTING|README|Readme' \
      | grep -v -E '^_' \
      | sort \
      | uniq \
      | sed 's/\.md$//g'
  ) \
    | sed 's#^#https://devhints.io/#g'
) \
  | xargs curl >/dev/null
