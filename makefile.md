### Safe assignment

    prefix ?= /usr/local

### Cool stuff

		gitdir ?= $(shell git --exec-path)
		gitver ?= $(word 3,$(shell git --version))

### Substitutions

		$(SOURCE:.cpp=.o)
		$(patsubst %.cpp, %.c, $(SOURCES))

### Building files

		%.o: %.c
			ffmpeg -i $< > $@   # Input and output
			foo $^

### Default task

		default:
			@echo "hello."
			@false

