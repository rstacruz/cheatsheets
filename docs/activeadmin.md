---
title: ActiveAdmin
category: Ruby
layout: 2017/sheet
---

### Listing scopes

Allows you to filter listings by a certain scope.
{: .-setup}

```ruby
scope :draft
scope :for_approval
```

```ruby
scope :public, if: ->{ current_admin_user.can?(...) }
scope "Unapproved", :pending
scope("Published") { |books| books.where(:published: true) }
```

### Sidebar filters

```ruby
filter :email
filter :username
```

### Custom actions

You can define custom actions for models.
{: .-setup}

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

### Columns

```ruby
column :foo
```

```ruby
column :title, sortable: :name do |post|
  strong post.title
end
```

### Other helpers

```ruby
status_tag "Done"           # Gray
status_tag "Finished", :ok  # Green
status_tag "You", :warn     # Orange
status_tag "Failed", :error # Red
```

### Disabling 'new post'

```ruby
ActiveAdmin.register Post do
  actions :index, :edit
  # or: config.clear_action_items!
end
```
