---
title: ActiveAdmin
subtitle: Rails admin interface framework
category: Ruby
last_verified_with: "ActiveAdmin 3.5."
updated: 2026-11-25
tier: t3
---

### Listing scopes

Allows you to filter listings by a certain scope.

<!-- {: .-setup} -->

```ruby
scope :draft
scope :for_approval
```

```ruby
scope :public, if: ->{ current_admin_user.can?(...) }
scope "Unapproved", :pending
scope("Published") { |books| books.where(:published: true) }
```

See: [Index scopes](https://activeadmin.info/docs/v3/3-index-pages.html#index-scopes)

### Sidebar filters

```ruby
filter :email
filter :username
```

See: [Index filters](https://activeadmin.info/docs/v3/3-index-pages.html#index-filters)

### Custom actions

You can define custom actions for models.

<!-- {: .-setup} -->

```ruby
before_filter only: [:show, :edit, :publish] do
  @post = Post.find(params[:id])
end
```

#### Make the route

```ruby
member_action :publish, method: :put do
  @post.publish!
  redirect_to admin_posts_path, notice: "The post '#{@post}' has been published!"
end
```

#### Link it in the index

```ruby
index do
  column do |post|
    link_to 'Publish', publish_admin_post_path(post), method: :put
  end
end
```

#### And link it in show/edit

```ruby
action_item only: [:edit, :show] do
  @post = Post.find(params[:id])
  link_to 'Publish', publish_admin_post_path(post), method: :put
end
```

See: [Member actions](https://activeadmin.info/docs/v3/8-custom-actions.html#member-actions)

### Columns

```ruby
column :foo
```

```ruby
column :title, sortable: :name do |post|
  strong post.title
end
```

See: [Customizing the index page](https://activeadmin.info/docs/v3/3-index-pages.html#customizing-the-index-page)

### Other helpers

```ruby
status_tag "Done"           # Gray
status_tag "Finished", :ok  # Green
status_tag "You", :warn     # Orange
status_tag "Failed", :error # Red
```

See: [Status tag](https://activeadmin.info/docs/v3/12-arbre-components.html#status-tag)

### Disabling 'new post'

```ruby
ActiveAdmin.register Post do
  actions :index, :edit
  # or: config.clear_action_items!
end
```

See: [Disabling actions](https://activeadmin.info/docs/v3/2-resource-customization.html#disabling-actions-on-a-resource)
