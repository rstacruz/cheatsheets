const critical = require('critical')

console.warn('Generating critical path styles into _includes/2017/critical/...')

const OPTIONS = {
  base: '_site',
  width: 1400,
  height: 900,
  minify: true,
  extract: true,
  ignore: [
    '@font-face'
  ],
  include: [
    // fade-in magic (base/fade)
    /html\.WithJs/
  ]
}

critical.generate({
  ...OPTIONS,
  src: 'index.html',
  dest: '../_includes/2017/critical/home.css',
  include: [
    ...OPTIONS.include,

    // searchbox with placeholder
    /\.search-box/
  ]
})

critical.generate({
  ...OPTIONS,
  src: 'react.html',
  dest: '../_includes/2017/critical/sheet.css',
  include: [
    ...OPTIONS.include,

    // sections (and h3 section list), just to be sure
    /\.h3-section/,

    // eg, -six-column in devhints.io/layout-thrashing
    /-column/
  ]
})
