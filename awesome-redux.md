---
title: Awesome-redux
category: Ruby
---

### [redux-actions](https://www.npmjs.com/package/redux-actions)
Create action creators in flux standard action format.

```js
increment = createAction('INCREMENT', amount => amount)
increment = createAction('INCREMENT')  // same

err = new Error()
increment(42) === { type: 'INCREMENT', payload: 42 }
increment(err) === { type: 'INCREMENT', payload: err, error: true }
```

### [flux-standard-action](https://github.com/acdlite/flux-standard-action)
A standard for flux action objects.

```
{ type: 'ADD_TODO', payload: { text: 'Work it' } }
{ type: 'ADD_TODO', payload: new Error(), error: true }
```

An action may have an `error`, `payload` and `meta` and nothing else.

### [redux-promise](https://github.com/acdlite/redux-promise)
Pass promises to actions. Dispatches a flux-standard-action.

```js
increment = createAction('INCREMENT')  // redux-actions
increment(Promise.resolve(42))
```

### [redux-effects](https://www.npmjs.com/package/redux-effects)
Pass side effects declaratively to keep your actions pure.

```js
{
  type: 'EFFECT_COMPOSE',
  payload: {
    type: 'FETCH'
    payload: {url: '/some/thing', method: 'GET'}
  },
  meta: {
    steps: [ [success, failure] ]
  }
}
```

### [redux-multi](https://github.com/ashaffer/redux-multi)
Dispatch multiple actions in one action creator.

```js
store.dispatch([
  { type: 'INCREMENT', payload: 2 },
  { type: 'INCREMENT', payload: 3 }
])
```
