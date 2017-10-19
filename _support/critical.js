const critical = require('critical')

console.warn('Generating critical path styles into _includes/2017/critical/...')

const options = {
  base: '_site',
  width: 1400,
  height: 900,
  minify: true,
  extract: true,
  ignore: [
    'font-face'
  ]
}

critical.generate({
  ...options,
  src: 'index.html',
  dest: '../_includes/2017/critical/home.css'
})

critical.generate({
  ...options,
  src: 'react.html',
  dest: '../_includes/2017/critical/sheet.css',
  include: [
    /\.h3-section/
  ]
})
