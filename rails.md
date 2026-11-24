---
title: Rails
subtitle: Web framework for Ruby
category: Rails
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-24
---

## Helpers

### Controller helpers

```ruby
class ApplicationController < ActionController::Base
  helper_method :logged_in?

  def logged_in?
    session[:user_id].present?
  end
end
```

### Asset tags

```erb
<%= stylesheet_link_tag "application" %>
<%= javascript_include_tag "application" %>
```

Both tags need Propshaft or Sprockets; importmap apps use `javascript_importmap_tags` instead.

### Forms

```erb
<%= form_with model: @person do |f| %>
  <%= f.label :first_name %>
  <%= f.label :first_name, "First name" %>
  <%= f.text_field :first_name %>

  <%= f.fields_for :permission do |fields| %>
    <%= fields.check_box :admin %>
  <% end %>

  <%= f.submit %>
<% end %>
```

Also: `check_box`, `color_field`, `date_field`, `email_field`, `file_field`, `hidden_field`, `number_field`, `password_field`, `radio_button`, `range_field`, `search_field`, `telephone_field`, `text_area`, `text_field`, `time_field`, `url_field`.

## Controllers

### Controller layout

```ruby
class ProjectsController < ApplicationController
  layout "project"   # defaults to the controller name, "projects"

  def index
    @projects = Project.all
  end
end
```

### Before actions

```ruby
class ApplicationController < ActionController::Base
  before_action :require_login
  before_action :validate, only: %i[save edit]
  before_action :ensure_auth, except: [:logout]

  private

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to new_login_url # halts the request cycle
    end
  end
end
```

### Default URL options

```ruby
class ApplicationController < ActionController::Base
  def default_url_options
    { locale: I18n.locale }
  end
end
```

### Session, flash, params

```ruby
session[:what]
flash[:notice] = "Your session expired"
params[:id]
```

### Respond to formats

```ruby
class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.xml  { render xml: @users }
      format.json { render json: @users }
    end
  end
end
```

## Responses

### Redirect

```ruby
redirect_to entry_path(@entry)
redirect_to root_url, notice: "Saved."
```

### Render

```ruby
render plain: "Hello"
render template: "products/show"
render action: "something"
render status: 500
render status: :forbidden
render layout: "special_layout"
render layout: false
render json: object
render xml: object
render location: photo_url(photo)
```

`render action:` renders that template without running the action; `render nothing:` and `render text:` were removed in Rails 5.1.

### Head-only responses

```ruby
head :bad_request
head :created, location: photo_path(@photo)
```

## Layouts

### Named yields

#### app/views/layouts/application.html.erb

```erb
<html>
  <head>
    <%= yield :head %>
  </head>
  <body>
    <%= content_for?(:content) ? yield(:content) : yield %>
  </body>
</html>
```

#### app/views/posts/show.html.erb

```erb
<% content_for :head do %>
  <title><%= @post.title %></title>
<% end %>
<p>Hello, Rails!</p>
```

### Nested layouts

#### app/views/layouts/news.html.erb

```erb
<% content_for :content do %>
  <div id="right_menu">Right menu</div>
  <%= yield %>
<% end %>
<%= render template: "layouts/application" %>
```

## Reference

- [ActionView::Helpers](https://api.rubyonrails.org/classes/ActionView/Helpers.html)
- [ActionController::Base](https://api.rubyonrails.org/classes/ActionController/Base.html)
