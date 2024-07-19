FROM node:20-alpine AS builder

# Update and add ruby
RUN apk -U --no-cache upgrade && \
    apk add ruby

# Add bundler
RUN gem install bundle

WORKDIR /app

# Expose Port
ENV PORT 4001
ENV ASTRO_TELEMETRY_DISABLED=1
# EXPOSE 4001

# Copy everything for now
# [TODO] Slim this down
COPY . .

# Install dependencies
RUN yarn install
RUN bundle install

# RUN npx astro telemetry disable

# Start
ENTRYPOINT [ "yarn", "run", "dev" ]
