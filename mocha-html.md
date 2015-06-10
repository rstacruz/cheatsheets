---
title: Mocha HTML
---

This is a mocha template that loads js/css from cdn.

```html
<!doctype html>
<html>
<head>
  <title>Mocha</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.rawgit.com/mochajs/mocha/2.2.4/mocha.css" rel="stylesheet" />
</head>
<body>
  <div id="mocha"></div>
  <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.4/mocha.js"></script>
  <script src="https://cdn.rawgit.com/chaijs/chai/2.3.0/chai.js"></script>
  <script>mocha.setup('bdd')</script
  <script src="tests.js"></script><!-- replace this -->
  <script>mocha.run()</script>
</body>
</html>
```
