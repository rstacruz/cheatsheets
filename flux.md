---
title: Flux
layout: default
---

## Architecture

* __Dispatchers__ receive *actions* that get dispatched to its listeners.

* __Stores__ are objects that store data, usually changed from a dispatcher listener.

* __Views__ are React components that listen to Store changes, or emit *actions* to the dispatcher.

----

## Dispatcher

A dispatcher emits (`.dispatch()`) events to its listeners (`.register(fn)`).

```js
var Dispatcher = require('flux').Dispatcher;

d = new Dispatcher()

// send a payload
d.dispatch({ a: 'aaa', ... };

// receive payloads
token = d.register(function (payload) {
  payload.a === 'aaa'
})
```

### Ensuring order

You can ensure one listener is fired after another using `.waitFor()`.

```js
token1 = d.register(...);

token2 = d.register(function (payload) {

  // ensure receiver 1 is fired before this
  d.waitFor([ token1 ]);
  
  // process here
})
```

### Subclassing

[Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) is the preferred way to subclass Dispatcher (think `$.extend`).

You can also make *action creators*, which are shortcuts for `dispatch()`.

```js
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype, {

  // action creator
  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  } 

})
```

----

## Stores

Stores are just like objects.

```js
var TodoStore = { todos: {} };
```

----

## Stores and dispatchers

Make Dispatcher and Stores:

```js
d = new Dispatcher();
TabStore = { tab: 'home' };
```

Dispatch events to alter the store:

```js
d.dispatch({ event: 'changeTab', tab: 'timeline' });

d.register(function (data) {
  if (data.event === 'changeTab') {
    TabStore.tab = data.tab;
  }
});
```

----

## With Views

Components can listen to Dispatchers.

```js
var TodoApp = React.createClass({
  componentDidMount: function () {
    AppDispatcher.register(...);
  }
});
```

----

### Also see

* [Dispatcher API](http://facebook.github.io/flux/docs/dispatcher.html#content)
* [React](react.html)
