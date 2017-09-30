// 3rd party libs
window.jQuery = window.$ = require('jquery')
window.Prism = require('prismjs')

// CSS
require('sanitize.css')
require('prismjs/plugins/line-highlight/prism-line-highlight.css')

// Behaviors that need to go first
require('./behaviors/main-body')

// All the others
function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./initializers/', true, /\.js$/))
requireAll(require.context('./behaviors/', true, /\.js$/))
