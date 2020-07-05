---
title: Rails features
category: Rails
---

### [Page caching](https://github.com/rails/actionpack-page_caching)

    class WeblogController < ActionController::Base
      caches_page :show, :new
    end

This will generate cache files such as `weblog/show/5.html` and 
`weblog/new.html`, which match the URLs used that would normally trigger dynamic 
page generation
