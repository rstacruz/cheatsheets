---
title: Go Command
category: Go
layout: 2017/sheet
updated: 2020-02-17
---

## Reference
{: .-three-column}

### Run program

```bash
# COMMAND: go run <main-file>
go run main.go
```

#### If there are multiple main files within the same package name, then all of the filenames need to be added as arguments

```bash
# COMMAND: go run <main-file> <main-file> <main-file> ...
go run main.go lib.go util.go
```

### Build program, generate executable/binary file

```bash
go build
```

#### The package name executable/binary name can be specified using `-o`

```bash
# COMMAND: go build -o <executable/binary-name>
go build -o binary
./binary
```

#### For windows program, ensure the binary name suffixed with `.exe`

```bash
go build -o binary.exe
binary.exe
```

### Run test

```bash
go test
```

#### Above command will perform tests on all files inside current directory. To perform test on all files including subdirectories, use below command.

```bash
go test ./...
```

#### Run test on specific scenario

```bash
# COMMAND: go test -run=<MATCH-KEYWORD>
go test -run=FooBar # will match TestFooBar, TestFooBarTwo, ...
```

#### Run data race test

```bash
go test -race ./...
```

#### Run benchmark test

```bash
# COMMAND: go test -bench=<DIRECTORY>
go test -bench=.

# COMMAND: go test -bench=<DIRECTORY> -benchtime=<DURATION>
go test -bench=. -benchtime=1h30s
go test -bench=. -benchtime=25s
go test -bench=. -benchtime=100x
```

#### Run coverage test

```bash
go test -cover ./...

# profile coverage test, generate the report in html
# COMMAND: go test -coverprofile <REPORT-OUTPUT-NAME>
go test -coverprofile report.html 
go tool cover -html=report.html
```

### Go Doc CLI

```bash
# show documentation of current directory
go doc -all
```

#### Show documentation of specific package

```bash
# COMMAND: go doc <PACKAGE-NAME>
go doc fmt
go doc encoding/json
go doc github.com/novalagung/gubrak/v2
```

#### Show documentation of specific API within certain package

```bash
# COMMAND: go doc <PACKAGE-NAME>.<API-NAME>
go doc fmt.Println
go doc encoding/json.Unmarshal
go doc github.com/novalagung/gubrak/v2.From
```

#### Show documentation including the unexported API

```bash
# COMMAND: go doc -u <PACKAGE-NAME>
go doc -u github.com/novalagung/gubrak/v2
```

#### Show documentation including the full source code

```bash
# COMMAND: go doc -u -src <PACKAGE-NAME>
# COMMAND: go doc -u -src <PACKAGE-NAME>.<API-NAME>
go doc -u -src github.com/novalagung/gubrak/v2.From
```

## Go Modules
{: .-three-column}

### Initialize go module on a project

```bash
# COMMAND: go mod init <project-name>
go mod init my-project
```

### Enable go module on a project inside `$GOPATH`. For unix or linux

```bash
GO111MODULE=on go run main.go
GO111MODULE=on go build
```

#### Enable go module on a project inside `$GOPATH`. For windows

```bash
SET GO111MODULE=on

go run main.go
go build
```

### Download dependency

```bash
# COMMAND: go get <package-url>
go get github.com/novalagung/gubrak/v2
```

#### Add flag `-u` to download or update dependency

```bash
# COMMAND: go get -u <package-url>
go get -u github.com/novalagung/gubrak/v2
```

#### Add missing and remove unused dependencies

```bash
go mod tidy
```

#### Download/tidy dependency from a private git repo

```bash
# simply add GIT_TERMINAL_PROMPT=1
GIT_TERMINAL_PROMPT=1 go get github.com/novalagung/gubrak/v2
GIT_TERMINAL_PROMPT=1 go mod tidy
```

#### Make vendored copy of dependencies. The command will generate new directory called `vendor` and all of dependencies used within the program will be copied into the folder.

```bash
go mod vendor
```

#### Perform run/build command using vendored dependencies via `-mod=vendor` flag

```bash
go run -mod=vendor main.go
go build -mod vendor
```

Also see
--------

- [Command go]([https://golang.org/cmd/go](https://golang.org/cmd/go))
- [Package cmd/go/internal/test doc]([https://golang.org/pkg/cmd/go/internal/test/](https://golang.org/pkg/cmd/go/internal/test/))
- [Using the go modules]([https://blog.golang.org/using-go-modules](https://blog.golang.org/using-go-modules))
- [Go modules wiki]([https://github.com/golang/go/wiki/Modules](https://github.com/golang/go/wiki/Modules))
