#!/usr/bin/env bash

# https://gist.github.com/olegch/1730673
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for fn in "$@"; do
  echo "==> $fn"
  cat "$fn" \
    | yarn run -s prettier --stdin-filepath 'file.md' --print-width 60 \
    | ruby "$DIR/md-postformat.rb" \
    | tee "$fn" \
    > /dev/null
done
