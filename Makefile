npmbin := ./node_modules/.bin
PORT ?= 3000
HOST ?= 127.0.0.1

help:
	@echo
	@echo Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo

# Builds intermediate files. Needs a _site built first though
update: _site critical

# Builds _site
_site:
	bundle exec jekyll build --incremental

critical: _site ## Builds critical path CSS/JS
	node _support/critical.js

# Ensure that bins are available.
ensure-bin:
	@if [ ! -d $(npmbin) ]; then \
		echo "---"; \
		echo "Error: $(npmbin) not found, you may need to run '[docker-compose run --rm web] yarn install'."; \
		echo "---"; \
		exit 1; \
		fi
	@if ! which jekyll &>/dev/null; then \
		echo "---"; \
		echo "Warning: Jekyll not found, you may need to run '[docker-compose run --rm web] bundle install'."; \
		echo "---"; \
		fi

dev: ensure-bin ## Starts development server
	$(npmbin)/concurrently -k -p command -c "blue,green" \
		"make dev-webpack" \
		"make dev-jekyll"

dev-webpack: ensure-bin
	$(npmbin)/webpack --watch --colors -p

dev-jekyll: ensure-bin
	if [ -f _site ]; then \
		bundle exec jekyll serve --safe --trace --drafts --watch --incremental --host $(HOST) --port $(PORT); \
		else \
		bundle exec jekyll serve --safe --trace --drafts --watch --host $(HOST) --port $(PORT); \
		fi

test: _site ## Runs rudimentary tests
	@test -f _site/vim.html
	@test -f _site/react.html
	@test -f _site/index.html
	@grep "<script src" _site/index.html >/dev/null
	@grep "<script src" _site/vim.html >/dev/null
	@grep "<script src" _site/react.html >/dev/null

test-warning:
	@echo "========="
	@echo "If your build failed at this point, it means"
	@echo "the site failed to generate. Check the project"
	@echo "out locally and try to find out why."
	@echo "========="
