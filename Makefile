all:
	jekyll build

watch:
	jekyll serve &
	git ls-files | entr make
