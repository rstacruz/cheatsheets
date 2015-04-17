---
title: Ronn
---

Ronn generates Man pages. See [ronn(1)](http://rtomayko.github.io/ronn/ronn.1.html), [ronn-format(7)](http://rtomayko.github.com/ronn/ronn-format.7.html), [rtomayko/ronn](https://github.com/rtomayko/ronn).
{:.center.brief-intro}

```sh
gem install ronn
```
{:.light}

```sh
ronn foo.1.md      # creates foo.1.html
ronn -r foo.1.md   # creates foo.1 (--roff)
ronn -m foo.1.md   # view as manpage
```
{:.light}

### Other options

```sh
--pipe                       # write to stdout
--server, -S                 # serve in http://localhost:1207

--html, -5                   # default
--fragment, -f               # html without header/title/footer

--style toc,80c              # toc (table of contents)
                             # 80c (use 80c instead of 100c)
                             # print (include print stylesheet)
                             # dark

--manual="MY MANUAL"         # shown on top-center
--organization="RONN 0.7.0"  # shown on bottom-left
--date="YYYY-MM-DD"          # shown on bottom-center
```

## Basic template
    
```markdown
name(1) -- short, single-sentence description
=============================================

## SYNOPSIS

`name` [<optional>...] <flags>

## DESCRIPTION

A normal paragraph. This can span multiple lines and is terminated with two
or more line endings just like Markdown.

## OPTIONS

  * `-R`, `--reporter`=[<name>] :
    Use the reporter <name>.

## EXAMPLES

Indent examples with 4 spaces.

    $ ls
    $ ls -la

## SEE ALSO

ronn-format(7), ronn(1)
```

## Formatting tags

```
Bold: `code` **strong**
Underline: <variable> _emphasis_ *emphasis*
```

### Linking

```
Manual references: sh(1) markdown(7)
Sections: [STANDARDS][], [SEE ALSO][], [DIFFERENT TEXT][#SEE-ALSO]
```
    
## Frequently-used sections
    
```markdown
## NAME
## SYNOPSIS
## DESCRIPTION
## OPTIONS
## SYNTAX
## ENVIRONMENT
## RETURN VALUES
## STANDARDS
## SECURITY CONSIDERATIONS
## BUGS
## HISTORY
## AUTHOR
## COPYRIGHT
## SEE ALSO
```

## Sections
See [Man page sections](http://www.december.com/unix/ref/mansec.html) (december.com).

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
