---
title: Simple Form(Devise) helpers
hljs_languages: [haml]
category: Rails
---

[Blog Plataformatech](http://simple-form.plataformatec.com.br/)

## Form builder

```haml
= simple_form_for @post do |f|
```

Field names will be prefixed with `post` (the class name), and values will be derived from this object (eg, `f.text_field :name` from `@post.name`).

### Options

```haml
= simple_form_form_for @post, 
  url: { method: 'put', action: 'create' }, |
  html: { class: 'nifty_form' } |
  do |f|
```

## Fields

### Text

```rb
  =f.input :title
  =f.input :view_details, as: :text
```

### Numeric

```rb
  = f.input :numeric_value, as: :integer, required: true, input_html: { value: 10 } #input_hml = default value
```

### Checkbox

```rb
= f.label :remember_me, "Remember me"
= f.input :remember_me, :as => :boolean, :label => false, :inline_label => true if devise_mapping.rememberable?
= f.input_field :name
= f.input_field :remember_me, as: :boolean, boolean_style: :inline

To use this with associations in your model, you can do the following:
form_for @user do |f|
  f.collection_check_boxes :role_ids, Role.all, :id, :name # using :roles here is not going to work.
end
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
f.label :username %>
f.input_field :username %>
f.hint 'No special characters, please!' 
f.error :username, id: 'user_name_error' 
f.full_error :token 
```

### Submit button

```rb
f.button :submit, "Create", class: 'buton primary'
= link_to t(:cancel), taxpayers_path, class: 'btn btn-default button'
= link_to t(:destroy), @my_model, :method => :delete, :data => { :confirm => t(:destroy_are_you_sure)}, class: 'button negative'

= f.button :button, "Custom Button Text"

= f.button :button do
  Custom Button Text

```

### Hidden fields

```rb
f.input :id, as: :hidden
```

## Misc

### The model

```ruby
f.object
```

### Fields for

```haml
= form_for @user do |f|
  = f.simple_fields_for :posts do |ff|
    # Here you have all simple_form methods available
    = ff.input :name
```

### Select dropdowns

```rb
f.select :city_id, [['Lisbon',1], ['Madrid',2], ...], 4
# (4 = selected)

options_for_select [['Lisbon',1], ['Madrid',2], ...], 4
# Just makes <option> tags

= f.input :role do
  f.select :role, Role.all.map { |r| [r.name, r.id, { class: r.company.id }] }, include_blank: true 

```

### Collections

```
= f.input :age, collection: 18..60
= f.input :country_id, collection: @continents, as: :grouped_select, group_method: :countries
f.collection_radio_buttons :author_id, Author.all, :id, :name_with_initial
f.collection_select :city_id, City.all, :id, :name
# (field, collection, value_key, label_key)
```

### Associations

```
class User < ActiveRecord::Base
  belongs_to :company
  has_and_belongs_to_many :roles
end

class Company < ActiveRecord::Base
  has_many :users
end

class Role < ActiveRecord::Base
  has_and_belongs_to_many :users
end

= simple_form_for @user do |f|
  = f.input :name 
  = f.association :company 
  = f.association :roles 
  = f.button :submit
  
:select input with :multiple option for the :roles. You can, of course, change it to use radio
buttons and checkboxes as well:

= f.association :company, as: :radio_buttons
= f.association :roles,   as: :check_boxes

Additionally, you can specify the collection by hand, all together with the prompt:
= f.association :company, collection: Company.active.order(:name), prompt: "Choose a Company"

In case you want to declare different labels and values:
= f.association :company, label_method: :company_name, value_method: :id, include_blank: false
```

### Time select

```rb
f.time_zone_select :time_zone
f.date_select :birthday
```
### I18n

**Be sure to check our locale file or the one copied to your application after you run
rails generate simple_form:install.**

```yaml
en:
  simple_form:
    labels:
      user:
        username: 'User name'
        password: 'Password'
    hints:
      user:
        username: 'User name to sign in.'
        password: 'No special characters, please.'
    placeholders:
      user:
        username: 'Your username'
        password: '****'
    include_blanks:
      user:
        age: 'Rather not say'
    prompts:
      user:
        role: 'Select your role'
```

### Collection Helpers translation
```
= f.input :role, collection: [:admin, :editor]

en:
  simple_form:
    options:
      user:
        role:
          admin: 'Administrator'
          editor: 'Editor'
```
### Tranlsate Buttons

```
en:
  helpers:
    submit:
      user:
        create: "Add %{model}"
        update: "Save Changes"
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


