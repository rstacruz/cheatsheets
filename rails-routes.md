---
title: Routes
subtitle: URL routing reference
category: Rails
intro: |
  Rails routes map URLs to controller actions.
links:
  - title: Rails routing guide
    url: https://guides.rubyonrails.org/routing.html
  - title: ActionDispatch::Routing::Mapper API
    url: https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper.html
tier: t3
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-26
---

## Resources

### Multiple resources (`resources`)

```ruby
resources :photos

# PhotosController:
# index  =>    GET /photos
# new    =>    GET /photos/new
# create =>   POST /photos
# edit   =>    GET /photos/:id/edit
# update => PATCH /photos/:id
# delete => DELETE /photos/:id
#
# Helpers:
# new_photo_path
# photo_path(id)
# edit_photo_path(id)
```
<!-- {: data-highlight="resources :photos"} -->

See: [Resource routing](https://guides.rubyonrails.org/routing.html#resource-routing-the-rails-default)

### Custom actions

```ruby
resources :photos do
  member { get 'preview' }       # /photo/1/preview
  collection { get 'search' }    # /photos/search

  get 'preview', on: :member     # (..same as the first)
end
```
<!-- {: data-highlight="member; collection"} -->

See: [Adding member routes](https://guides.rubyonrails.org/routing.html#adding-member-routes)

### Options

```ruby
resources :photos,
  path_names: { new: 'brand_new' },  # /photos/brand_new
  path: 'postings',                  # /postings
  only: :index,
  # or: only: [:index, :show]
  # or: except: :show
  # or: except: [:index, :show]
  shallow: true,                     # also generate shallow routes
  shallow_path: 'secret',
  shallow_prefix: 'secret'
```

See: [Customizing resourceful routes](https://guides.rubyonrails.org/routing.html#customizing-resourceful-routes)

### Single resource (`resource`)

```ruby
resource :coder

# CodersController:
# new    =>    GET /coder/new
# create =>   POST /coder
# show   =>    GET /coder
# edit   =>    GET /coder/edit
# update => PATCH /coder
# delete => DELETE /coder
```
<!-- {: data-highlight="resource :coder"} -->

See: [Singular resources](https://guides.rubyonrails.org/routing.html#singular-resources)

## Matching (`match`)

### Match

```ruby
match 'photo/:id' => 'photos#show'  # /photo/what-is-it
match 'photo/:id', id: /[0-9]+/     # /photo/0192
match 'photo/:id' => 'photos#show', constraints: { id: /[0-9]+/ }
match 'photo/:id', via: :get
match 'photo/:id', via: [:get, :post]

match 'photo/*path' => 'photos#unknown'    # /photo/what/ever

# params[:format] == 'jpg'
match 'photos/:id' => 'photos#show', :defaults => { :format => 'jpg' }
```
<!-- {: data-highlight="match"} -->

See: [Non-resourceful routes](https://guides.rubyonrails.org/routing.html#non-resourceful-routes)

### Get/post

```ruby
get 'photo/:id' => 'photos#show'
# same as match 'photo/:id' => 'photos#show', via: :get

post 'photo/:id' => 'photos#update'
```
<!-- {: data-highlight="get; post"} -->

`get` and `post` are shortcuts for `match ... via:`.

See: [HTTP verb constraints](https://guides.rubyonrails.org/routing.html#http-verb-constraints)

### Redirection

```ruby
match '/stories' => redirect('/posts')
match '/stories/:name' => redirect('/posts/%{name}')
```
<!-- {: data-highlight="redirect"} -->

See: [Redirection](https://guides.rubyonrails.org/routing.html#redirection)

### Named

```ruby
# logout_path
match 'exit' => 'sessions#destroy', as: :logout
```
<!-- {: data-highlight="as: :logout"} -->

See: [Naming routes](https://guides.rubyonrails.org/routing.html#naming-routes)

### Constraints

```ruby
match '/', constraints: { subdomain: 'admin' }

# admin.site.com/admin/photos
namespace 'admin' do
  constraints subdomain: 'admin' do
    resources :photos
  end
end
```
<!-- {: data-highlight="constraints"} -->

See: [Request-based constraints](https://guides.rubyonrails.org/routing.html#request-based-constraints)

### Custom constraints

```ruby
class BlacklistConstraint
  def initialize
    @ips = Blacklist.retrieve_ips
  end
 
  def matches?(request)
    @ips.include?(request.remote_ip)
  end
end
 
TwitterClone::Application.routes.draw do
  match "*path" => "blacklist#index",
    :constraints => BlacklistConstraint.new
end
```
<!-- {: data-highlight="matches?"} -->

See: [Advanced constraints](https://guides.rubyonrails.org/routing.html#advanced-constraints)

### Scopes

```ruby
scope 'admin', constraints: { subdomain: 'admin' } do
  resources ...
end
```
<!-- {: data-highlight="scope"} -->

See: [Using scope](https://guides.rubyonrails.org/routing.html#using-scope)

### Rack middleware

```ruby
mount MyRackApp, at: '/app'
```
<!-- {: data-highlight="mount MyRackApp"} -->

Mount Rack apps at a path with `mount`.

See: [Routing to Rack applications](https://guides.rubyonrails.org/routing.html#routing-to-rack-applications)

### Route helpers

```ruby
projects_path   # /projects
projects_url    # http://site.com/projects
```
<!-- {: data-highlight="projects_path; projects_url"} -->

See: [Path and URL helpers](https://guides.rubyonrails.org/routing.html#path-and-url-helpers)


### Default help text

#### Priority

```ruby
# The priority is based upon order of creation:
# first created -> highest priority.
```

#### Regular route

```ruby
# Sample of regular route:
match 'products/:id' => 'catalog#view'
```

#### Dynamic segments

```ruby
# Keep in mind you can assign values other than
# :controller and :action
```

#### Named route

```ruby
# Sample of named route:
match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
```

#### Invoking named routes

```ruby
# This route can be invoked with purchase_url(:id => product.id)
```

#### Resource route

```ruby
# Sample resource route (maps HTTP verbs to controller
# actions automatically):
resources :products
```

#### Resource options

```ruby
# Sample resource route with options:
resources :products do
  member do
    get 'short'
    post 'toggle'
  end

  collection do
    get 'sold'
  end
end
```

#### Sub-resources

```ruby
# Sample resource route with sub-resources:
resources :products do
  resources :comments, :sales
  resource :seller
end
```

#### Nested sub-resources

```ruby
# Sample resource route with more complex sub-resources
resources :products do
  resources :comments
  resources :sales do
    get 'recent', :on => :collection
  end
end
```

#### Namespace

```ruby
# Sample resource route within a namespace:
namespace :admin do
  # Directs /admin/products/* to Admin::ProductsController
  # (app/controllers/admin/products_controller.rb)
  resources :products
end
```

#### Root route

```ruby
# You can have the root of your site routed with "root"
# just remember to delete public/index.html.
root :to => 'welcome#index'
```

#### Inspecting routes

```ruby
# See how all your routes lay out with "rake routes"
```


See: [Rails routing guide](https://guides.rubyonrails.org/routing.html)

### References

 * [Guides: Routing](https://guides.rubyonrails.org/routing.html)

 * [ActionDispatch::Routing::Mapper](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper.html)
(See included modules)

See: [ActionDispatch::Routing::Mapper](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper.html)

