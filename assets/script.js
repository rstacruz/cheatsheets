(function () {
  var tags = document.querySelectorAll('h1,h2,h3,h4,h5,h6,li,p,span');

  for (var i=0, len=tags.length; i<len; i++) {
    var tag = tags[i];
    if ((~tag.innerHTML.indexOf('>') ||
      (!tag.innerHTML.match(/https?:\/\//))))
      continue;
    tag.innerHTML = tag.innerHTML.replace(/https?:\/\/[^ ]*/g, function (url) {
      url = url.replace(/[\.\),!]*$/, '');
      var label = url;
      label = label.replace(/^https?:\/\//, '')
        .replace(/\/$/, '');
      return "<a href='"+url+"'>"+label+"</a>";
    });
  }
})();

(function () {
  if (!window.JekyllEscape) return;
  var tags = document.querySelectorAll('pre code, pre span');

  for (var i=0, len=tags.length; i<len; i++) {
    var tag = tags[i];
    if (~tag.innerHTML.indexOf('{\\%'))
      tag.innerHTML = tag.innerHTML.replace(/{\\%/g, '{%');
    if (~tag.innerHTML.indexOf('{\\{'))
      tag.innerHTML = tag.innerHTML.replace(/{\\{/g, '{{');
  }
})();
