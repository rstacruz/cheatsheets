---
title: Dockerfile
category: Devops
---

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

### Onbuild

```docker
ONBUILD RUN bundle install   # when used with another file
```

### Commands

```docker
EXPOSE 5900
CMD    ["bundle", "exec", "rails", "server"]
```

### Reference

- <https://docs.docker.com/engine/reference/builder/>
