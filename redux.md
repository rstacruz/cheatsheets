---
title: Redux
category: React
---

### Stores

```js
import { createStore } from 'redux';
 
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}
```

```js
let store = createStore(counter);

store.subscribe(() => { ... })
store.dispatch({ action })
store.getState()
store.dispatch({ type: 'INCREMENT' }); // 1 
store.dispatch({ type: 'DECREMENT' }); // 10
```

### React Redux

```js
React.render(
  <Provider store={store}>
    <App />
  </Provider>, mountNode)
```

```js
class App extends React.Component {
  render () {
    return
      <div onClick={() => this.props.onMessageClick('hello')}>
        {this.props.message}
    </div>
  }
}

function mapStateToProps (state) {
  return { message: state.message }
}

function mapDispatchToProps (dispatch) {
  return {
    onMessageClick (message) {
      dispatch({ type: 'click', message })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

## Middleware

```js
// noop middleware
const logger = store => dispatch => action { dispatch(action) }

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

### Applying middleware

```js
const store = createStore(reducer, {}, applyMiddleware(logger, thunk, ...))
```

## Reference

* [Redux](https://www.npmjs.com/package/redux)
* [React-redux](https://www.npmjs.com/package/react-redux)
* [Usage with React](http://rackt.github.io/redux/docs/basics/UsageWithReact.html)
