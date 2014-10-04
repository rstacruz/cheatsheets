---
title: Rspec-rails controllers
layout: default
---

```rb
expect(response).to be_success
expect(response).to have_http_status(200)
expect(response).to render_template("index")
