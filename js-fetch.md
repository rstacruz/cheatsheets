---
title: fetch()
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Fetch data over HTTP in the browser: responses, request options, and error
  handling.
---

### Introduction
{: .-intro}

`fetch()` requests a resource over HTTP and returns a promise for the response.

- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) _(developer.mozilla.org)_
- [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) _(developer.mozilla.org)_

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

See: [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) _(developer.mozilla.org)_

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

See: [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response), [Response.type](https://developer.mozilla.org/en-US/docs/Web/API/Response/type) _(developer.mozilla.org)_

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
  credentials: 'omit',        // never send cookies
})
```

See: [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request), [Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) _(developer.mozilla.org)_

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

`fetch()` rejects only on network errors; check `res.ok` yourself.

See: [Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) _(developer.mozilla.org)_

### Node.js

```js
const res = await fetch('https://example.com/data.json')
```

Node 18+ has a global `fetch` (stable in Node 21). On older versions, use
[undici](https://undici.nodejs.org/) or
[node-fetch](https://www.npmjs.com/package/node-fetch).

See: [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) _(developer.mozilla.org)_

## References
{: .-one-column}

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>
