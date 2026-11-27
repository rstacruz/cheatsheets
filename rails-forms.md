---
title: Rails form helpers
subtitle: Form builder field reference
logo: { set: icon-park-outline, name: form }
category: Rails
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-24
tier: t3
intro: |
  Rails form builder fields, select helpers, nested attributes, date selects, and form label translations.
links:
  - title: Form helpers guide
    url: https://guides.rubyonrails.org/form_helpers.html
  - title: FormHelper
    url: https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html
  - title: FormOptionsHelper
    url: https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html
---

## Form builder

### `form_with`

```haml
= form_with model: @post do |f|
```

Field names are prefixed with `post` (the model's param key), and values come from the object: `f.text_field :name` reads `@post.name`.

See: [form_with](https://guides.rubyonrails.org/form_helpers.html#creating-forms-with-model-objects)

### Options

```haml
= form_with model: @post, url: posts_path do |f|
```

Pass `url:` when there is no model, or to override the generated action; other options become HTML attributes.

See: [form_with options](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-form_with)

## Fields
<!-- {: .-three-column} -->

### Text

```rb
f.text_field :title
f.text_area :body, size: "60x12"
```

See: [text_field](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-text_field)

### Checkbox

```rb
f.check_box :remember_me
f.label :remember_me, "Remember me"
```

See: [check_box](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-check_box)

### Radio

```rb
f.radio_button :gender, "male"
f.label :gender_male, "Male"

f.radio_button :gender, "female"
f.label :gender_female, "Female"
```

See: [radio_button](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-radio_button)

### Label

```rb
f.label :title
f.label :title, "Title"
f.label :title, "Title", class: "title"
f.label(:terms) { "Accept terms" }
```

See: [label](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-label)

### Submit button

```rb
f.submit "Create"
```

See: [submit](https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-submit)

### Hidden fields

```rb
f.hidden_field :id
```

See: [hidden_field](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-hidden_field)

## Choices

### Fields for

```haml
= form_with model: @post do |f|
  = f.fields_for :author do |ff|
    = ff.text_field :name
```

Nested fields need `accepts_nested_attributes_for` on the model.

See: [fields_for](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-fields_for)

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

See: [select](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-select)

### Collections

```rb
f.collection_select :city_id, City.all, :id, :name
f.collection_radio_buttons :author_id, Author.all, :id, :name
```

Arguments are field, collection, value method, and label method.

See: [collection_select](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_select)

### Date and time selects

```rb
f.time_zone_select :time_zone
f.date_select :birthday
```

See: [date_select](https://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-date_select)

## Details

### The model

```ruby
f.object
```

See: [FormBuilder](https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html)

### Outside `f`

```rb
radio_button("post", "category", "rails")
radio_button("post", "category", "java")
```

Both buttons post to `post[category]`; the one matching `@post.category` renders checked.

See: [radio_button](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-radio_button)

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

See: [Action View translations](https://guides.rubyonrails.org/i18n.html#action-view-helper-methods)

### Reference

```rb
select(method, choices = nil, options = {}, html_options = {}, &block)
submit(value = nil, options = {})
```

See: [select](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-select)
