title: HTML
---

### H5BP HTML tag

    <!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
    <!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
    <!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
    <!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html class=""> <!--<![endif]-->

### IE conditionals

    <!--[if IE]>      I'm IE      <![endif]-->
    <!--[if !IE]> --> Not IE <!-- <![endif]-->

### iPhone viewport

    <meta name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>

### Google jQuery

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>

### Chrome frame

    <!--[if lt IE 8]>
    <div class="upgrade-banner">
      You are using an <strong>outdated</strong> browser.  Please <a 
      href="http://browsehappy.com/">
      upgrade your browser</a> or <a 
      href="http://www.google.com/chromeframe/?redirect=true">activate Google 
      Chrome Frame</a> to improve your experience.
    </div>
    <![endif]-->
