PORT ?= 3000

start: bundle
	bundle exec jekyll serve --safe --drafts --watch --port ${PORT} --incremental

build: bundle
	bundle exec jekyll build --safe

bundle:
	ruby -v
	bundle
