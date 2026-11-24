---
title: Mocha HTML
subtitle: Browser test page template
category: JavaScript testing
last_verified_with: "Mocha 12.0.3, Chai 6.3.0."
updated: 2026-11-24
---

### Template

```html
<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>Mocha</title>
  <meta name='viewport'
    content='width=device-width, initial-scale=1.0'>
  <link rel='stylesheet'
    href='https://unpkg.com/mocha@12.0.3/mocha.css'>
</head>
<body>
  <div id='mocha'></div>
  <script src='https://unpkg.com/mocha@12.0.3/mocha.js'></script>
  <script type='module'>
    import { expect } from
      'https://unpkg.com/chai@6.3.0/index.js'

    globalThis.expect = expect
    mocha.setup('bdd')

    // what to test:
    await import('./index.js')
    // tests to run:
    await import('./first_test.js')
    await import('./second_test.js')

    mocha.run()
  </script>
  <script>
    window.onerror = (msg, url, line) => {
      document.getElementById('mocha').innerHTML +=
        `<h1>${msg}</h1><h2>${url}:${line}</h2>`
      return false
    }
  </script>
</body>
</html>
```

Serve the folder, since module imports do not load over `file://`; test files are ES modules that use the global `expect`.
