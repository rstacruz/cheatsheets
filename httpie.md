---
title: httpie
layout: default
---

    $ http POST example.com/posts/3 \
        Origin:example.com  # HTTP headers
        name="John Doe" \   # JSON data
        age:=29 \           # use := for non-strings
        token:=@token.txt \ # read from file (json or text)

### Forms

    $ http --form POST example.com \
        name="John Smith" \
        cv=@document.txt

### References

 * https://github.com/jakubroztocil/httpie
