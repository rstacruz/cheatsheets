---
title: Sequelize
category: Ruby libraries
---

### API

    sequelize.sync().done -> ...

### Models

    Project = sequelize.define('Project', {
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      title: { type: Sequelize.STRING, allowNull: false },
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    }, {
      classMethods: { ... },
      instanceMethods: { ... }
    });

    Project.hasMany(Task)

### Finders

    Project.find(123).success (project) ->

    Project.find({ where: {title: 'Hello'} })
    Project.find({ where: {id: [1,3,4]} })
    Project.find({ where: ["id > ?", 25] })

    Project.find(
      where: {title: 'a'}
      attributes: ['id', ['name', 'title']]
    )

    .findOrCreate(...)

    .findAll
    .findAll({ where: ... })
    .findAll({ order: 'title DESC' })
    .findAll({ limit: 10 })
    .findAll({ offset: 10, limit: 2 })

    .count()


### Build

    item = Project.build({ ... })

    item.title = '...'

    item.save().success (item) ->

    item.updateAttributes({ title: '...' })

    item.destroy().success ->

    item.values

