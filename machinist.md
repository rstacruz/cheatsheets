---
title: Machinist
category: Ruby libraries
tags: [Archived]
archived: Machinist has not been in active development since 2013.
---

### About

Machinist is a fixture management library for Ruby.

- <https://github.com/notahat/machinist>

### Installing

    # Gemfile
    gem 'machinist', '>= 2.0.0.beta2', group: 'test'

    # ~$ bundle
    # ~$ rails generate machinist:install

### Building objects

    User.make

    # `make` builds it, and `make!` builds+saves it
    User.make!
    User.make! name: "David"
    User.make!(:admin)

### Defining blueprints

    User.blueprint do
      name  { "User #{sn}" }
      email { "user-#{sn}@example.com" }
    end

    User.blueprint(:admin) do
      name  { "Admin User #{sn}" }
      admin { true }
    end

### Associations

    Post.blueprint do
      author { User.make }

      comments(3)    # Makes 3 comments (has_many / habtm)

      author         # autodetect (Assumes there's User.blueprint)

    end

### References

 * [https://github.com/notahat/machinist](https://github.com/notahat/machinist)
