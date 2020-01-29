// Return value after `val` in the array `a`, looping around
function next(a, val) {
  var index = a.indexOf(val);
  return index == -1 || index == (a.length - 1) ? a[0] : a[index + 1];
}

// Return value before `val` in the array `a`, looping around
function prev(a, val) {
  var index = a.indexOf(val);
  return index <= 0 ? a[a.length - 1] : a[index - 1];
}

/*
Escape the string in an app-specific way:
  <x> become <em>x</em>
  [x] becomes <span class="optional">x</span>
  `x` becomes <code>x</code>
  \r becomes <br>
*/
function esc(s) {
  return s.replace(/</g, 'zyx').replace(/>/g, '</em>').replace(/zyx/g, '<em>').
      replace('[', '<span class="optional">').replace(']', '</span>').
      replace(/`(.*?)`/g, '<code>' + "$1" + '</code>').
      replace(/\r/g, '<br>');
}

// Return a two charact language code
function detectLanguage(/*pass in navi*/gator) {
  return cookies.read('lang') ||
    (cookies.read('language') ||
    gator.language ||
    gator.userLanguage ||
    'en').slice(0, 2)
}

if (typeof(module) !== 'undefined') {
  module.exports = {
    detectLanguage: detectLanguage,
    next: next,
    prev: prev,
    esc: esc
  }
}
