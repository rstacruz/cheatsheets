---
title: Rails form helpers
subtitle: Form builder field reference
category: Rails
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-24
---

## Form builder

### `form_with`

```haml
= form_with model: @post do |f|
```

Field names are prefixed with `post` (the model's param key), and values come from the object: `f.text_field :name` reads `@post.name`.

### Options

```haml
= form_with model: @post, url: posts_path do |f|
```

Pass `url:` when there is no model, or to override the generated action; other options become HTML attributes.

## Fields

### Text

```rb
f.text_field :title
f.text_area :body, size: "60x12"
```

### Checkbox

```rb
f.check_box :remember_me
f.label :remember_me, "Remember me"
```

### Radio

```rb
f.radio_button :gender, "male"
f.label :gender_male, "Male"

f.radio_button :gender, "female"
f.label :gender_female, "Female"
```

### Label

```rb
f.label :title
f.label :title, "Title"
f.label :title, "Title", class: "title"
f.label(:terms) { "Accept terms" }
```

### Submit button

```rb
f.submit "Create"
```

### Hidden fields

```rb
f.hidden_field :id
```

## Choices

### Fields for

```haml
= form_with model: @post do |f|
  = f.fields_for :author do |ff|
    = ff.text_field :name
```

Nested fields need `accepts_nested_attributes_for` on the model.

### Select dropdowns

#### With selected value

```rb
f.select :city_id, [["Lisbon", 1], ["Madrid", 2]], selected: 2
```

#### Option tags

```rb
options_for_select [["Lisbon", 1], ["Madrid", 2]], 2
```

`options_for_select` builds the `<option>` tags; its second argument pre-selects.

### Collections

```rb
f.collection_select :city_id, City.all, :id, :name
f.collection_radio_buttons :author_id, Author.all, :id, :name
```

Arguments are field, collection, value method, and label method.

### Date and time selects

```rb
f.time_zone_select :time_zone
f.date_select :birthday
```

## Details

### The model

```ruby
f.object
```

### Outside `f`

```rb
radio_button("post", "category", "rails")
radio_button("post", "category", "java")
```

Both buttons post to `post[category]`; the one matching `@post.category` renders checked.

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

### Reference

```rb
select(method, choices = nil, options = {}, html_options = {}, &block)
submit(value = nil, options = {})
```
