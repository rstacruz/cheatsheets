---
title: Rspec-rails controllers
layout: default
---

```rb
describe MyController do
  describe "POST update" do
    it "works" do
      post :update, { user: { name: "john" } }

      controller
      controller.send ...

      response
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template("index")
    end
  end
end
```
