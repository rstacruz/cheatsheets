---
title: js-model
category: Hidden
# Last shipped 0.11.0 (~2012); unmaintained for a decade.
updated: 2026-10-04
---

### Example

```coffeescript
Project = Model "project", ->
  @extend
    findByTitle: (title) -> ...

  @include
    markAsDone: -> ...

  # ActiveRecord::Base.include_root_in_json = false
```

```coffeescript
project = Project.find(1)
project = Project.findByTitle("hello")

project.markAsDone()
```

### Persistence

```coffeescript
Project "hi", ->
  @persistence Model.REST, "/projects"
  @persistence Model.localStorage
```

```coffeescript
Project.load ->
  # loaded
```

### Attrs

```coffeescript
project = new Project(name: "Hello")

project.attr('name', "Hey")
project.attr('name')

project.save()
project.destroy()
```

### Collection

```coffeescript
Food.add(egg)
Food.all()
Food.select (food) -> ...
Food.first()
```

```coffeescript
Food.find(id)
```

### Events

```coffeescript
# Classes
Project.bind "add", (obj) ->
Project.bind "remove", (obj) ->
```

```coffeescript
# Instances
project.bind "update", ->
project.bind "destroy", ->
```

```coffeescript
project.trigger "turn_blue"
```

## References
{: .-one-column}

- <http://benpickles.github.io/js-model/>
- <https://github.com/benpickles/js-model>
