---
title: Nock
category: JavaScript libraries
---

### Nock

    scope = nock('http://foo.com')
    scope = nock('http://foo.com', { allowUnmocked: true })

    nock('http://foo.com')
      .get('/user')
      .reply(200, { id: 1234 })


### Filtering

    nock('http://foo.com')
      .filteringPath(/[&\?]token=[^&]*/g, '')
      .get('/user')

    # catches "/user?token=..." as well
