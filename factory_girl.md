---
title: FactoryGirl
layout: default
---

### Paths

    test/factories.rb
    spec/factories.rb
    test/factories/*.rb
    spec/factories/*.rb

### Defining stuff

    FactoryGirl.define do
      factory ...
    end

### Factories

    # This will guess the User class
    factory :user do
      first_name "John"
      last_name  { %w[Doe Smith Doyle].shuffle }
      admin false

      # Sequences
      sequence(:username) { |n| "user#{n}" }

      # Associations
      association :author
      association :author, factory: user, last_name: "Ho"
      author

      # Traits
      trait :admin do
        admin true
      end

      after :create do |user, evaluator| ... end
      after :build
    end

    factory :user, aliases: [:author, :commenter] do ... end
    factory :admin_user, parent: :user do .. end

### Using

    FactoryGirl.build(:user)

    build(:user)          # not saved
    create(:user)         # saved
    attributes_for(:user) # hash
    build_stubbed(:user)  # stubbed out attributes

    build(:user, name: "John")

    create_list(:user, 3)
    build_list(:user, 3)

