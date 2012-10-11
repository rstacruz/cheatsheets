title: vim
----

    .       - repeat last command
    ]p      - paste under the current indentation level

    `.      - Go to last edit
    ``      - Go to last jump

    C-o     - Go back to previous location (C-i forward)
    C-t     - Go back to last tag

Command line
------------

    <C-r><C-w> - insert current word into the command line
    <C-r>"     - paste from " register

Motions
-------

    vip           - Select paragraph
    vipipipip     - Select more

    ap            - a paragraph
    ip            - inner paragraph

    ap, ip        - Paragraph
    aw, iw        - Word
    as, is        - Sentence

    ab            - A block [(
    aB            - A block in [{
    at            - A XML tag block
    a[ ( { <      - A [], (), or {} block
    a' " `        - A quoted string

Example:

    yip - Yank inner paragraph
    yap - Yank paragraph (including newline)

Tags
----

      ^]      - Jump to definition
      g]      - See all definitions
      ^O ^I   - Back/forward

      :tselect Classname  - Find definitions of Classname
      :tjump Classname    - Find definitions of Classname (auto-select 1st)
      :tag Classname      - Jump to first definition of Classname

## My own customizations

    va{=     - reindent block
