FROM ruby:2.5.1-alpine3.7
RUN apk update && apk add --no-cache nodejs build-base
RUN apk add yarn --no-cache --repository http://dl-3.alpinelinux.org/alpine/v3.8/community/ --allow-untrusted
RUN mkdir -p /app
WORKDIR /app
# COPY Gemfile Gemfile.lock ./
# RUN bundle install -j 4
# COPY package.json yarn.lock ./
# RUN yarn
