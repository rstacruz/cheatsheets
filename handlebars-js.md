---
title: Handlebars.js
category: JavaScript libraries
---

### Helpers

    Handlebars.registerHelper('link_to', function() {
      return "<a href='" + this.url + "'>" + this.body + "</a>";
    });

    var context = { posts: [{url: "/hello-world", body: "Hello World!"}] };
    var source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>"

    var template = Handlebars.compile(source);
    template(context);

    // Would render:
    //
    // <ul>
    //   <li><a href='/hello-world'>Hello World!</a></li>
    // </ul>
