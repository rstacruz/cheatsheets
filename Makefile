npmbin := ./node_modules/.bin
PORT ?= 3000

# Builds intermediate files. Needs a _site built first though
update: _site critical

# Builds _site
_site:
	bundle exec jekyll build --incremental

# Builds critical path CSS/JS
critical: _site
	node _support/critical.js

# Starts development server
dev:
	$(npmbin)/concurrently -k -p command -c "blue,green" \
		"make dev-webpack" \
		"make dev-jekyll"

dev-webpack:
	$(npmbin)/webpack --watch --colors -p

dev-jekyll:
	if [ -f _site ]; then \
		bundle exec jekyll serve --safe --trace --drafts --watch --incremental --port $(PORT); \
		else \
		bundle exec jekyll serve --safe --trace --drafts --watch --port $(PORT); \
		fi

test: _site
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
