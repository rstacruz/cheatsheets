---
title: Rake
subtitle: Ruby build task runner
category: Ruby
intro: |
  Rake is a Ruby task runner for defining and invoking build tasks. This reference covers task syntax, arguments, namespaces, and prerequisites.
links:
  - title: Rake documentation
    url: https://ruby.github.io/rake/doc/rakefile_rdoc.html
  - title: Rake repository
    url: https://github.com/ruby/rake
tier: t3
last_verified_with: "Rake 13.4.2."
updated: 2026-11-26
---

## Tasks

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
<!-- {: data-highlight="namespace; task"} -->

See: [Tasks](https://ruby.github.io/rake/doc/rakefile_rdoc.html#tasks)

### Rake task with arguments

```rb
desc "Do something"
task :workit, [:id] => :environment do |_, args|
  id = args[:id]
end

# rake workit[234]
```
<!-- {: data-highlight="task :workit, [:id]"} -->

See: [Tasks with arguments](https://ruby.github.io/rake/doc/rakefile_rdoc.html#tasks-with-arguments)
