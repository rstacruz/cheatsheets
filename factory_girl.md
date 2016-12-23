---
title: FactoryGirl
category: Ruby libraries
layout: default-ad
---

## Factories

    FactoryGirl.define do
      factory :user do
        first_name 'John'
        last_name  'Doe'
        birthdate  { 21.years.ago }
        admin false

        sequence(:username) { |n| "user#{n}" }
      end
    end

    # Also available:
    factory :user, class: 'User'
    factory :user, aliases: [:author]

## Using

    FactoryGirl.build(:user)

    build(:user)          # not saved
    create(:user)         # saved
    attributes_for(:user) # hash
    build_stubbed(:user)  # stubbed out attributes

    build(:user, name: 'John')

    create_list(:user, 3)
    build_list(:user, 3)

## Associations

    factory :post do
      association :author, factory: :user
      association :author, factory: [:user, :admin]

      author  # assumes there's a factory :author
    end

### After-create hooks

    factory :post do
      after :create do |post|
        create :theme, post: post             # has_one
        create_list :comment, 3, post: post   # has_many
      end
    end

## Traits

    factory :user do
      trait :admin do
        admin true
      end
    end

    create :user, :admin

## Nested factories

    factory :user do
      first_name 'John'

      factory :sample_user do
        first_name { FFaker::Name.first_name }
      end
    end

    # create :sample_user

    # Also: factory :sample_user, parent: :user

## Options (transients)

    factory :user do
      transient do
        upcased true
      end

      after :create do |user, options|
        user.name.upcase! if options.upcased
      end
    end

    create(user, upcased: true)

## Paths

    test/factories.rb
    spec/factories.rb
    test/factories/*.rb
    spec/factories/*.rb

## See also

* <http://rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md>
