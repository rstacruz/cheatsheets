---
title: Ember.js
category: JavaScript libraries
---

{% raw %}

### Routes

    App.Router.map(function() {
      this.resource('trips', function() {
          this.route('item', { path: '/:trip_id' });
      });

      this.route('upcoming');
      this.route('about', { path: '/about' });
      this.route('schedules');
      this.route('history');
      this.route('post');
    });

### A route

    App.IndexRoute = Ember.Route.extend({
      setupController: function(controller) {
        controller.set('title', 'my app');
        // <h1>{{title}}</h1>
      },

      setupController: function(controller, model) {
        controller.set("model", model);
        this.controllerFor('topPost').set('model', model);
      },

      model: function(params) {
        return this.store.find('posts');
        return this.store.find('post', params.post_id);
      },
      
      serialize: function(model) {
        // this will make the URL `/posts/foo-post`
        return { post_slug: model.get('slug') };
      }
    });

### View

    App.InfoView = Ember.View.extend({
      templateName: 'input',  /* optional */

      fooName: "Hello"  /* {{ view.fooName }} */

      click: function(e) {
        "I was clicked";
      }

    });

### markup

    <img {{bindAttr src="avatarURL"}}>
    <button {{action follow}}>

Value binding:

    {{view Ember.TextField class="input block" valuebinding="emailAddresses"}}

Actions:

    <button {{action invite emailAddresses}}>Invite></button>

    <a href="#" {{action set "isEditingContacts" true target="view"}} 

{% endraw %}
