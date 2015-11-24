---
title: Firebase
---

wip

### Starting

``` coffee
Fb = new Firebase('https://xxx.firebase.io')
Fb.auth(TOKEN, (err, result) -> ...)
  .authAnonymously(...)
  .authWithPassword(...)
  .authWithOAuthPopup(...)
  .authWithOAuthToken(...)
```

### Updating values

``` coffee
Users = Fb.child('users')

# create
  user = Users.push(first: "Frank", last: "Sinatra")

# retrieve
  user = Users.child('alan')  # gets `users/alan`

# setting
  user
    .set(first: "Miles", last: "Davis")
    .update(first: "Miles")
    .setWithPriority({ ... }, priority)


# destroy
  user.remove()

# getting
  user.name()  # primary id

  user.once 'value', (snap) ->
    snap.name()  # primary id
    snap.val()   # value
  , (err) ->

# traversal
  user.parent()
```

### Querying

```coffee
Users = Fb.child('users')
Users
  .startAt(1000)
  .limit(50)
  .equalTo(priority, [name])
  .on 'child_added', (snap) -> ...
```
### Lists

```coffee
Posts = Fb.child('posts')
post = Posts.push({ title: "How to do things", author: "alan" })
```

### References

* https://www.firebase.com/docs/web/api/
* https://www.firebase.com/docs/web/recipes.html
