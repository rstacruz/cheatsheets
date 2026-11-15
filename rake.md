---
title: Rake
category: Ruby
---

### Basic syntax

```rb
namespace :foo do
  desc "Description"
  task :bar do
    ...
  end

  task :baz => :dependency do
  end

  task :baz => [:dep1, :dep2, :dep3] do
  end
end

# rake foo:bar
```

### Rake task with arguments

```rb
desc "Do something"
task :workit, [:id] => :environment do |_, args|
  id = args[:id]
end

# rake workit[234]
```
