npmbin := ./node_modules/.bin
PORT ?= 3000
HOST ?= 127.0.0.1

help:
	@echo
	@echo Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo

# Builds intermediate files. Needs a _site built first though
update: _site

# Builds _site
_site:
	yarn build

dev: 
	yarn dev
