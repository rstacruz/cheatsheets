---
title: Dockerfile
category: Devops
layout: 2017/sheet
---

## Reference
{: .-three-column}

### Inheritance

```
FROM ruby:2.2.2
```

### Variables

```
ENV APP_HOME /myapp
RUN mkdir $APP_HOME
```

### Initialization

```
RUN bundle install
```

```
WORKDIR /myapp
```

```
VOLUME ["/data"]
# Specification for mount point
```

```docker
ADD file.xyz /file.xyz
COPY --chown=user:group host_file.xyz /path/container_file.xyz
```

### Onbuild

```bash
ONBUILD RUN bundle install
# when used with another file
```

### Commands

```docker
EXPOSE 5900
CMD    ["bundle", "exec", "rails", "server"]
```

### Entrypoint

```docker
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
# an ENTRYPOINT allows you to configure a container that will run as an executable.
```

```docker
ENTRYPOINT exec top -b
# this form will use shell processing to substitute shell environment variables, and will ignore any CMD or docker run command line arguments
```

### Metadata

```docker
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
# add a metada
```

## See also
{: .-one-column}

- <https://docs.docker.com/engine/reference/builder/>
