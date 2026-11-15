---
title: Express.js
category: JavaScript libraries
---

### Settings

```js
app.set('x', 'yyy')
app.get('x') //=> 'yyy'

app.enable('trust proxy')
app.disable('trust proxy')

app.enabled('trust proxy') //=> true
```

### Env

```js
app.get('env')
```

### Config

```js
app.configure('production', function() {
  app.set...
})
```

### Wares

```js
app.use(express.static(__dirname + '/public'))
app.use(express.logger())
```

### Helpers

```js
app.locals({
  title: "MyApp",
})
```

## Request & response

### Request

```js
// GET  /user/tj
req.path         //=> "/user/tj"
req.url          //=> "/user/tj"
req.xhr          //=> true|false
req.method       //=> "GET"
req.params
req.params.name  //=> "tj"
req.params[0]
```

```js
// GET /search?q=tobi+ferret
req.query.q // => "tobi ferret"
```

```js
req.cookies
```

```js
req.accepted
// [ { value: 'application/json', quality: 1, type: 'application', subtype: 'json' },
//   { value: 'text/html', quality: 0.5, type: 'text',subtype: 'html' } ]
```

```js
req.is('html')
req.is('text/html')
```

```js
req.headers
req.headers['host']
req.headers['user-agent']
req.headers['accept-encoding']
req.headers['accept-language']
```

### Response

```js
res.redirect('/')
res.redirect(301, '/')
```

```js
res.set('Content-Type', 'text/html')
```

```js
res.send('hi')
res.send(200, 'hi')
```

```js
res.json({ a: 2 })
```
