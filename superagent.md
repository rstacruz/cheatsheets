---
title: Superagent
subtitle: HTTP client for Node
category: Hidden
# Unfinished since 2018: res.error is an Error object, not a boolean, and noContent's 1223 status is obsolete.
created_at: 2014-03-22
updated: 2018-04-21
tags: [Archived]
archived: |
  This unfinished response-object reference misstates `res.error` (an `Error`
  object, not a boolean) and keeps the removed IE9 `1223` status. Use the
  [Superagent repository](https://github.com/forwardemail/superagent) instead.
---

### Response object
```javascript
  res: {
    // The HTTP Status Code (see: httpstatuses.com for definitions on HTTP status codes)
    status: 202,
    // True when res.status is 2xx
    ok: true,
    // True when res.status is 4xx or 5xx
    error: false,
    // True when res.status is 4xx
    clientError: false,
    // True when res.status is 5xx
    serverError: false,

    // True when res.status == 202
    accepted: true,
    // True when res.status == 204 || res.status == 1223 
    noContent: false,
    // True when res.status == 400
    badRequest: false,
    // True when res.status == 401
    unauthorized: false,
    // True when res.status == 406
    notAcceptable: false,
    // True when res.status == 404
    notFound: false,
    // True when res.status == 403
    forbidden: false,

    // Unparsed response text
    text: '{"user":{"username":"JohnDoe","role":"admin"}}'

    // Parsed response text (only if response is 'application/json' or 'application/x-www-form-urlencoded'
    body: {
      // Example of parsed object from res.text
      user: {
        username: 'JohnDoe',
        role: 'admin'
      }
    }

    // The content-type (parsed from headers)
    type: 'application/json'
    // The charset (parsed from headers)
    charset: 'UTF-8'
    // Header object with each header field as a property
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      ...
    }
}
```
