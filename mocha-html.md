---
title: Mocha HTML
category: JavaScript libraries
---

This is a mocha template that loads js/css from cdn.

```html
<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>Mocha</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <link href='https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css' rel='stylesheet' />
</head>
<body>
  <div id='mocha'></div>
  <script src='https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js'></script>
  <script src='https://cdn.rawgit.com/chaijs/chai/2.3.0/chai.js'></script>
  <script>window.onerror=function(msg,url,line){document.getElementById('mocha').innerHTML+='<h1>'+msg+'</'+'h1>'+'<h2>'+url+':'+line+'</'+'h2>';return false}</script>
  <script>mocha.setup('bdd')</script>
  <!-- what to test: -->
  <script src='../index.js'></script>
  <!-- tests to run: -->
  <script src='first_test.js'></script>
  <script src='second_test.js'></script>
  <script>mocha.run()</script>
</body>
</html>
```
