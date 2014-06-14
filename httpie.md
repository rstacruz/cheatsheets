---
title: httpie
layout: default
---

    $ http POST example.com/posts/3 \
        Origin:example.com  # :   HTTP headers
        name="John Doe" \   # =   JSON data
        q=="search" \       # ==  URL parameters
        age:=29 \           # :=  for non-strings
        token=@token.txt \  # =@  read from file (text)
        user:=@user.json \  # :=@ read from file (json)

### Forms

    $ http --form POST example.com \
        name="John Smith" \
        cv=@document.txt

### Options

    --pretty=none # all,colors,format

    --print=HBhb
      # H : request headers
      # B : request body
      # h : response headers
      # b : response body

    --output FILE (or -o)

    --follow
    --timeout SECONDS
    --verify no          # skip SSL verification

    --download
    --continue

    --session NAME
    --auth USER:PASS (or -a)
    --auth-type {basic,digest}

    --proxy http:http://foo.bar:3128


### References

 * https://github.com/jakubroztocil/httpie
