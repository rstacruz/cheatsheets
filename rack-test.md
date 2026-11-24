---
title: rack-test
subtitle: Rack testing helpers
category: Ruby libraries
last_verified_with: "rack-test 2.3.0."
updated: 2026-11-24
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

### Read the response

```ruby
last_response.status           # 200
last_response.ok?              # true
last_response.body             # 'hello'
last_response['Content-Type']  # 'text/plain'
last_request.url               # 'http://example.org/users'
```

`last_response` is a `Rack::MockResponse`; both readers raise until a request has run.

## Session

### Headers and env

```ruby
header 'Accept', 'application/json'
header 'Authorization', 'Bearer token'
env 'rack.session', { csrf: 'token' }
```

Headers and env entries persist for later requests in the session; pass `nil` to clear one.

### Auth and cookies

```ruby
basic_authorize 'user', 'pass'
set_cookie 'session=abc123'
clear_cookies
```

`basic_authorize` sets the `Authorization` header; `authorize` remains an alias.

### Follow redirects

```ruby
get '/old'
follow_redirect!
last_response.body
```

Requests do not follow redirects on their own; `follow_redirect!` raises if the last response was not a redirect.

## References

- [rack-test on GitHub](https://github.com/rack/rack-test)
