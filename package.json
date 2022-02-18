{
  "name": "cheatsheets",
  "description": "Devhints.io",
  "version": "1.0.0",
  "author": "Rico Sta. Cruz <rstacruz@users.noreply.github.com>",
  "dependencies": {
    "autoprefixer": "^9.8.2",
    "dom101": "^2.2.1",
    "hint.css": "^2.6.0",
    "isotope-layout": "^3.0.6",
    "lodash.noop": "^3.0.1",
    "modularscale-sass": "^3.0.10",
    "onmount": "^1.3.0",
    "postcss-modules": "^2.0.0",
    "prismjs": "^1.20.0",
    "sanitize.css": "^11.0.1",
    "sass": "^1.26.8"
  },
  "devDependencies": {
    "@babel/core": "^7.10.2",
    "@babel/preset-env": "^7.10.2",
    "@rstacruz/prettier-plugin-markdown-code-fences": "^1.0.0",
    "jest": "26.0.1",
    "jest-html": "1.5.0",
    "netlify-plugin-minify-html": "^0.2.3",
    "npm-run-all": "^4.1.5",
    "parcel-bundler": "^1.12.4",
    "prettier": "^2.0.5",
    "wait-on": "^5.0.1"
  },
  "homepage": "https://devhints.io/",
  "jest": {
    "snapshotSerializers": [
      "<rootDir>/node_modules/jest-html"
    ]
  },
  "license": "MIT",
  "main": "index.js",
  "private": true,
  "repository": "https://github.com/rstacruz/cheatsheets.git",
  "scripts": {
    "build": "run-s -s 'parcel:*:build' jekyll:build",
    "dev": "run-p -sl jekyll:watch 'parcel:*:watch'",
    "jekyll:build": "bundle exec jekyll build",
    "jekyll:watch": "wait-on assets/packed/app.js && wait-on _includes/2017/critical/critical-sheet.css && bundle exec jekyll serve --safe --trace --drafts --watch --incremental --host ${HOST:-0.0.0.0} --port ${PORT:-3000}",
    "jest-html": "jest-html",
    "parcel:app:build": "parcel build '_parcel/app.js' -d assets/packed --no-source-maps --no-autoinstall",
    "parcel:app:watch": "parcel watch '_parcel/app.js' -d assets/packed --no-source-maps --no-autoinstall",
    "parcel:build": "run-s -s 'parcel:*:build'",
    "parcel:critical:build": "parcel build '_parcel/critical*.js' -d _includes/2017/critical --no-source-maps --no-autoinstall",
    "parcel:critical:watch": "parcel watch '_parcel/critical*.js' -d _includes/2017/critical --no-source-maps --no-autoinstall",
    "predev": "rm -rf assets/packed _includes/2017/critical",
    "prejekyll:build": "bundle",
    "prejekyll:watch": "bundle",
    "prettier:format": "prettier --write '_parcel/**/*.{js,scss}'",
    "test": "jest",
    "test:smoke": "bash _support/smoke_test.sh"
  }
}
