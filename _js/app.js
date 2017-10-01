// 3rd party libs
window.jQuery = window.$ = require('jquery')
window.Prism = require('prismjs')
require('prismjs/plugins/line-highlight/prism-line-highlight.min.js')

// CSS
require('sanitize.css')
require('prismjs/plugins/line-highlight/prism-line-highlight.css')
require('hint.css/hint.min.css')
require('prismjs/components/prism-jsx.min.js')
require('prismjs/components/prism-bash.min.js')
require('prismjs/components/prism-scss.min.js')
require('prismjs/components/prism-css.min.js')
require('prismjs/components/prism-elixir.min.js')
require('prismjs/components/prism-ruby.min.js')

// All the others
function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./initializers/', true, /\.js$/))
requireAll(require.context('./behaviors/', true, /\.js$/))
