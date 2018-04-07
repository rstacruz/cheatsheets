---
title: Flask
layout: 2017/sheet
category: Flask  # could be split later on
updated: 2018-04-06
prism_languages: [python, bash, django]
intro: |
  Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions.
tags:
  - WIP
  - Python
---

{% raw %}

Flask
-----

## Configuration

### Setting Configuration

```python
app = Flask(__name__)
app.config['DEBUG'] = True
app.config.from_object('yourapplication.default_settings')
app.config.from_envvar('YOURAPPLICATION_SETTINGS')
```

### Builtin Configuration Values

| `DEBUG` | enable/disable debug mode |
| `TESTING` | enable/disable testing mode |
| `PROPAGATE_EXCEPTIONS` | explicitly enable or disable the propagation of exceptions. If not set or explicitly set to None this is implicitly true if either TESTING or DEBUG is true. |
| `PRESERVE_CONTEXT_ON_EXCEPTION` | By default if the application is in debug mode the request context is not popped on exceptions to enable debuggers to introspect the data. This can be disabled by this key. You can also use this setting to force-enable it for non debug execution which might be useful to debug production applications (but also very risky). |
| `SECRET_KEY` | the secret key |
| `SESSION_COOKIE_NAME` | the name of the session cookie |
| `SESSION_COOKIE_DOMAIN` | the domain for the session cookie. If this is not set, the cookie will be valid for all subdomains of SERVER_NAME. |
| `SESSION_COOKIE_PATH` | the path for the session cookie. If this is not set the cookie will be valid for all of APPLICATION_ROOT or if that is not set for '/'. |
| `SESSION_COOKIE_HTTPONLY` | controls if the cookie should be set with the httponly flag. Defaults to True. |
| `SESSION_COOKIE_SECURE` | controls if the cookie should be set with the secure flag. Defaults to False. |
| `PERMANENT_SESSION_LIFETIME` | the lifetime of a permanent session as datetime.timedelta object. Starting with Flask 0.8 this can also be an integer representing seconds. |
| `SESSION_REFRESH_EACH_REQUEST` | this flag controls how permanent sessions are refreshed. If set to True (which is the default) then the cookie is refreshed each request which automatically bumps the lifetime. If set to False a set-cookie header is only sent if the session is modified. Non permanent sessions are not affected by this. |
| `USE_X_SENDFILE` | enable/disable x-sendfile |
| `LOGGER_NAME` | the name of the logger |
| `LOGGER_HANDLER_POLICY` | the policy of the default logging handler. The default is 'always' which means that the default logging handler is always active. 'debug' will only activate logging in debug mode, 'production' will only log in production and 'never' disables it entirely. |
| `SERVER_NAME` | the name and port number of the server. Required for subdomain support (e.g.: 'myapp.dev:5000') Note that localhost does not support subdomains so setting this to “localhost” does not help. Setting a SERVER_NAME also by default enables URL generation without a request context but with an application context. |
| `APPLICATION_ROOT` | If the application does not occupy a whole domain or subdomain this can be set to the path where the application is configured to live. This is for session cookie as path value. If domains are used, this should be None. |
| `MAX_CONTENT_LENGTH` | If set to a value in bytes, Flask will reject incoming requests with a content length greater than this by returning a 413 status code. |
| `SEND_FILE_MAX_AGE_DEFAULT` | Default cache control max age to use with send_static_file() (the default static file handler) and send_file(), as datetime.timedelta or as seconds. Override this value on a per-file basis using the get_send_file_max_age() hook on Flask or Blueprint, respectively. Defaults to 43200 (12 hours). |
| `TRAP_HTTP_EXCEPTIONS` | If this is set to True Flask will not execute the error handlers of HTTP exceptions but instead treat the exception like any other and bubble it through the exception stack. This is helpful for hairy debugging situations where you have to find out where an HTTP exception is coming from. |
| `TRAP_BAD_REQUEST_ERRORS` | Werkzeug’s internal data structures that deal with request specific data will raise special key errors that are also bad request exceptions. Likewise many operations can implicitly fail with a BadRequest exception for consistency. Since it’s nice for debugging to know why exactly it failed this flag can be used to debug those situations. If this config is set to True you will get a regular traceback instead. |
| `PREFERRED_URL_SCHEME` | The URL scheme that should be used for URL generation if no URL scheme is available. This defaults to http. |
| `JSON_AS_ASCII` | By default Flask serialize object to ascii-encoded JSON. If this is set to False Flask will not encode to ASCII and output strings as-is and return unicode strings. jsonify will automatically encode it in utf-8 then for transport for instance. |
| `JSON_SORT_KEYS` | By default Flask will serialize JSON objects in a way that the keys are ordered. This is done in order to ensure that independent of the hash seed of the dictionary the return value will be consistent to not trash external HTTP caches. You can override the default behavior by changing this variable. This is not recommended but might give you a performance improvement on the cost of cacheability. |
| `JSONIFY_PRETTYPRINT_REGULAR` | If this is set to True (the default) jsonify responses will be pretty printed if they are not requested by an XMLHttpRequest object (controlled by the X-Requested-With header) |
| `JSONIFY_MIMETYPE` | MIME type used for jsonify responses. |
| `TEMPLATES_AUTO_RELOAD` | Whether to check for modifications of the template source and reload it automatically. By default the value is None which means that Flask checks original file only in debug mode. |
| `EXPLAIN_TEMPLATE_LOADING` | If this is enabled then every attempt to load a template will write an info message to the logger explaining the attempts to locate the template. This can be useful to figure out why templates cannot be found or wrong templates appear to be loaded. |
{: .-left-align }

## Routing
{: .-three-column}

### Static Routes

```python
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
```

### Variable Rules

```python
@app.route('/user/<username>')
def show_user_profile(username):
    return 'User %s' % username
```

Show the user profile for that user.

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id
```

Show the post with the given id, the id is an integer.

### URL Building

```python
url_for('show_user_profile', username='user')
```

Returns `/user/user`.

### HTTP Methods

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        do_the_login()
    else:
        show_the_login_form()
```

### Static Files

```python
url_for('static', filename='style.css')
```

The file has to be stored on the filesystem as `static/style.css`.

## Templates
{: .-two-column}

### Rendering Templates

```python
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```

Flask will look for templates in the templates folder. So if your application is
a module, this folder is next to that module, if it’s a package it’s actually
inside your package.

### Standard Context

| `config` | The current configuration object |
| `request` | The current request object. This variable is unavailable if the template was rendered without an active request context. |
| `session` | The current session object. This variable is unavailable if the template was rendered without an active request context. |
| `g` | The request-bound object for global variables. This variable is unavailable if the template was rendered without an active request context. |
| `url_for()` | The `flask.url_for()` function. |
| `get_flashed_messages()` | The `flask.get_flashed_messages()` function. |
{: .-left-align}

### Context Processors

```python
@app.context_processor
def inject_user():
    return dict(user=g.user)
```

Variables are not limited to values; a context processor can also make functions
available to templates (since Python allows passing around functions):

```python
@app.context_processor
def utility_processor():
    def format_price(amount, currency=u'€'):
        return u'{0:.2f}{1}'.format(amount, currency)
    return dict(format_price=format_price)
```

### Standard Filters

| `tojson()` | This function converts the given object into JSON representation.  This is for example very helpful if you try to generate JavaScript on the fly. |
{: .-left-align}

### Registering Filters

```python
@app.template_filter('reverse')
def reverse_filter(s):
    return s[::-1]
```

Once registered, you can use the filter in your templates in the same way as Jinja2’s builtin filters, for example if you have a Python list in context called `mylist`:

```django
{% for x in mylist | reverse %}
{% endfor %}
```

## Blueprints

### Registering Blueprints

```python
from flask import Flask
from yourapplication.simple_page import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page, url_prefix='/pages')
```

### Building URLs

```python
url_for('admin.index')
url_for('.index')
```

You can use relative redirects by prefixing the endpoint with a dot only.

### Static Files

```python
admin = Blueprint('admin', __name__, static_folder='static')
url_for('admin.static', filename='style.css')
```

### Templates

```python
admin = Blueprint('admin', __name__, template_folder='templates')
```

The template folder is added to the search path of templates but with a lower
priority than the actual application’s template folder. That way you can easily
override templates that a blueprint provides in the actual application. This
also means that if you don’t want a blueprint template to be accidentally
overridden, make sure that no other blueprint or actual application template has
the same relative path. When multiple blueprints provide the same relative
template path the first blueprint registered takes precedence over the others.

### Error Handlers

```python
@simple_page.errorhandler(404)
def page_not_found(e):
    return render_template('pages/404.html')
```

{% endraw %}
