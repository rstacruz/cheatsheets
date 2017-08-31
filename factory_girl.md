---
title: Factory Girl
category: Ruby libraries
layout: 2017/sheet
weight: -3
updated: 2017-09-01
---

## Factories
{: .-three-column}

### Defining factories

```ruby
FactoryGirl.define do
  factory :user do
    first_name 'John'
    last_name  'Doe'
    birthdate  { 21.years.ago }
    admin false

    sequence(:username) { |n| "user#{n}" }
  end
end
```
{: data-line="2"}

See: [Defining factories](http://www.rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md#Defining_factories)

### Extra options

```ruby
# Custom class names
factory :user, class: 'User' do
  ···
end
```

```ruby
# Aliases
factory :user, aliases: [:author] do
  ···
end
```

### Using

```ruby
FactoryGirl.build(:user)
```

```ruby
build(:user)           # not saved
create(:user)          # saved
attributes_for(:user)  # hash
build_stubbed(:user)   # stubbed out attributes
```

```ruby
# With options:
build(:user, name: 'John')
```

```ruby
# List:
create_list(:user, 3)
build_list(:user, 3)
```

## Associations

### Defining

```ruby
factory :post do
  association :author, factory: :user
  association :author, factory: [:user, :admin]
end
```
{: data-line="2,3"}

or:

```ruby
factory :post do
  author  # assumes there's a factory :author
end
```

### After-create hooks

```ruby
factory :post do
  after :create do |post|
    create :theme, post: post             # has_one
    create_list :comment, 3, post: post   # has_many
  end
end
```
{: data-line="2"}

## Other features
{: .-three-column}

### Traits

```ruby
factory :user do
  trait :admin do
    admin true
  end
end
```
{: data-line="2,3,4"}

```ruby
create :user, :admin
```

Traits allow you to group attributes together.
See: [Traits](http://www.rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md#Traits)

### Nested factories

```ruby
factory :user do
  first_name 'John'

  factory :sample_user do
    first_name { FFaker::Name.first_name }
  end
end
```
{: data-line="4,5,6"}

```ruby
create :sample_user
```

See: [Inheritance](http://www.rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md#Inheritance)

### Sub-factories

```ruby
factory :user do
  ···
end
```

```ruby
factory :sample_user, parent: :user do
  first_name { FFaker::Name.first_name }
end
```
{: data-line="1"}

```ruby
create :sample_user
```

Works the same as nested factories.

### Options (transients)

```ruby
factory :user do
  transient do
    upcased true
  end

  after :create do |user, options|
    user.name.upcase! if options.upcased
  end
end
```
{: data-line="2,3,4"}

```ruby
create(user, upcased: true)
```

Transient attributes will not get passed to the model, but will be available in after-create hooks.
See: [Transient attributes](http://www.rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md#Transient_Attributes)

### Paths

* test/factories.rb
* spec/factories.rb
* test/factories/*.rb
* spec/factories/*.rb

Place your factories in these locations.
{: .-setup}

## See also
{: .-one-column}

* <http://rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md>
