---
title: Rails form helpers
layout: default
---

### Forms

    # Model:
    form_for @post do |f|

    form_for @post,
      url: { method: 'put', action: 'create' },
      html: { class: 'nifty_form' } do |f|

      f.label :first_name
      f.text_field :first_name

      field :multiselect, f, :first_name

### Stuff

    f.object

### Fields for

    = form_for @post do |f|
      = fields_for :author, @post.author do |ff|
        = ff.text_field :name

### Fields

    f.check_box :is_admin
    f.text_field :title
    f.text_area :body,
      size: '60x12'

    f.label :post, :title
    f.label :post, :title, "Title"
    f.label :post, :title, "Title", class: "title"
    f.label(:post, :terms) { "Accept terms" }
    #=> <label for="post_title">Title</labele>

    radio_button("post", "category", "rails")
    radio_button("post", "category", "java")
    #=> <input type="radio" id="post_category_rails" name="post[category]"
    #   value="rails" checked="checked" />

### Select dropdowns

    f.time_zone_select :time_zone
    f.date_select :birthday

    f.select :city_id, [['Lisbon',1], ['Madrid',2], ...], 4   # (4 = selected)

    f.collection_select :city_id, City.all, :id, :name

    options_for_select [['Lisbon',1], ['Madrid', 2], ...], 4  # Just makes <option> tags

### The rest

    f.submit "Create"
    f.hidden_field

### I18n

    helpers.submit.create = "Create a %{model}"
    helpers.submit.update = "Confirm changes to %{model}"

    helpers.submit.article.create = "Publish article"
    helpers.submit.article.update = "Update article"

    helpers.label.post.body = "Write your body text here"

