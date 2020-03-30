| title | category |
| --- | --- |
| dat | CLI |

### Installation

```bash
$ wget -qO- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
# Installation using wget
# --------
$ curl -o- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
# Installation using curl
# --------
$ npm install -g dat
# Installation using npm (node package manager)
```

### Serving Files

```bash
$ dat create [<dir>] [--title TITLE] [--description DESCRIPTION]
# <dir> defaults to .
# --------
$ dat share [-d <dir>]	# <dir> defaults to .
```

### Download Files

```bash
$ dat clone dat://<key> [<dir>] # Replace <key> with server generated key
# <dir> defaults to <key>
$ dat dat://<key> [<dir>]	# shorthand for dat clone
# --------
$ dat sync [<dir>]	# sync already cloned dir for changes
# <dir> defaults to .
```

