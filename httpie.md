---
title: httpie
category: CLI
---

    $ http POST example.com/posts/3 \
        Origin:example.com  # :   HTTP headers
        name="John Doe" \   # =   string
        q=="search" \       # ==  URL parameters (?q=search)
        age:=29 \           # :=  for non-strings
        list:='[1,3,4]'     # :=  json
        token=@token.txt \  # =@  read from file (text)
        user:=@user.json \  # :=@ read from file (json)

### Forms

    $ http --form POST example.com \
        name="John Smith" \
        cv=@document.txt

### Options

    --pretty=none        # all,colors,format

    --print=HBhb
      # H : request headers
      # B : request body
      # h : response headers
      # b : response body

    -v, --verbose        # same as --print=HhBb

    -o, --output FILE

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
