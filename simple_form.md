---
title: SimpleForm
tags: [WIP]
---

### Inputs

```ruby
<%= f.input :email, required: false, autofocus: true %>
<%= f.input :password, required: false %>
<%= f.input :remember_me, as: :boolean %>
<%= f.button :submit, "Sign in" %>
```

### Adding a wrapper

```ruby
simple_form_for @x, wrapper: :small
```
