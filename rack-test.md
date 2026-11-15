---
title: rack-test
subtitle: Rack testing helpers
category: Ruby libraries
---

### Methods

```ruby
get 'url'
post 'url', 'name' => 'john'
put
patch
delete
options
head
```

```ruby
authorize 'user', 'pass'
env 'rack.session', csrf: 'token'
header 'Content-Type', 'text/html'
```

See [rack/test.rb](https://github.com/brynary/rack-test/blob/master/lib/rack/test.rb).
