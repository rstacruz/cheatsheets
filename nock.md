---
title: Nock
subtitle: HTTP mocking library
category: JavaScript testing
last_verified_with: "nock 15.0.6."
updated: 2026-11-24
tier: t3
intro: |
  HTTP mocking for Node.js tests: intercept requests, specify replies, and block real network calls.
links:
  - title: Nock repository and documentation
    url: https://github.com/nock/nock
  - title: Nock usage guide
    url: https://github.com/nock/nock#usage
---

## Intercept

### Mock a request

```js
import nock from 'nock'

const scope = nock('https://api.example.com')
  .get('/user')
  .reply(200, { id: 1234 })
```

Each interceptor answers one matching request and is then consumed.

See: [Nock usage](https://github.com/nock/nock#usage)

### Verify a call

```js
const scope = nock('https://api.example.com')
  .get('/user')
  .reply(200)

await fetch('https://api.example.com/user')
scope.done()
```

`done()` throws when the mock went unused; `isDone()` returns a boolean and `nock.pendingMocks()` lists what is outstanding.

See: [Nock expectations](https://github.com/nock/nock#expectations)

### Replies

```js
nock('https://api.example.com')
  .get('/user')
  .reply(200, { id: 1234 }, { 'X-Total': '1' })
```

#### Options

| Call | Description |
| --- | --- |
| `.reply(404)` | Status only |
| `.replyWithError('boom')` | Fail like a network error |
| `.delay(500).reply(200)` | Delay the response |

See: [Specifying replies](https://github.com/nock/nock#specifying-replies)

### Match queries and headers

```js
nock('https://api.example.com')
  .get('/users')
  .query({ page: 2 })
  .matchHeader('authorization', /^Bearer /)
  .reply(200, [])
```

See: [Matching request bodies and headers](https://github.com/nock/nock#request-headers-matching)

### Filter paths

```js
nock('https://api.example.com')
  .filteringPath(/token=[^&]*/g, 'token=XXX')
  .get('/users?token=XXX')
  .reply(200)
```

Rewrites the path before matching, for tokens and other changing values.

See: [Path filtering](https://github.com/nock/nock#path-filtering)

### Allow real requests

```js
nock('https://api.example.com', { allowUnmocked: true })
  .get('/mock')
  .reply(200)
```

Unmatched requests on that host reach the network.

See: [Allow unmocked requests](https://github.com/nock/nock#allow-unmocked-requests-on-a-mocked-hostname)

## Cleanup
<!-- {: .-three-column} -->

### Reset between tests

```js
afterEach(() => {
  nock.cleanAll()
})
```

`cleanAll()` removes every interceptor, persisted ones included.

See: [nock.cleanAll](https://github.com/nock/nock#cleanall)

### Block the network

```js
nock.disableNetConnect()
```

Requests without an interceptor then fail; `nock.enableNetConnect('localhost')` allows one host back.

See: [Disabling requests](https://github.com/nock/nock#disabling-requests)

### Restore

```js
nock.restore()
```

`restore()` also stops interception; call `nock.activate()` to resume.

See: [Restoring](https://github.com/nock/nock#restoring)
