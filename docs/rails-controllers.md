---
title: Controllers
category: Rails
---

### Common stuff

    redirect_to root_url
    redirect_to root_url, notice: "Good."

### Special hashes

    session[:user_id] = nil

    flash[:notice] = "Hello"    # Gets flushed on next request
    flash.keep                  # Persist flash values
    flash.now[:error] = "Boo"   # Available on the same request

    cookies[:hello] = "Hi"

    params[:page]

    # params is a combination of:
    query_parameters
    path_parameters
    request_parameters

### respond_to

    respond_to do |format|
      format.html
      format.xml  { render xml: @users }
      format.json { render json: @users }
      format.js    # Will be executed by the browser
    end

### default_url_options

    # The options parameter is the hash passed in to 'url_for'
    def default_url_options(options)
      {:locale => I18n.locale}
    end

### Filters

    # Filter with callbacks
    before_filter :authenticate
    before_filter :authenticate, except: [:login]
    before_filter :authenticate, only: [:login]
    def authenticate
      redirect_to login_url unless controller.logged_in?
    end

    # Filter with inline
    before_filter do |controller|
      redirect_to login_url unless controller.logged_in?
    end

    # Filter with external classes
    before_filter LoginFilter
    class LoginFilter
      def self.filter(controller) ...; end
    end

    # Filter exceptions
    skip_before_filter :require_login, only: [:new, :create]

    # Before/after filters
    around_filter :wrap_in_transaction
    def wrap_in_transaction(&blk)
      ActiveRecord::Base.transaction { yield }
    end

### HTTP basic authentication

    before_filter :authenticate

    # Basic authentication:
    def authenticate
      authenticate_or_request_with_http_basic { |u, p|
        u == "root" && p == "alpine"
      }
    end

    # ...or digest (hashed) authentication:
    # uses the ha1 hash (username:realm:password)
    def authenticate_by_digest
      realm = "Secret3000"
      users = {
        "rsc" => Digest::MD5.hexdigest("rsc:#{realm}:passwordhere")
      }

      authenticate_or_request_with_http_digest(realm) { |user|
        users[user]
      }
    end

    # For integration tests
    def test_access
      auth = ActionController::HttpAuthentication::Basic.encode_credentials(user, pass)
      get "/notes/1.xml", nil, 'HTTP_AUTHORIZATION' => auth
    end

    # Token auth
    is_logged_in = authenticate_with_http_token do |token, options|
      token == our_secret_token
    end

    request_http_token_authentication  unless is_logged_in

### Request/response

    request.host            #=> "www.example.com"
    request.domain          #=> "www.example.com"
    request.domain(n=2)     #=> "example.com"
    request.port            #=> 80
    request.protocol        #=> "http://"
    request.query_string    #=> "q=duck+tales"
    request.url             #=> "http://www.example.com/search?q=duck+tales"
    request.fullpath        #=> "/search?q=duck+tales"

    request.headers         # Returns a hash

    request.format          #=> "text/html"
    request.remote_ip       #=> "203.167.220.220"
    request.local?          #=> true (if localhost/127.0.0.1)

    request.xhr?

    request.method          #=> "POST"
    request.method_symbol   #=> :post
    request.get?
    request.post?
    request.put?
    request.delete?
    request.head?

### response

    response.body
    response.status         #=> 404
    response.location       # Redirect location
    response.content_type
    response.charset
    response.headers

    response.headers["Content-Type"] = "application/pdf"

### Streaming

    send_data pdfdata, filename: "foo.pdf", type: "application/pdf"
    send_file Rails.root.join('public','filename.txt') [filename: '..', type: '..']

### References

 * [Guide](http://guides.rubyonrails.org/action_controller_overview.html)
 * [HttpAuthentication::Basic](http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)
 * [HttpAuthentication::Token](http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token.html)
