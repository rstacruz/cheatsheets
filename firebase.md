---
title: Firebase
prism_languages: [coffeescript]
tags: [WIP]
layout: 2017/sheet
---

### Authenticating

```js
FB = new Firebase('https://xxx.firebase.io')
FB.auth(TOKEN, (err, result) => { ···})
```

```js
FB.authAnonymously(···)
FB.authWithPassword(···)
FB.authWithOAuthPopup(···)
FB.authWithOAuthToken(···)
```

### Using

```js
Users = FB.child('users')
```

```js
// Create
user = Users.push(first: "Frank", last: "Sinatra")
```

```js
// Retrieve
user = Users.child('alan')  // gets `users/alan`
```

```js
// Update
user.set(first: "Miles", last: "Davis")
user.update(first: "Miles")
user.setWithPriority({ ··· }, priority)
```

```js
// Destroy
user.remove()
```

```js
// Getting
user.name()  // primary id

user.once('value', (snap) => {
  snap.name()  // primary id
  snap.val()   // value
}, (err) => {
  ···
})
```

```js
// traversal
user.parent()
```

### Querying

```coffeescript
Users = FB.child('users')
Users
  .startAt(1000)
  .limit(50)
  .equalTo(priority, [name])
  .on 'child_added', (snap) -> ···
```
### Lists

```coffeescript
Posts = FB.child('posts')
post = Posts.push({ title: "How to do things", author: "alan" })
```

## References
{: .-one-column}

* <https://www.firebase.com/docs/web/api/>
* <https://www.firebase.com/docs/web/recipes.html>
