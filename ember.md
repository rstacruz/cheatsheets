---
title: Ember.js
category: JavaScript libraries
tags: [Archived]
archived: This sheet describes an older version of Ember.
---

{% raw %}

### Routes

    Router.map(function() {
      this.route('trips', function() {
          this.route('item', { path: '/:tripId' });
      });

      this.route('upcoming');
      this.route('about', { path: '/aboutus' });
      this.route('schedules');
      this.route('history');
      this.route('post', { path: '/post/:postId' });
    });

### A route

    import Route from '@ember/routing/route';
    
    export default PostRoute extends Route {
      model({ postId }) {
        // Post will be accessible as `this.model` in the controller
        // or `{{@model}}` in the template.
        return this.store.find('post', postId);
      }
    }

### Component
    
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';
    
    export default PostEditor extends Component {
      @tracked title;
     
      get fullTitle() {
        return `Post: ${title}`;
      }
      
      titleUpdate(event) {
        this.title = event.target.value;
      }
    }

### Template

    <div ...attributes>
        <label for="title">Title</label>
        <input
            id="title"
            value={{@post.title}}
            {{on 'input' this.updateTitle}}
        />

        <p>
            {{this.fullTitle}}
        </p>
    </div>

Invoking the component:

    <PostEditor class='my-post' @post={{@model}} />


{% endraw %}
