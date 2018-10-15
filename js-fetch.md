---
title: fetch()
category: JavaScript
layout: 2017/sheet
weight: -3
---

### Fetch
{: .-prime}

```js
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => ...)
```
{: data-line="4"}

### Response

```js
fetch('/data.json')
.then(res => {
  res.text()       // response body (=> Promise)
  res.json()       // parse via JSON (=> Promise)
  res.status       //=> 200
  res.statusText   //=> 'OK'
  res.redirected   //=> false
  res.ok           //=> true
  res.url          //=> 'http://site.com/data.json'
  res.type         //=> 'basic'
                   //   ('cors' 'default' 'error'
                   //    'opaque' 'opaqueredirect')

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

```js
fetch('/data.json')
  .then(checkStatus)
```

```js
function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }
}
```

Non-2xx responses are still successful requests. Use another function to turn them to errors.

### Using with node.js

```js
const fetch = require('isomorphic-fetch')
```

See: [isomorphic-fetch](https://npmjs.com/package/isomorphic-fetch) _(npmjs.com)_

## References
{: .-one-column}

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>
