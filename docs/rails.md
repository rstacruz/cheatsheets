---
title: Rails
category: Rails
---

Helpers
-------

    class ApplicationController
      helper_method :logged_in?
    
      def logged_in?
        "Something"
      end
    end

### CSS/JS packages

    stylesheet_link_tag :monkey
    javascript_link_tag :monkey

### Forms

    # http://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html

    - form_for @person do |f|
      = f.label :first_name
      = f.label :first_name, "First name"
      = f.text_field :first_name

      = f.label :last_name>
      = f.text_field :last_name>

      - fields_for @person.permission do |fields|
        = fields.checkbox :admin

      -# name="person[admin]"
      - fields_for :person, @client do |fields|
        = fields.checkbox :admin

      = f.submit

    # Also: check_box, email_field, fields_for
    # file_field, hidden_field, label, number_field, password_field
    # radio_button, range_field, search_field, telephonen_field,
    # text_area, text_field, url_field

Controllers
-----------

http://apidock.com/rails/ActionController/Base

    class ProjectsController
      layout 'project'   # Actually defaults to `projects` based
                         # on the controller name

      def save
      end

      def edit
      end
    end

### Before filter
  
    class ApplicationController < ActionController::Base
      before_filter :validate, only: [:save, :edit]
      before_filter :ensure_auth, except: [:logout]

      before_filter :require_login
     
      private
     
      def require_login
        unless logged_in?
          flash[:error] = "You must be logged in to access this section"
          redirect_to new_login_url # halts request cycle
        end
      end
    end

### Default URL optinos

    class ApplicationController < ActionController::Base
      # The options parameter is the hash passed in to 'url_for'
      def default_url_options(options)
        {:locale => I18n.locale}
      end
    end

### Hashes

    session[:what]
    flash[:notice] = "Your session expired"
    params[:id]

### XML and JSON
  
    class UsersController < ApplicationController
      def index
        @users = User.all
        respond_to do |format|
          format.html # index.html.erb
          format.xml  { render :xml => @users}
          format.json { render :json => @users}
        end
      end
    end

### Redirection

    redirect_to action: 'show', id: @entry.id
    redirect_to root_url          # a path

### Render

    render nothing: true
    render template: 'products/show'
    render status: 500
    render status: :forbidden
    render text: '...'
    render layout: 'special_layout'
    render layout: false
    render action: 'something'    # same as `file: 'my/something'`
                                  # Renders the template only, does not execute
                                  # the action

    render json: object
    render xml: object

    render location: photo_url(photo)

### Head-only responses

    head :bad_request
    head :created, location: photo_path(@photo)

Layouts
-------

    # app/views/layouts/application.html.erb
    <%= content_for?(:content) ? yield :content : yield %>

    # app/views/layouts/news.html.erb
    <% content_for :content do %>
       ...
    <% end %>
    <% render template: :'layouts/application' %>
    
