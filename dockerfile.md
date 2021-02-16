---
title: Dockerfile
category: Devops
layout: 2017/sheet
prism_languages: [docker]
updated: 2019-10-20
---

## Reference
{: .-three-column}

### Inheritance

```docker
FROM ruby:2.2.2
```

### Variables

```docker
ENV APP_HOME /myapp
RUN mkdir $APP_HOME
```

```docker
ARG APP_HOME=""
RUN mkdir $APP_HOME
```

### Initialization

```docker
RUN bundle install
```

```docker
WORKDIR /myapp
```

```docker
VOLUME ["/data"]
# Specification for mount point
```

```docker
ADD file.xyz /file.xyz
COPY --chown=user:group host_file.xyz /path/container_file.xyz
```

### Onbuild

```docker
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
```

Configures a container that will run as an executable.

```docker
ENTRYPOINT exec top -b
```

This will use shell processing to substitute shell variables, and will ignore any `CMD` or `docker run` command line arguments.

### Metadata

```docker
LABEL version="1.0"
```

```docker
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
```

```docker
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

## See also
{: .-one-column}

- <https://docs.docker.com/engine/reference/builder/>
