---
title: Middleman 3
category: JavaScript libraries
---

**NB:** This is for Middleman 3, not Middleman 4+.

### Compass config

    compass_config do |config|
      config.output_style = :compact
    end

### Config

    # Automatic image dimensions on image_tag helper
    activate :automatic_image_sizes

### Gems

    # Susy grids in Compass
    # First: gem install compass-susy-plugin
    require 'susy'

    # CodeRay syntax highlighting in Haml
    # First: gem install haml-coderay
    require 'haml-coderay'

    # CoffeeScript filters in Haml
    # First: gem install coffee-filter
    require 'coffee-filter'


### Page command

    # With no layout
    page "/path/to/file.html", :layout => false

    # With alternative layout
    page "/path/to/file.html", :layout => :otherlayout

    # A path which all have the same layout
    with_layout :admin do
      page "/admin/*"
    end

    # Proxy (fake) files
    page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
      @which_fake_page = "Rendering a fake page with a variable"
    end

### Helpers

    helpers do
      def some_helper
        "Helping"
      end
    end

### Directories

    set :css_dir, "alternative_css_directory"
    set :js_dir, "alternative_js_directory"
    set :images_dir, "alternative_image_directory"

# Build-specific configuration

    configure :build do
      activate :minify_css
      activate :minify_javascript

      # Enable cache buster
      activate :cache_buster

      # Use relative URLs
      activate :relative_assets

      # Compress PNGs after build
      # First: gem install middleman-smusher
      # require "middleman-smusher"
      activate :smusher

      # Or use a different image path
      set :http_path, "/Content/images/"
    end
