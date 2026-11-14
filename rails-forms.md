---
title: Rails form helpers
category: Rails
---

## Form builder

### Form builder

```haml
- form_for @post do |f|
```

Field names will be prefixed with `post` (the class name), and values will be derived from this object (eg, `f.text_field :name` from `@post.name`).

### Options

```haml
- form_for @post, |
  url: { method: 'put', action: 'create' }, |
  html: { class: 'nifty_form' } |
  do |f|
```

## Fields

### Text

```rb
f.text_field :title
f.text_area :body, size: '60x12'
```

### Checkbox

```rb
f.check_box :remember_me
f.label :remember_me, "Remember me"
```

### Radio

```rb
f.radio_button :gender, 'male'
f.label :gender_male, "Male"

f.radio_button :gender, 'female'
f.label :gender_female, "Female"
```

### Label

```rb
f.label :title
f.label :title, "Title"
f.label :title, "Title", class: "title"
f.label(:post, :terms) { "Accept terms" }
```

### Submit button

```rb
f.submit "Create"
```

### Hidden fields

```rb
f.hidden_field :id
```

## Misc

### The model

```ruby
f.object
```

### Fields for

```haml
= form_for @post do |f|
  = fields_for :author, @post.author do |ff|
    = ff.text_field :name
```

### Select dropdowns

```rb
f.select :city_id, [['Lisbon',1], ['Madrid',2], ...], 4
# (4 = selected)

options_for_select [['Lisbon',1], ['Madrid',2], ...], 4
# Just makes <option> tags
```

### Collections

```
f.collection_radio_buttons :author_id, Author.all, :id, :name_with_initial
f.collection_select :city_id, City.all, :id, :name
# (field, collection, value_key, label_key)
```

### Time select

```rb
f.time_zone_select :time_zone
f.date_select :birthday
```
### I18n

```yaml
helpers:
  submit:
    # helpers.submit.<action>
    create: "Create a %{model}"
    update: "Confirm changes to %{model}"

    # helpers.submit.<model>.<action>
    article:
      create: "Publish article"
      update: "Update article"

  # helpers.label.<model>.<field>
  label:
    post:
      body: "Your body text"
```

### Outside `f`

```rb
radio_button("post", "category", "rails")
radio_button("post", "category", "java")

# picks from @post.category
# <input type="radio" id="post_category_rails" name="post[category]"
#  value="rails" checked="checked" />
```

### Reference

```rb
select(method, choices = nil, options = {}, html_options = {}, &block)
  choices == [ ['label', id], ... ]

submit(value=nil, options={})
```

