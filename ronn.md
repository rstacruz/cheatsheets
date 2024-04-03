---
title: Ronn
category: Ruby libraries
updated: 2017-10-15
weight: -1
prism_languages: [bash, ruby, json, markdown]
intro: |
  Ronn generates Man pages. See [ronn(1)](https://rtomayko.github.io/ronn/ronn.1.html), [ronn-format(7)](https://rtomayko.github.com/ronn/ronn-format.7.html). Also see it on GitHub: [rtomayko/ronn](httpss://github.com/rtomayko/ronn).
---

## Getting started
{: .-left-reference}

### Installation

#### Installation

```bash
gem install ronn
```

#### Usage

```bash
ronn foo.1.md        # creates foo.1.html
ronn -r foo.1.md     # creates foo.1 (--roff)
ronn -r -h foo.1.md  # builds --roff and --html
ronn -m foo.1.md     # view as manpage
```

Ronn is a Ruby gem.

### Basic template

```markdown
name(1) -- short, single-sentence description
=============================================

## SYNOPSIS

`name` [<optional>...] <flags>

## DESCRIPTION

A normal paragraph. This can span multiple lines and is terminated with two
or more line endings just like Markdown.

## OPTIONS

 * `-h`, `--help` :
   Displays the help screen.

 * `--version` : 
   Displays version information.

## EXAMPLES

Indent examples with 4 spaces.

    $ ls
    $ ls -la

## COPYRIGHT

**PROJECTNAME** is copyright (c) 2015, Rico Sta. Cruz. Released under the MIT
license.

## SEE ALSO

ronn-format(7), ronn(1)
```

## Formatting tags

### Inline

#### Bold

```
`code`
**strong**
```

#### Underline

```
<variable>
_emphasis_
*emphasis*
```

### Linking

#### Manual references

```
sh(1)
markdown(7)
```

#### Sections

```
[STANDARDS][]
[SEE ALSO][]
[DIFFERENT TEXT][#SEE-ALSO]
```

#### URL links

```
[URL link](https://github.com/rstacruz)
<https://github.com>
```

## Frequently-used sections
{: .-one-column}

### Sections

- `## SYNOPSIS`
- `## DESCRIPTION`
- `## OPTIONS`
- `## SYNTAX`
- `## ENVIRONMENT`
- `## RETURN VALUES`
- `## STANDARDS`
- `## SECURITY CONSIDERATIONS`
- `## BUGS`
- `## HISTORY`
- `## AUTHOR`
- `## COPYRIGHT`
- `## SEE ALSO`
{: .-four-column}

## Other CLI options

### Options

```bash
--pipe                       # write to stdout
--server, -S                 # serve in http://localhost:1207
```

```bash
--html, -5                   # default
--fragment, -f               # html without header/title/footer
```

```bash
--style=toc,80c              # toc (table of contents)
                             # 80c (use 80c instead of 100c)
                             # print (include print stylesheet)
                             # dark
```

```bash
--manual="MY MANUAL"         # shown on top-center
--organization="RONN 0.7.0"  # shown on bottom-left
--date="YYYY-MM-DD"          # shown on bottom-center
```

## Sections

| Section | Description                                   |
| ---     | ---                                           |
| `1`     | General commands                              |
| `2`     | System calls                                  |
| `3`     | C standard lib                                |
| `4`     | Special files (/dev) and drivers              |
| `5`     | File formats                                  |
| `6`     | Games                                         |
| `7`     | Misc                                          |
| `8`     | System administration commands and procedures |

See [Man page sections](https://www.december.com/unix/ref/mansec.html) (december.com).

## Using with npm

### npm scripts

Place manual files in `man/xxx.1.md`, then in package.json:
{: .-setup}

```json
"scripts": {
  "prepublish": "npm run build-man",
  "build-man": "if which ronn; then ronn man/*.md --html --roff --style=toc,80c --organization=\"@rstacruz\"; fi"
},
"directories": {
  "man": "man"
}
```

### marked-man

```
npm install -g marked-man
marked-man foo.1.md > foo.1
```

#### Differences

* No definition lists
* Can't use `<br>`

See [marked-man](https://github.com/kapouer/marked-man).

