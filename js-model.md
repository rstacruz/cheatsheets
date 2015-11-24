---
title: js-model
category: JavaScript libraries
---

    Project = Model "project", ->
      @extend
        findByTitle: (title) -> ...

      @include
        markAsDone: -> ...

      # ActiveRecord::Base.include_root_in_json = false
    });

    project = Project.find(1)
    project = Project.findByTitle("hello")

    project.markAsDone()

### Persistence

    Project "hi", ->
      @persistence Model.REST, "/projects"
      @persistence Model.localStorage

    Project.load ->
      // loaded

### Attrs

    project = new Project(name: "Hello")

    project.attr('name', "Hey")
    project.attr('name')

    project.save()
    project.destroy()

### Collection

    Food.add(egg)
    Food.all()
    Food.select (food) -> ...
    Food.first()

    Food.find(id)

### Events

    Project.bind "add", (obj) ->
    Project.bind "remove", (obj) ->

    # Instances
    project.bind "update", ->
    project.bind "destroy", ->

    project.trigger "turn_blue"

http://benpickles.github.io/js-model/
