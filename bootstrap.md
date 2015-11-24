---
title: Bootstrap
---

### Screen sizes

             768          992                1200
    '     '     '     '     '     '     '     '     '
    <---------^------------^------------------^--------->
         xs         sm              md             lg
       (phone)   (tablet)        (laptop)       (desktop)

Min:

    @media (min-width: @screen-sm-min) { // >= 768px (small tablet)
    @media (min-width: @screen-md-min) { // >= 992px (medium laptop)
    @media (min-width: @screen-lg-min) { // >= 1200px (large desktop)

Max:

    @media (max-width: @screen-xs-max) { // < 768px (xsmall phone)
    @media (max-width: @screen-sm-max) { // < 992px (small tablet)
    @media (max-width: @screen-md-max) { // < 1200px (medium laptop)

### Columns

    .container
    .container-fluid

    .col-xs-1
    .col-sm-1
    .col-md-1
    .col-lg-1
    .col-md-offset-1

    .make-xs-column(12)
    .make-sm-column(6)
    .make-md-column(3)
    .make-lg-column(3)

    .make-sm-column-offset(1)
    .make-sm-column-push(1)
    .make-sm-column-pull(1)

### Utilities

    .pull-left
    .pull-right

    .hidden-{xs,sm,md,lg}
    .visible-{xs,sm,md,lg}
    .visible-{xs,sm,md,lg,print}-{block,inline,inline-block}

    .center-block  /* margin: auto */
    .clearfix
    .text-{center,left,right,justify,nowrap}
    .text-{lowercase,uppercase,capitalize}

    .show
    .hidden

### Modal

    <a data-toggle='modal' data-target='#new'>

    #new.modal.fade(role='dialog')
      .modal-dialog // .modal-lg, .modal-sm
        .modal-content
          .modal-header
            %h4.modal-title hello
            %button.close{type: 'button', data: { dismiss: 'modal' }}
              %span{'aria-hidden' => true}!= "&times;"
              %span.sr-only Close
          .modal-body
            ...
          .modal-footer
            ...

### Modal via ajax (Rails)

    %button.btn{data: { |
      toggle: 'modal', |
      target: '#chooseTheme', |
      remote: '/path/to/remote'}
      Change Theme

    .modal.fade#chooseTheme
      .modal-dialog.modal-xl
        .modal-content
          .modal-header
            %h4.modal-title Choose a theme

          .modal-body
            .spinner-panel.-lg
              %i

### Tooltip

    data-toggle='tooltip'
    title='tooltip'
    data-placement='left|top|bottom|right'

    $(function () {
      $('[data-toogle~="tooltip"]').tooltip();
    });
