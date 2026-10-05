---
title: Redux
category: React
updated: 2018-01-17
weight: -3
---

### Creating a store

```js
import { createStore } from 'redux'
```
{: .-setup}

```js
// Reducer
function counter (state = { value: 0 }, action) {
  switch (action.type) {
  case 'INCREMENT':
    return { value: state.value + 1 }
  case 'DECREMENT':
    return { value: state.value - 1 }
  default:
    return state
  }
}
```

```js
let store = createStore(counter)
```

```js
// Optional - you can pass `initialState` as a second arg
let store = createStore(counter, { value: 0 })
```

A store is made from a reducer function, which takes the current `state`, and
returns a new `state` depending on the `action` it was given.

### Using a store

```js
let store = createStore(counter)
```
{: .-setup}

```js
// Dispatches an action; this changes the state
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
```

```js
// Gets the current state
store.getState()
```

```js
// Listens for changes
store.subscribe(() => { ... })
```

Dispatch actions to change the store's state.

## React Redux

### Provider

```js
import { Provider } from 'react-redux'
```
{: .-setup}

```js
React.render(
  <Provider store={store}>
    <App />
  </Provider>, mountNode)
```

The `<Provider>` component makes the store available in your React components. You need this so you can use `connect()`.

### Mapping state

```js
import { connect } from 'react-redux'
```
{: .-setup}

```js
// A functional React component
function App ({ message, onMessageClick }) {
  return (
    <div onClick={() => onMessageClick('hello')}>
      {message}
    </div>
  )
}
```

```js
// Maps `state` to `props`:
// These will be added as props to the component.
function mapState (state) {
  return { message: state.message }
}

// Maps `dispatch` to `props`:
function mapDispatch (dispatch) {
  return {
    onMessageClick (message) {
      dispatch({ type: 'click', message })
    }
  }
}

// Connect them:
export default connect(mapState, mapDispatch)(App)
```

### Shorthand

```js
export default connect(
  (state) => ({
    message: state.message
  }),
  (dispatch) => ({
    onMessageClick: (message) => {
      dispatch({ type: 'click', message })
    }
  })
)(App)
```

Same as above, but shorter.

### Combining reducers

```js
const reducer = combineReducers({
  counter, user, store
})
```

Combines multiple reducers into one reducer function. See: [combineReducers](https://redux.js.org/docs/api/combineReducers.html) _(redux.js.org)_

## Middleware

### Signature

```js
// noop middleware
const logger = store => dispatch => action { dispatch(action) }
```

```js
const logger = store => {
  // This function runs on createStore().
  // It returns a decorator for dispatch().

  return dispatch => {
    // Runs on createStore(), too.
    // It returns a new dispatch() function

    return action => {
      // Runs on every dispatch()
    }
  }
}
```

Middlewares are simply decorators for `dispatch()` to allow you to take
different kinds of actions, and to perform different tasks when receiving
actions.

### Applying middleware

```js
const enhancer = applyMiddleware(logger, thunk, ...)
```

```js
const store = createStore(reducer, {}, enhancer)
```
{: data-line="1"}

## References
{: .-one-column}

* [Redux](https://www.npmjs.com/package/redux) _(npmjs.com)_
* [React-redux](https://www.npmjs.com/package/react-redux) _(npmjs.com)_
* [Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html) _(redux.js.org)_
{: .-also-see}
