
## Create an app

    heroku create sushi

## Custom domains

    heroku addon:add custom_domains

    heroku domains:add example.com
    heroku domains:add www.example.com

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
