---
title: Rspec-rails
subtitle: Rails testing integration
logo: { set: icon-park-outline, name: experiment }
category: Ruby
intro: |
  RSpec is a Ruby library for testing. rspec-rails is its Rails integration.
links:
  - title: https://rspec.info/
    url: https://rspec.info/
  - title: https://github.com/rspec/rspec-rails
    url: https://github.com/rspec/rspec-rails
tier: t3
last_verified_with: "RSpec Rails 8.0, RSpec 3.13."
updated: 2026-11-26
---

### Spec tasks

```
rake spec:controllers
rake spec:helpers
rake spec:lib
rake spec:mailers
rake spec:models
rake spec:requests
rake spec:routing
rake spec:views
```

See: [Getting started](https://rspec.info/features/8-0/rspec-rails/Getting-started/)

### Models

```rb
# spec/models/*.rb
describe MyModel do
end
```
<!-- {: data-highlight="describe MyModel"} -->

See: [Model specs](https://rspec.info/features/8-0/rspec-rails/model-specs/)

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
      expect(response).to be_successful
      expect(response).to have_http_status(200)
      expect(response).to render_template("index")
      expect(response).to redirect_to '/..'

      expect(assigns :article).to eq article

      response.status
    end
  end
end
```
<!-- {: data-highlight="render_views"} -->

See: [Controller specs](https://rspec.info/features/8-0/rspec-rails/controller-specs/)

### Request

```rb
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
<!-- {: data-highlight="follow_redirect!"} -->

See: [Request specs](https://rspec.info/features/8-0/rspec-rails/request-specs/)

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
<!-- {: data-highlight="route_to"} -->

See: [Routing specs](https://rspec.info/features/8-0/rspec-rails/routing-specs/)

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
<!-- {: data-highlight="helper.link_to_event"} -->

See: [Helper specs](https://rspec.info/features/8-0/rspec-rails/helper-specs/)

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
<!-- {: data-highlight="feature 'Signing in'"} -->

See: [Feature specs](https://rspec.info/features/8-0/rspec-rails/feature-specs/)

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

See: [Matchers](https://rspec.info/features/8-0/rspec-rails/matchers/)

### Time helpers

```
travel_to Time.new(2014, 11, 14, 01, 04, 44)
...
travel_back

travel_to Time.new(2014, 11, 14, 01, 04, 44) do
  ...
end
```
<!-- {: data-highlight="travel_to; travel_back"} -->

See: [ActiveSupport::Testing::TimeHelpers](https://api.rubyonrails.org/classes/ActiveSupport/Testing/TimeHelpers.html)
