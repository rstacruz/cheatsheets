version: '3'
services:
  web:
    build: .
    volumes:
      - .:/app
      - rubygems:/usr/local/bundle
      - ./node_modules:/app/node_modules
      - yarn_cache:/root/.cache/yarn
    ports:
      - '4001:4001'
      - '35729:35729'
    command: >
      bash -c 'yarn; bundle; env PORT=4001 HOST=0.0.0.0 yarn run dev'

volumes:
  rubygems:
  node_modules:
  yarn_cache:
