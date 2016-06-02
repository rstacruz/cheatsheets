---
title: fetch()
category: JavaScript
---

```js
fetch('/data.json')
  .then(response => response.json())
  .catch(err => ...)
```

### Response

```js
fetch('/data.json')
.then(res => {
  res.text()       // response body
  res.json()       // parse via JSON
  res.status       //=> 200
  res.statusText   //=> 'OK'
  res.redirected   //=> false
  res.ok           //=> true
  res.url          //=> 'http://site.com/data.json'
  res.type         //=> 'basic' ('cors' 'default' 'error' 'opaque' 'opaqueredirect')

  res.headers.get('Content-Type')
})
```

### Request options

```js
fetch('/data.json', {
  method: 'post',
  body: new FormData(form), // post body
  body: JSON.stringify(...),

  headers: {
    'Accept': 'application/json'
  }
})
```

##

## Using with node.js

```js
var fetch = require('isomorphic-fetch')
```

## References

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>
