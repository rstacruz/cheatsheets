#!/usr/bin/env bash
set -eou pipefail

exit_failure() {
  echo 'Failed :('
  echo ''
  echo '  If your build failed at this point, it means'
  echo '  the site failed to generate. Check the project'
  echo '  out locally and try to find out why.'
}

trap exit_failure ERR


files=(
  _site/vim.html
  _site/react.html
  _site/index.html
)

for fn in "${files[@]}"; do
  echo ''
  echo -n "→ Checking: $fn... "
  test -f "$fn"
  grep -q '<script src' "$fn"
  grep -q 'assets/packed/app.js' "$fn"
  grep -q 'doctype html' "$fn"
  grep -q 'link rel="canonical"' "$fn"
done
echo ''
echo ''
echo "✓ Smoke tests good :)"
