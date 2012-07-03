title: vim
----

    .       - repeat last command
    ]p      - paste under the current indentation level
    `.      - Go to last edit
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

    {a,i}p        - Paragraph
    {a,i}w        - Word
    {a,i}s        - Sentence

    ab            - A block [(
    aB            - A block in [{
    at            - A XML tag block
    a[ ( { <      - A [], (), or {} block
    a' " `        - A quoted string


Example:

    yip - Yank inner paragraph
    yap - Yank paragraph (including newline)

SCSS!
-----

    va{=     - reindent block
