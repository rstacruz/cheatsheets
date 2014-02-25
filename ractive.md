---
title: Ractive.js
layout: default
vim: ft=javascript
---

### Initialization

		new Ractive({
			el: $('..'),
			el: '#box',
			template: '...', // required

			// callbacks
			init: function()     // on instanciate
			complete: function() // on finish animations

			// objs
			data: { ... }
			partials: { ... }    // global: Ractive.partials
			transitions: { ... } // global: Ractive.transitions
			components: { ... }
			adaptors: [ ... ]

			// options
			magic: false
			modifyArrays: true
			twoway: true
			noIntro: true // true = disable transition on initial render
			lazy: false   // false = use keyevents, true = use change/blur
			append: false // false = overwrite element, true = append
			debug: false
			sanitize: false
		})


http://docs.ractivejs.org/latest/initialisation-options

### Components

		Widget = Ractive.extend({ ... })

		ractive = new Ractive({
			el: 'main',
			template: '<widget foo="bar"/>',
			components: {
				widget: Widget
			}
		});

https://github.com/RactiveJS/Ractive/issues/74
https://github.com/RactiveJS/Ractive/wiki/Components

### Partials

		// Global partials
		Ractive.partials.x = "<..>"

### Events

		<button on-click='activate'>Activate!</button>

		view.on({
			activate: function () { ... }
		});

    <button on-click='sort:name'>Sort by name</button>
    view.on('sort', function (e, column) {
      console.log('sorting by #{column}');
    });

### Observing

     view.observe("name", function (name) {
       console.log("Changed name to", name);
     }, { init: false });

### Markup

		Hello, {{name}}
    Body: {{{unescaped}}}

    <!-- each -->
		{{#list:i}}
			<li>{{this.name}}</li>
			<li>{{name}}</li>
			<li>{{.}}</li> <!-- same as 'this' -->
    {{/#list}}

    {{^user}}Not logged in{{/user}} <!-- if false -->
    {{#user}}Welcome, sire{{/user}} <!-- if true -->

		{{>partialName}}
		<component>

		{{#statusDogs[selected]}}

### Transformed attributes

This transforms the `list` attribute via a helper function called `sort()`.

    {{# sort(list, "name") :num }}
      <li>{{num}} - {{name}}</li>
    {{/ end. any text goes here }}

    data: {
      sort: function(array, column) { return array.whatever(); }
    }

### Transitions

		<div intro="fade">
		<div intro="bump">
		<div intro="bump:{duration:400}">

		Ractive.transitions.bump = function(t, params) {
			 params = t.processParams( params, {
				 duration: 400,
				 color: t.isIntro ? 'rgb(0,255,0)' : 'rgb(255,0,0)'
			 });

			if (t.isIntro) {
				/* enter */
			} else {
				/* exit */
			}

			t.complete();
		};
