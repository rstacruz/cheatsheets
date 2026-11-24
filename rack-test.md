---
title: rack-test
subtitle: Rack testing helpers
category: Ruby libraries
last_verified_with: "rack-test 2.3.0."
updated: 2026-11-24
tier: t3
intro: |
  Rack::Test request helpers for testing Rack apps with sessions, headers, cookies, and redirects.
links:
  - title: rack-test on GitHub
    url: https://github.com/rack/rack-test
  - title: Rack specification
    url: https://github.com/rack/rack/blob/main/SPEC.rdoc
---

## Requests

### Test case

```ruby
require 'minitest/autorun'
require 'rack/test'

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    MyApp
  end
end
```

Including `Rack::Test::Methods` delegates the request helpers to the current session; `app` returns the Rack app under test.

See: [Examples](https://github.com/rack/rack-test#examples)

### Send a request

```ruby
get '/users'
get '/users', { page: 2 }        # query string
post '/users', { name: 'john' }  # form-encoded body
put '/users/1', { user: { name: 'john' } }
delete '/users/1'
options '/users'
head '/users'
```

A hash is form-encoded into the body; a string is sent as the raw body.

See: [Examples](https://github.com/rack/rack-test#examples)

### Read the response

```ruby
last_response.status           # 200
last_response.ok?              # true
last_response.body             # 'hello'
last_response['Content-Type']  # 'text/plain'
last_request.url               # 'http://example.org/users'
```

`last_response` is a `Rack::MockResponse`; both readers raise until a request has run.

See: [Rack::Test::Session](https://github.com/rack/rack-test/blob/main/lib/rack/test.rb#L141)

## Session
<!-- {: .-three-column} -->

### Headers and env

```ruby
header 'Accept', 'application/json'
header 'Authorization', 'Bearer token'
env 'rack.session', { csrf: 'token' }
```

Headers and env entries persist for later requests in the session; pass `nil` to clear one.

See: [Rack::Test::Session](https://github.com/rack/rack-test/blob/main/lib/rack/test.rb#L173)

### Auth and cookies

```ruby
basic_authorize 'user', 'pass'
set_cookie 'session=abc123'
clear_cookies
```

`basic_authorize` sets the `Authorization` header; `authorize` remains an alias.

See: [Rack::Test::Session](https://github.com/rack/rack-test/blob/main/lib/rack/test.rb#L198)

### Follow redirects

```ruby
get '/old'
follow_redirect!
last_response.body
```

Requests do not follow redirects on their own; `follow_redirect!` raises if the last response was not a redirect.

See: [follow_redirect!](https://github.com/rack/rack-test/blob/main/lib/rack/test.rb#L209)

## References

- [rack-test on GitHub](https://github.com/rack/rack-test)
