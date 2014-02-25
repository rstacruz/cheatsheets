---
title: SimpleForm
layout: default
---

<%= f.input :email, required: false, autofocus: true %>
<%= f.input :password, required: false %>
<%= f.input :remember_me, as: :boolean %>
<%= f.button :submit, "Sign in" %>

simple_form_for @x,
  wrapper: :small
