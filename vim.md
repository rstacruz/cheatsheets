title: vim
----

    .    - repeat last command
    ]p   - paste under the current indentation level


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
