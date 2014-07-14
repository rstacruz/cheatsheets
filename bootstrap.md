---
title: Bootstrap
layout: default
---

### Screen sizes

             768          992                1200
    '     '     '     '     '     '     '     '     '
    <---------^------------^------------------^--------->
            xs      sm              md             lg

Min:

    @media (min-width: @screen-sm-min)   /* small  >= 768px    tablet      */
    @media (min-width: @screen-md-min)   /* medium >= 992px    desktop     */
    @media (min-width: @screen-lg-min)   /* large  >= 1200px   big desktop */

Max:

    @media (max-width: @screen-xs-max)   /* xsmall  < 768px    phone   */
    @media (max-width: @screen-sm-max)   /* smalll  < 992px    tablet  */
    @media (max-width: @screen-md-max)   /* medium  < 1200px   desktop */

### Columns

    .container
    .container-fluid

    .col-xs-1
    .col-sm-1
    .col-md-1
    .col-lg-1

    .make-xs-column(12)
    .make-sm-column(6)
    .make-md-column(3)
    .make-lg-column(3)

### Utilities

    .pull-left
    .pull-right
