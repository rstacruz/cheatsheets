---
title: Mixpanel
category: Analytics
---

### Identify

```js
mixpanel.identify('284')
mixpanel.people.set({ $email: 'hi@gmail.com' })
```

```js
// Set common properties
mixpanel.register({ age: 28, gender: 'male' })
```

### Track events

```js
mixpanel.track('Login success')
mixpanel.track('Search', { query: 'cheese' })
```

### References

* <https://mixpanel.com/help/reference/javascript>
