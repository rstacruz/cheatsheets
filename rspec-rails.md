---
title: Rspec-rails
category: Ruby
---

### About
{: .-intro}

RSpec is a Ruby library for testing. [rspec-rails](https://github.com/rspec/rspec-rails) is its Rails integration.

- <https://rspec.info/>
- <https://github.com/rspec/rspec-rails>

### Spec tasks

    rake spec:controllers
    rake spec:helpers
    rake spec:lib
    rake spec:mailers
    rake spec:models
    rake spec:requests
    rake spec:routing
    rake spec:views

### Models

```rb
# spec/models/*.rb
describe MyModel do
end
```

### Controllers

```rb
# spec/controllers/*.rb
describe MyController do
  describe "POST update" do
    render_views #optional

    it "works" do
      post :update, { user: { name: "john" } }

      controller
      controller.send ...

      response
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template("index")
      expect(response).to redirect_to '/..'

      expect(assigns :article).to eq article

      response.status
    end
  end
end
```

### Request

```js
# spec/requests/*.rb
describe "home page" do
  it "displays the user's username after successful login" do
    get "/login"
    post "/login", username: "jdoe", password: "secret"

    expect(response.status).to eql 200
    expect(response).to redirect_to(...)
    expect(response).to render_template(:show)
    expect(response.body).to include 'hello'
    follow_redirect!
  end
end
```

### Routing

```rb
# spec/routing/*.rb
describe "routing to profiles" do
  it "routes /profile/:username to profile#show for username" do
    expect(get: "/profiles/jsmith").to route_to(
      controller: "profiles",
      action: "show",
      username: "jsmith"
    )
  end

  it "does not expose a list of profiles" do
    expect(get: "/profiles").not_to be_routable
  end
end
```

### Helpers

```rb
# spec/helpers/*.rb
describe EventsHelper do
  describe "#link_to_event" do
    it "displays the title, and formatted date" do
      event = Event.new("Ruby Kaigi", Date.new(2010, 8, 27))

      # helper is an instance of ActionView::Base configured with the
      # EventsHelper and all of Rails' built-in helpers
      expect(helper.link_to_event).to match /Ruby Kaigi, 27 Aug, 2010/
    end
  end
end
```

### Features

```rb
# spec/features/*.rb
feature 'Signing in' do
  given(:something) { "hi" }

  background do
    User.make email: 'hi@gmail.com'
  end

  scenario 'Signing in with credentials' do
  end
end
```

### Matchers

```rb
be_a_new(Widget)  # new_record?
render_template("new")
render_template(partial: 'form', locals: {...})
redirect_to(widgets_path)
route_to(..)
be_routable
have_http_status(500)
have_http_status(:created)
```

### Time helpers

```
travel_to Time.new(2014, 11, 14, 01, 04, 44)
...
travel_back

travel_to Time.new(2014, 11, 14, 01, 04, 44) do
  ...
end
```
