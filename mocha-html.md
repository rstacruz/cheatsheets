---
title: Mocha HTML
---

This is a mocha template that loads js/css from cdn.

    <!doctype html>
    <html>
    <head>
      <title>Mocha</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.rawgit.com/visionmedia/mocha/1.21.4/mocha.css" rel="stylesheet" />
    </head>
    <body>
      <div id="mocha"></div>
      <script src="https://cdn.rawgit.com/visionmedia/mocha/1.21.4/mocha.js"></script>
      <script src="https://cdn.rawgit.com/chaijs/chai/1.9.2/chai.js"></script>
      <script src="../index.js"></script>
      <script>mocha.setup('bdd')</script
      <script src="tests.js"></script>
      <script>mocha.run()</script>
    </body>
    </html>
