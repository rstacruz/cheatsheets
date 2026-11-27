---
title: fetch()
subtitle: Browser HTTP request function
logo: { set: icon-park-outline, name: transfer-data }
category: JavaScript
weight: -3
updated: 2026-11-25
last_verified_with: "ECMAScript 2026, Node.js 26.13.1."
tier: t3
intro: |
  `fetch()` requests a resource over HTTP and returns a promise for the response.
links:
  - title: Using Fetch
    url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  - title: fetch()
    url: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
---

### Fetch

<!-- {: .-prime} -->

```js
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => ...)
```
<!-- {: data-highlight="fetch('/data.json')"} -->

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
<!-- {: data-highlight="res.text(); res.json()"} -->

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
<!-- {: data-highlight="method: 'post'"} -->

See: [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request), [Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) _(developer.mozilla.org)_

### Catching errors

#### Check status

```js
fetch('/data.json')
  .then(checkStatus)
```
<!-- {: data-highlight=".then(checkStatus)"} -->

#### checkStatus()

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
<!-- {: data-highlight="function checkStatus"} -->

`fetch()` rejects only on network errors; check `res.ok` yourself.

See: [Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) _(developer.mozilla.org)_

### Node.js

```js
const res = await fetch('https://example.com/data.json')
```
<!-- {: data-highlight="await fetch"} -->

Node 18+ has a global `fetch`; older versions need
[undici](https://undici.nodejs.org/) or
[node-fetch](https://www.npmjs.com/package/node-fetch).

See: [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) _(developer.mozilla.org)_

## References

<!-- {: .-one-column} -->

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>
