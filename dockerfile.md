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
