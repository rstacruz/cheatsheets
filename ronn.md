title: Ronn
----

### Generating

    $ ronn foo.ronn

    $ ronn -r foo.ronn        # Creates foo.7

    $ ronn --html --style toc,80c foo.ronn
    
    # manual - top center
    # org    - bottom left
    $ ronn --manual="MY MANUAL" --organization="RONN 0.7.0"

See [ronn.1](http://rtomayko.github.com/ronn/ronn.1.html).

### Format

    name(1) -- short, single-sentence description
    =============================================
    
    ## SYNOPSIS
    
    `name` [<optional>...] <flags>
    
    ## DESCRIPTION
    
    A normal paragraph. This can span multiple lines and is terminated with two
    or more line endings -- just like Markdown.
    
    Inline markup for `code`, `user input`, and **strong** are displayed
    boldface; <variable>, _emphasis_, *emphasis*, are displayed in italics
    (HTML) or underline (roff).
    
### Linking

    Manual references like sh(1), markdown(7), roff(7), etc. are hyperlinked in
    HTML output.
    
    Link to sections like [STANDARDS][], [SEE ALSO][], or [WITH A DIFFERENT LINK
    TEXT][#SEE-ALSO].
    
### Definition lists
    
      * `-a`, `--argument`=[<value>]:
        One or more paragraphs describing the argument.
    
      * You can put whatever you *want* here, really:
        Nesting and paragraph spacing are respected.
    
### Frequently used sections
    
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

See [ronn-format.7](http://rtomayko.github.com/ronn/ronn-format.7.html).
