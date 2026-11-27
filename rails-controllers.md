---
title: Rails controllers
subtitle: Request handling classes
logo: { set: icon-park-outline, name: control }
category: Rails
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-24
tier: t3
intro: |
  Rails controller filters, authentication, request and response objects, and response streaming.
links:
  - title: Action Controller overview
    url: https://guides.rubyonrails.org/action_controller_overview.html
  - title: ActionController::Base
    url: https://api.rubyonrails.org/classes/ActionController/Base.html
  - title: ActionDispatch::Request
    url: https://api.rubyonrails.org/classes/ActionDispatch/Request.html
---

## Requests

### Redirect

```ruby
redirect_to root_url
redirect_to root_url, notice: "Good."
```

See: [redirect_to](https://api.rubyonrails.org/classes/ActionController/Redirecting.html#method-i-redirect_to)

### Session, flash, params

```ruby
session[:user_id] = nil

flash[:notice] = "Hello"    # flushed on the next request
flash.keep                  # keep values for the next request
flash.now[:error] = "Boo"   # available on this request only

cookies[:hello] = "Hi"

params[:page]
```

`params` merges `query_parameters`, `path_parameters`, and `request_parameters`.

See: [Session](https://guides.rubyonrails.org/action_controller_overview.html#session)

### Respond to formats

```ruby
respond_to do |format|
  format.html
  format.xml  { render xml: @users }
  format.json { render json: @users }
  format.js   # runs the matching JS view
end
```

See: [respond_to](https://api.rubyonrails.org/classes/ActionController/MimeResponds.html#method-i-respond_to)

### Default URL options

```ruby
class ApplicationController < ActionController::Base
  def default_url_options
    { locale: I18n.locale }
  end
end
```

See: [default_url_options](https://guides.rubyonrails.org/action_controller_overview.html#the-default-url-options-method)

## Actions

### Filters

#### Callbacks

```ruby
before_action :authenticate
before_action :authenticate, only: %i[edit update]
before_action :authenticate, except: [:index]
after_action :log_action
```

#### Inline

```ruby
before_action do |controller|
  redirect_to login_url unless controller.logged_in?
end
```

#### Skipping

```ruby
skip_before_action :require_login, only: %i[new create]
```

#### Around

```ruby
around_action :wrap_in_transaction

def wrap_in_transaction(&block)
  ActiveRecord::Base.transaction(&block)
end
```

See: [Controller callbacks](https://guides.rubyonrails.org/action_controller_overview.html#controller-callbacks)

### Basic authentication

```ruby
before_action :authenticate

def authenticate
  authenticate_or_request_with_http_basic do |user, password|
    user == "root" && password == "alpine"
  end
end
```

See: [Basic authentication](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)

### Digest authentication

```ruby
def authenticate_by_digest
  realm = "Secret3000"
  users = {
    "rsc" => Digest::MD5.hexdigest("rsc:#{realm}:passwordhere")
  }

  authenticate_or_request_with_http_digest(realm) do |user|
    users[user]
  end
end
```

Uses the `ha1` hash of `username:realm:password`.

See: [Digest authentication](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Digest.html)

### Token authentication

```ruby
is_logged_in = authenticate_with_http_token do |token, options|
  token == our_secret_token
end

request_http_token_authentication unless is_logged_in
```

See: [Token authentication](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token.html)

### Test authentication

```ruby
basic = ActionController::HttpAuthentication::Basic
auth = basic.encode_credentials("root", "alpine")
get "/notes/1.xml", headers: { "Authorization" => auth }
```

See: [encode_credentials](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html#method-i-encode_credentials)

## Request and response

### Request

```ruby
request.host            #=> "www.example.com"
request.domain          #=> "www.example.com"
request.domain(2)       #=> "example.com"
request.port            #=> 80
request.protocol        #=> "http://"
request.query_string    #=> "q=duck+tales"
request.url             #=> "http://…/search?q=duck+tales"
request.fullpath        #=> "/search?q=duck+tales"

request.headers         #=> an ActionDispatch::Http::Headers

request.format          #=> "text/html"
request.remote_ip       #=> "203.0.113.7"
request.local?          #=> true (localhost or 127.0.0.1)

request.xhr?

request.method          #=> "POST"
request.method_symbol   #=> :post
request.get?
request.post?
request.put?
request.delete?
request.head?
```

See: [ActionDispatch::Request](https://api.rubyonrails.org/classes/ActionDispatch/Request.html)

### Response

```ruby
response.body
response.status         #=> 404
response.location       #=> redirect location
response.content_type
response.charset
response.headers

response.headers["Content-Type"] = "application/pdf"
```

See: [ActionDispatch::Response](https://api.rubyonrails.org/classes/ActionDispatch/Response.html)

### Streaming

#### In memory

```ruby
send_data pdfdata, filename: "foo.pdf", type: "application/pdf"
```

#### From disk

```ruby
send_file Rails.root.join("public", "filename.txt"), \
  filename: "download.txt", type: "text/plain"
```

`send_data` sends a string; `send_file` streams the file from disk.

See: [send_data](https://api.rubyonrails.org/classes/ActionController/DataStreaming.html#method-i-send_data)

## Reference

- [Action Controller overview](https://guides.rubyonrails.org/action_controller_overview.html)
- [HttpAuthentication::Basic](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)
- [HttpAuthentication::Token](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token.html)
