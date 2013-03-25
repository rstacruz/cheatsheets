title: Backbone.js
---

### Binding events

    .on('event', callback);
    .on('event', callback, context);

    .on({
      'event1': callback,
      'event2': callback
    });

    .on('all', callback);

    .once('event', callback);   /* Only happens once */

### Unbinding events

    
    object.off("change", onChange);    // just the `onChange` callback
    object.off("change");              // all "change" callbacks
    object.off(null, onChange);        // `onChange` callback for all events
    object.off(null, null, context);   // all callbacks for `context` all events
    object.off();                      // all

### Events

    object.trigger('event')

    view.listenTo(object, event, callback)
    view.stopListening()

### List of events

  * Collection:
    * `add` (model, collection, options)
    * `remove` (model, collection, options)
    * `reset` (collection, options)
    * `sort` (collection, options)

  * Model:
    * `change` (model, options)
    * `change:[attr]` (model, value, options)
    * `destroy` (model, collection, options)
    * `error` (model, xhr, options)

  * Model and collection:
    * `request` (model, xhr, options)
    * `sync` (model, resp, options)

  * Router:
    * `route:[name]` (params)
    * `route` (router, route, params)

### Views

    // All attributes are optional
    var View = Backbone.View.extend({
      model: doc,

      tagName: 'div',
      className: 'document-item',
      id: "document-" + doc.id,
      attributes: { href: '#' },

      el: 'body',

      events: {
        'click button.save': 'save',
        'click .cancel': function() { ... },
        'click': 'onclick'
      },

      constructor: function() { ... },
      render: function() { ... }
    });

    view = new View();
    view = new View({ el: ... });

    view.$el.show();
    view.$("input");

    view.remove();

    view.delegateEvents();
    view.undelegateEvents();

### Model

    // All attributes are optional
    var Model = Backbone.Model.extend({
      defaults: {
        'author': 'unknown'
      },
      idAttribute: '_id',
      parse: function() {
      }
    });

    var obj = new Model({ title: "Lolita", author: "Nabokov" });

    var obj = new Model({ collection: ... });

    obj.id
    obj.cid   //=> "c38" (client-side ID)

    obj.clone()

    obj.hasChanged('title')
    obj.changedAttributes()  /* false, or hash */
    obj.previousAttributes() /* false, or hash */
    obj.previous('title')

    obj.isNew()

    obj.set({ title: 'A Study in Pink' });
    obj.set({ title: 'A Study in Pink' }, { validate: true, silent: true });
    obj.unset('title')

    obj.get('title')
    obj.has('title')
    obj.escape('title')     /* Like .get() but HTML-escaped */

    obj.clear()
    obj.clear({ silent: true })

    obj.save()
    obj.save({ attributes })
    obj.save(null, {
      silent: true, patch: true, wait: true,
      success: callback, error: callback
    })

    obj.destroy()
    obj.destroy({
      wait: true,
      success: callback, error: callback
    })

    obj.toJSON()

    obj.fetch()
    obj.fetch({ success: callback, error: callback })

### Model: validation

    var Model = Backbone.Model.extend({
      validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
          return "Can't end before it starts";
        }
      }
    });

    obj.validationError  //=> "Can't end before it starts"
    obj.isValid()
    obj.on('invalid', function(model, error) { ... })

    // Triggered on:
    obj.save()
    obj.set({...}, { validate: true })

### Model: custom URLs

    var Model = Backbone.Model.extend({
      // Single URL (string or function)
      url: '/account',
      url: function() { return '/account'; },

      // Both of these two work the same way
      url: function() { return '/books/' + this.id }),
      urlRoot: '/books'
    });

    var obj = new Model({ url: ... });
    var obj = new Model({ urlRoot: ... });


