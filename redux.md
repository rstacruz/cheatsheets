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
    {() => <App />}
  </Provider>, mountNode)
```

```js
class App extends React.Component {
  render () { return <div>{this.props.message}</div> }
}

function select (state) {
  return { message: state.message }
}

export default connect(select)(App);
```

## Reference

* [Redux](https://www.npmjs.com/package/redux)
* [React-redux](https://www.npmjs.com/package/react-redux)
* [Usage with React](http://rackt.github.io/redux/docs/basics/UsageWithReact.html)
