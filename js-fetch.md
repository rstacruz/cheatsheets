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
  },

  credentials: 'same-origin', // send cookies
  credentials: 'include',     // send cookies, even in CORS

})
```

### Catching errors

Non-2xx responses are still successful requests. Use another function to turn them to errors.

```js
fetch('/data.json')
  .then(checkStatus)
```

```js
function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var err = new Error(res.statusText)
    err.response = res
    throw err
  }
}
```

## Using with node.js

```js
var fetch = require('isomorphic-fetch')
```

## References

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>
