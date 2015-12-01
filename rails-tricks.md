---
title: Rails tricks
category: Rails
---

in config/environments/development.rb:

    # Source maps for Sass
    config.sass.debug_info = true
    config.sass.line_comments = false

    # Don't break apart
    config.assets.debug = false

Partial locals

    <%= render 'article', full: true %>
    <%= render 'article' %>

    <% if local_assigns[:full] %>
      ...
    <% end %>

HTML in i18n

    en:
      read_more_html: "read <b>more</b>..."

Exception handling:

    # config/application.rb
    config.exceptions_app = self.routes

    get '/404', to: 'errors#not_found'
    get '/500', to: 'errors#server_error'

    class ErrorsController
      def not_found
        render status: :not_found
      end
     end

Rails updating:

    rake rails:update

Distinct pluck:

    Article.distinct.pluck('author')

Relation#merge

    scope :with_drafts, -> {
      uniq.joins(:articles).merge(Article.draft)
    }

Order

    scope :recent, -> { order created_at: :desc }

Group by month

    .group("to_char(created_at, 'YYYY-MM')")
    .group("to_char(created_at, 'YYYY-MM')").count
