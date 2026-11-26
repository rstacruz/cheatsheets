---
title: Rails plugins
subtitle: Engine plugin authoring
category: Rails
intro: |
  Rails plugins extend the framework through gems and engines.
links:
  - title: Rails plugins guide
    url: https://guides.rubyonrails.org/plugins.html
  - title: Generators guide
    url: https://guides.rubyonrails.org/generators.html
tier: t3
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-26
---

### Generate a plugin

```sh
rails plugin new myplugin --skip-bundle --full
```
<!-- {: data-highlight="rails plugin new"} -->

Generates a Rails Engine plugin.

See: [Generate the plugin](https://guides.rubyonrails.org/plugins.html#generate-the-plugin)

Initializers
------------

### Initializers

 * [Rails::Railtie](https://api.rubyonrails.org/classes/Rails/Railtie.html)
 * [Railtie initializers](https://api.rubyonrails.org/classes/Rails/Railtie.html#class-rails-railtie-initializers)

See: [Advanced integration using Railties](https://guides.rubyonrails.org/plugins.html#advanced-integration-using-railties)

### Initializer method

```ruby
module NewPlugin
  class Railtie < Rails::Railtie
    initializer "newplugin.initialize" do |app|
      # Subscribe to Rails notifications: controllers, AR, etc.
      ActiveSupport::Notifications.subscribe do |*args|
        event = ActiveSupport::Notifications::Event.new(*args)
        puts "Got notification: #{event.inspect}"
      end
    end
  end
end
```
<!-- {: data-highlight="initializer"} -->

Subclass Railtie and provide an `initializer` method.

See: [Notifications subscribers](https://api.rubyonrails.org/classes/ActiveSupport/Notifications.html#module-activesupport-notifications-subscribers)

Custom routes
-------------

### Custom routes

 * [ActionDispatch::Routing::Mapper](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper.html)

See: [Customizing resourceful routes](https://guides.rubyonrails.org/routing.html#customizing-resourceful-routes)

### Creating routes

#### routes.rb

```ruby
# myplugin_for x
class ActionDispatch::Routing
  class Mapper
    def myplugin_for(*x)
    end
  end
end
```

#### Route with a block

```ruby
# authenticated do
#   resources :users
# end
def authenticated
  constraint = lambda { |request| request... }

  constraints(constraint) { yield }
end
```

Create custom `routes.rb` keywords by extending the mapper.

See: [Customizing resourceful routes](https://guides.rubyonrails.org/routing.html#customizing-resourceful-routes)

Custom generators
-----------------

### Custom generators

 * [Guides: generators](https://guides.rubyonrails.org/generators.html)
 * [Rails::Generators::Base](https://api.rubyonrails.org/classes/Rails/Generators/Base.html)

See: [Rails generators guide](https://guides.rubyonrails.org/generators.html)

### Basic

```
# rails g initializer
```

#### lib/generators/initializer_generator.rb

```
class InitializerGenerator < Rails::Generators::Base
  def create_initializer_file
    create_file "config/initializers/initializer.rb", \
      "# Add initialization content here"
  end
end
```
<!-- {: data-highlight="create_file"} -->

 * Extend `Rails::Generators::Base`.
 * Each public method in the generator is executed when invoked.

See: [Rails::Generators::Base](https://api.rubyonrails.org/classes/Rails/Generators/Base.html)

### Generating a generator

```
$ rails generate generator initializer
```

See: [Creating generators by using a generator](https://guides.rubyonrails.org/generators.html#creating-generators-by-using-a-generator)

### NamedBase

```ruby
class InitializerGenerator < Rails::Generators::NamedBase
  def lol
    puts file_name
  end
end
```
<!-- {: data-highlight="file_name"} -->

Use `NamedBase` to take an argument available as `file_name`.

See: [Rails::Generators::NamedBase](https://api.rubyonrails.org/classes/Rails/Generators/NamedBase.html)

### More

```ruby
class InitializerGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates", __FILE__)
  desc "Description goes here."
end
```
<!-- {: data-highlight="source_root"} -->

See: [Rails::Generators::Base API](https://api.rubyonrails.org/classes/Rails/Generators/Base.html)

### Generators lookup

#### rails g XXX

```sh
[rails/]generators/XXX/XXX_generator.rb
[rails/]generators/XXX_generator.rb
```

#### rails g XXX:YYY

```sh
[rails/]generators/XXX/YYY_generator.rb
```

Lookup paths for `rails g XXX` and `rails g XXX:YYY`.

See: [Generator resolution](https://guides.rubyonrails.org/generators.html#generator-resolution)

ActiveModel 'acts as'
---------------------

### acts as

#### yaffle/lib/yaffle/acts_as_yaffle.rb

```
module Yaffle
  module ActsAsYaffle
    extend ActiveSupport::Concern

    included do
    end

    module ClassMethods
      def acts_as_yaffle(options = {})
        # your code will go here
      end
    end
  end
end

ActiveRecord::Base.send :include, Yaffle::ActsAsYaffle
```

See: [Add an acts-as method to Active Record](https://guides.rubyonrails.org/plugins.html#add-an-acts-as-method-to-active-record)

