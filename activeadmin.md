title: ActiveAdmin
category: Ruby
---

### Listing scopes

Allows you to filter listings by a certain scope.

    scope :draft
    scope :for_approval

    scope :public, if: ->{ current_admin_user.can?(...) }
    scope "Unapproved", :pending
    scope("Published") { |books| books.where(:published: true) }

### Sidebar filters

    filter :email
    filter :username

### Custom actions

You can define custom actions for models.

    before_filter only: [:show, :edit, :publish] do
      @post = Post.find(params[:id])
    end

Make the route:

    member_action :publish, method: :put do
      @post.publish!
      redirect_to admin_posts_path, notice: "The post '#{@post}' has been published!"
    end

Link it in the index:

    index do
      column do |post|
        link_to 'Publish', publish_admin_post_path(post), method: :put
      end
    end

And link it in show/edit:

    action_item only: [:edit, :show] do
      @post = Post.find(params[:id])
      link_to 'Publish', publish_admin_post_path(post), method: :put
    end

### Columns

    column :foo

    column :title, sortable: :name do |post|
      strong post.title
    end

### Other helpers

    # Grey, green, orange, red
    status_tag "Done"
    status_tag "Finished", :ok
    status_tag "You", :warn
    status_tag "Failed", :error

### Disabling 'new post'

    ActiveAdmin.register Post do
      actions :index, :edit
      # or: config.clear_action_items!
    end
