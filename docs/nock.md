---
title: Nock
category: JavaScript libraries
layout: 2017/sheet
---

### Nock

```js
scope = nock('http://foo.com')
scope = nock('http://foo.com', { allowUnmocked: true })
```

```js
nock('http://foo.com')
  .get('/user')
  .reply(200, { id: 1234 })
```

### Filtering

```js
nock('http://foo.com')
  .filteringPath(/[&\?]token=[^&]*/g, '')
  .get('/user')

// catches "/user?token=..." as well
```
