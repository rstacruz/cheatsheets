---
title: Bootstrap
layout: default
---

### Screen sizes

             768          992                1200
    '     '     '     '     '     '     '     '     '
    <---------^------------^------------------^--------->
         xs         sm              md             lg
       (phone)   (tablet)        (laptop)       (desktop)

Min:

    @media (min-width: @screen-sm-min) { /* >= 768px (small tablet) */
    @media (min-width: @screen-md-min) { /* >= 992px (medium laptop) */
    @media (min-width: @screen-lg-min) { /* >= 1200px (large desktop) */

Max:

    @media (max-width: @screen-xs-max) { /* < 768px (xsmall phone) */
    @media (max-width: @screen-sm-max) { /* < 992px (small tablet) */
    @media (max-width: @screen-md-max) { /* < 1200px (medium laptop) */

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

    .hidden-{xs,sm,md,lg}
    .visible-{xs,sm,md,lg}
    .visible-{xs,sm,md,lg,print}-{block,inline,inline-block}
