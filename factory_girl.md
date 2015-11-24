---
title: FactoryGirl
category: Ruby libraries
---

### Paths

    test/factories.rb
    spec/factories.rb
    test/factories/*.rb
    spec/factories/*.rb

### Factories

    FactoryGirl.define do
      factory :user do
        first_name "John"
        last_name  "Doe"
        birthdate  { 21.years.ago }
        admin false

        profile   # assuming there's a factory :profile
      end
    end

### Using

    FactoryGirl.build(:user)

    build(:user)          # not saved
    create(:user)         # saved
    attributes_for(:user) # hash
    build_stubbed(:user)  # stubbed out attributes

    build(:user, name: "John")

    create_list(:user, 3)
    build_list(:user, 3)

### Associations

    factory :post do
      after :create do |post|
        create :theme, post: post             # has_one
        create_list :comment, 3, post: post   # has_many
      end
    end

### Ignores

    factory :user do
      ignore do
        likes 30
      end

      after :create do |user, options|
        create_list :like, options.likes, user: user
      end
    end

    create(:user, likes: 10)

### Traits

    factory :user do
      trait :admin do
        admin true
      end
    end

    create :user, :admin

### Etc

      # Sequences
      sequence(:username) { |n| "user#{n}" }

      # Associations
      association :author
      association :author, factory: user, last_name: "Ho"
      author

      after :create do |user, evaluator| ... end
      after :build
    end

    factory :user, aliases: [:author, :commenter] do ... end
    factory :admin_user, parent: :user do .. end

