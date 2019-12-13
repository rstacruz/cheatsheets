---
title: js-model
category: JavaScript libraries
layout: 2017/sheet
---

### Example

```bash
Project = Model "project", ->
  @extend
    findByTitle: (title) -> ...

  @include
    markAsDone: -> ...

  # ActiveRecord::Base.include_root_in_json = false
```

```bash
project = Project.find(1)
project = Project.findByTitle("hello")

project.markAsDone()
```

### Persistence

```bash
Project "hi", ->
  @persistence Model.REST, "/projects"
  @persistence Model.localStorage
```

```bash
Project.load ->
  # loaded
```

### Attrs

```bash
project = new Project(name: "Hello")

project.attr('name', "Hey")
project.attr('name')

project.save()
project.destroy()
```

### Collection

```bash
Food.add(egg)
Food.all()
Food.select (food) -> ...
Food.first()
```

```bash
Food.find(id)
```

### Events

```bash
# Classes
Project.bind "add", (obj) ->
Project.bind "remove", (obj) ->
```

```bash
# Instances
project.bind "update", ->
project.bind "destroy", ->
```

```bash
project.trigger "turn_blue"
```

## References
{: .-one-column}

- <http://benpickles.github.io/js-model/>
