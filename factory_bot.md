---
title: Factory Bot
seo_title: Factory Bot cheatsheet — associations, traits
description: "Factory Bot factories: define associations, traits, hooks and sequences. Reference."
subtitle: Ruby test data factory library
logo: { set: icon-park-outline, name: box }
category: Ruby libraries
weight: -3
last_verified_with: "factory_bot 6.6."
updated: 2026-11-25
tier: t3
keywords:
  - "FactoryBot.define do"
  - "factory :user"
  - "first_name 'John'"
  - "sequence(:username) { |n| \"user#{n}\" }"
intro: |
  [Factory Bot](http://www.rubydoc.info/gems/factory_bot/) is a helper for writing factories for Ruby tests. It was previously known as Factory Girl. For older versions, use `FactoryGirl` instead of `FactoryBot`.
links:
  - title: Factory Bot documentation
    url: http://www.rubydoc.info/gems/factory_bot/
  - title: Getting started
    url: https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md
  - title: Source code
    url: https://github.com/thoughtbot/factory_bot
---

## Factories

<!-- {: .-three-column} -->

### Defining factories

```ruby
FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name  { 'Doe' }
    birthdate  { 21.years.ago }
    admin { false }

    sequence(:username) { |n| "user#{n}" }
  end
end
```

<!-- {: data-highlight="factory"} -->

See: [Defining factories](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Defining_factories)

### Extra options

#### Custom class names

```ruby
factory :user, class: 'User' do
  ···
end
```

#### Aliases

```ruby
factory :user, aliases: [:author] do
  ···
end
```

See: [Aliases](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Aliases)

### Using

#### Build a model

```ruby
FactoryBot.build(:user)
```

#### Other ways

```ruby
build(:user)           # → unsaved model
create(:user)          # → model (saved)
attributes_for(:user)  # → hash
build_stubbed(:user)   # stubbed attrs
```

#### With options

```ruby
build(:user, name: 'John')
```

#### Lists

```ruby
create_list(:user, 3)
build_list(:user, 3)
```

See: [Build strategies](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Build_strategies)

## Associations

### Defining

```ruby
factory :post do
  association :author, factory: :user
  association :author, factory: [:user, :admin]
end
```

<!-- {: data-highlight="association"} -->

#### or

```ruby
factory :post do
  author  # assumes there's a factory :author
end
```

See: [Associations](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Associations)

### After-create hooks

```ruby
factory :post do
  after :create do |post|
    create :theme, post: post             # has_one
    create_list :comment, 3, post: post   # has_many
  end
end
```

<!-- {: data-highlight="create"} -->

See: [Callbacks](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Callbacks)

## Other features

<!-- {: .-three-column} -->

### Traits

```ruby
factory :user do
  trait :admin do
    admin { true }
  end
end
```

<!-- {: data-highlight="trait"} -->

#### Use a trait

```ruby
create :user, :admin
```

Traits allow you to group attributes together.
See: [Traits](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Traits)

### Nested factories

```ruby
factory :user do
  first_name { 'John' }

  factory :sample_user do
    first_name { FFaker::Name.first_name }
  end
end
```

<!-- {: data-highlight="::"} -->

#### Create the factory

```ruby
create :sample_user
```

See: [Inheritance](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Inheritance)

### Sub-factories

```ruby
factory :user do
  ···
end
```

#### Define the child

```ruby
factory :sample_user, parent: :user do
  first_name { FFaker::Name.first_name }
end
```

<!-- {: data-highlight=":sample_user"} -->

#### Create

```ruby
create :sample_user
```

Works the same as nested factories.

See: [Assigning parent explicitly](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Assigning_parent_explicitly)

### Options (transients)

```ruby
factory :user do
  transient do
    upcased { true }
  end

  after :create do |user, options|
    user.name.upcase! if options.upcased
  end
end
```

<!-- {: data-highlight="transient"} -->

#### Pass an option

```ruby
create(user, upcased: true)
```

Transient attributes will not get passed to the model, but will be available in after-create hooks.
See: [Transient attributes](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Transient_Attributes)

### Paths

* test/factories.rb
* spec/factories.rb
* test/factories/*.rb
* spec/factories/*.rb

Place your factories in these locations.

See: [Definition file paths](http://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#Definition_file_paths)

## See also

<!-- {: .-one-column} -->

* <http://rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md>
