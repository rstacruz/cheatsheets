---
title: SimpleForm
category: Rails
subtitle: Rails form builder
intro: |
  A Rails form builder reference for generating inputs, buttons, and custom wrappers with Simple Form.
links:
  - title: Simple Form README
    url: https://github.com/heartcombo/simple_form
  - title: Simple Form usage guide
    url: https://github.com/heartcombo/simple_form#usage
tags: [WIP]
tier: t3
last_verified_with: "Simple Form 5.4.1."
updated: 2026-11-26
---

## Forms

### Inputs

```ruby
<%= f.input :email, required: false, autofocus: true %>
<%= f.input :password, required: false %>
<%= f.input :remember_me, as: :boolean %>
<%= f.button :submit, "Sign in" %>
```
<!-- {: data-highlight="f.input"} -->

See: [Form usage](https://github.com/heartcombo/simple_form#usage)

### Adding a wrapper

```ruby
simple_form_for @x, wrapper: :small
```
<!-- {: data-highlight="wrapper:"} -->

See: [The wrappers API](https://github.com/heartcombo/simple_form#the-wrappers-api)
