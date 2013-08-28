## `create` - Create an app

    heroku create sushi

## `sharing` - Collaboration

    # Manage collaborators
      heroku sharing                     # List
      heroku sharing:add me@xy.com
      heroku sharing:remove me@xy.com

    # Transfer to another owner
      heroku sharing:transfer new@owner.com

## `pg` - Postgresql

    # Start a database
      heroku addons:add heroku-postgresql
      heroku pg:promote HEROKU_POSTGRESQL_PURPLE_URL

    # Enable backups
      heroku addons:add pgbackups:auto-month

## `ps` - Managing processes

    heroku ps              # list
    heroku ps:scale web=1  # spawn more dynos

## `run` - Running

    heroku run bash
    heroku run console                  # Rails console
    heroku run rake assets:precompile

## `config` - Environment var configuration

    heroku config        # List
    heroku config -s     # List in shell format

    heroku config:get KEY

    heroku config:set KEY=val
    heroku config:set KEY1=val KEY2=val ...

    heroku config:unset KEY1

## `apps` - Applications

    heroku apps                  # list
    heroku apps:create [NAME]
    heroku apps:destroy
    heroku apps:info
    heroku apps:open             # open in browser
    heroku apps:rename NEWNAME

## `domains` - Custom domains

      heroku addon:add custom_domains

    # Add both!
      heroku domains:add example.com
      heroku domains:add www.example.com

    # Removing:
      heroku domains:clear
      heroku domains:remove example.com

## DNS records

    # Root domains
    mydomain.com. (A)
      => 75.101.163.44
      => 75.101.145.87
      => 174.129.212.2

    # Subdomains
    .mydomain.com. (CNAME)
      => proxy.heroku.com

## Wildcard domains

    heroku addons:add wildcard_domains

    *.yourdomain.com => heroku.com

## htpasswd (for PHP apps)

Create an `.htaccess` file in the webroot:

    AuthUserFile /app/www/.htpasswd
    AuthType Basic
    AuthName "Restricted Access"
    Require valid-user

Create a `.htpasswd` file:

    $ htpasswd -c .htpasswd [username]

See https://gist.github.com/3316425

## References:

 * https://addons.heroku.com/
 * https://devcenter.heroku.com/
 * https://devcenter.heroku.com/articles/custom-domains
 * https://devcenter.heroku.com/articles/heroku-postgresql
