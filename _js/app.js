// 3rd party libs
window.jQuery = window.$ = require('jquery')
window.Prism = require('prismjs')

// All the others
function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./initializers/', true, /\.js$/))
requireAll(require.context('./behaviors/', true, /\.js$/))
