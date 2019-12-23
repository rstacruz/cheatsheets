```css
@charset 'utf-8';

$direction: 'left';

$font-type: sans-serif;

.foo {
  background-image: url('/images/kittens.jpg');
}

.foo {
  padding: 2em;
  opacity: 0.5;
}

$value:42;
$length: $value * 1px;
//==
$length: $value + 0px; //not recommended

//to remove unit
$length: 42px;
$value: $length / 1px;

.foo {
  width: (100% / 3);
}

//for magic number that just work and you dont' know the reason
//you should always comment it with as much explanations as possible
/**
 * 1. Magic number. This value is the lowest I could find to align the
 * top of '.foo' with its parent. Idelly, we should fix it properly.
 */
.foo {
  top: 0.234em; /* 1 */
}

.foo {
  color: hsl(0, 100%, 50%);
  color: rgb(255, 0, 0);
  color: rgba(0, 0, 0, 0.4);
}

$sass-pink: hsl(330, 50%, 60%);
$main-theme-color: $sass-pink;

//Slightly lighten a color
//@access public 
//@param {color} $color - color to tint
//@param {Number} $percentage - percentage of '$color' is returnet color
//@return {color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

//Slightly darken a color
//@access public
//@param {Color} $color - color to shade
//@param {Number} $percentage - percentage of '$color' in returned color
//@return {Color}
@function shade($color, $percentage){
  @return mix(black, $color, $percentage);
}

//lists
$font-stack: ('Helvetica', 'Arial', sans-serif);
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
);

//add an item to a list
$shadows: (0 42px 13.37px hotpink);
$shadow: 15px;
$shadows: append($shadows, $shadow, comma);


//maps or ssciative arrays, hashes or even JS objects.
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
);
@mixin ellipsis() {}
@mixin size($size){}
@mixin respond-to($size){@content}
.foo, .foo-bar, 
.baz {
  display: block;
  overlfow: hidden;
  margin: 0 auto;
}

.foo, .foo-bar,
.baz {
  $length: 42em;
  
  @include ellipsis;
  @include size($length);
  display: block;
  overflow: hidden;
  margin: 0 auto;
  
  &:hover {
    color: red;
  }
  
  @include respond-to('small') {
    overflow: visible;
  }
}
// this code generates .foo-bar selector
//BUT note that code is becoming ureacheble for search
.foo {
  &-bar {
    color: red;
  }
}

.foo {
  &.is-active {
    font-weight: bold;
  }
}

.foo {
  .no-opacity & {
    display: none;
  }
}

//Helper mixin to provide simple API to selector nesting
//@param {String} $selector - Selector
@mixin when-inside($selector) {
  #{$selector} & {
    @content;
  }
}

//variables
//functions
//mixins
$vertical-rhythm-baseline: 1.5rem;
@mixin size($width, $height: $width) {}
@function opposite-direction($direction){}

//constants
$CSS_POSITIONS: (top, right, bottom, left, center);

//use documentation for eveery mixin, function and variables
//so later it could be possible to generate HTML version of
//a given API

//Mixin helping defining both 'width' and 'height' simultaneously.
//
// @author Hugo Giraudel
//
// @acess public
//
// @param {Length} $width - Element's 'width'
// @param {Length} $height ($width) - Element's 'height'
//
//@example scss - Usage
//  .foo {
//    @include size(10em);
//  }
//
// .bar {
//    @include size(100%, 10em);
//  }
//
//  .example css - CSS output
//  .foo {
//    width: 10em;
//    height: 10em;
//    }
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}

## Components

    - 7-1 Pattern:
    - base/
    - components/
    - layout/
    - pages/ 
    - themes/
    - utils/
    - vendors/
    - main.scss

//shame file
//interesting concept of a file that is should be imported at the very and consist of hacks, black magic and other stuff you're not proud of

/**
  * Nav specificity fix.
  * Someone used and ID in the header code ('#header a {}') which 
  * trumps the nav selectors ('. site-nav a {}'). Use !important to 
  * override it until I have time to refactor the header stuff
 */
.site nav a  {
  color: #BADA55 !important;
}

//responsive web design and breakpoints

$breakpoints: (
  'medium': (min-width: 800px),
  'large' : (min-width: 1000px),
  'huge'  : (min-width: 1200px),
);

//breakpoint manager
// Responsive manager.
//@access public
//@param {String} $breakpoint - Breakpoint
//@requires $breakpoints
@mixin respont-to($breakpoint){
  $raw-query: map-get($breakpoints, $breakpoint);
  
  @if $raw-query {
    $query: if(type-of($raw-query) == 'string', unquote($raw-query), inspect($raw-query));
    
    @media #{$query} {
      @content;
    }
  } @else {
    @error 'No value found for '#{$breakpoint}'.'
          + 'Please make sure it is defined in '$breakpoints' map.';
  }
}
  
//media queries usage within selectors
.foo {
  color: red;
  
  @include respond-to('medium'){
    color: blue;
  }
}


//Variables

//Scoping
//variable shadowing concept
//Initialize a global variable at root level
$variable: 'initial value';
//Create a mixin that overrides that global variable.
@mixin global-variable-overriding {
  $variable: 'mixing value' !global; 
}
.local-scope::before {
  //Create a local variable that shadows the global one;
  $variable: 'local value';
  
  //Include the mixin: it overrides the global variable.
  @include global-variable-overriding;
}
//Print the variable in another selector that does no shadowing
//It is the **global**, as expected.
.other-local-scope::before {
  content: $variable;
}

//the variable to override by user
$baseline: 1em !default;

//multiple variables or maps
// Z-indexes map, gathering all Z layers of the application
// @access private
// @type Map
// @prop {String} key - Layer;s name
// @prop {Number} value - Z value mapped to the key
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);
//Get a z-index value from a layer name
//@access public
//@param {String} $layer - Layer's name
//@return {Number}
//@require $z-index
@function z($layer) {
  @return map-get($z-indexes, $layer);
}

//extend
%button {
  display: inline-block;
  //buton syles...
  //Relationship: a %button that is a child of a $modal
  %modal > & {
    display: block;
  }
}
.button {
  @extend %button;
}
.modal {
  @extend %modal;
}

//@extend media queries
%foo {
  content: 'foo';
}
@media print {
  .bar {
    @at-root(without: media) {
      @extend %foo;
    }
  }
}
%foo {
  content: 'foo';
  &-print {
    @media print {
      content: 'foo print';
    }
  }
}
@media print {
  .bar {
    @extend %foo-print;
  }
}

//@mixins

//Helper to clear inner floats
// @author Nicolas Gallagher
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
.boo {
  @include clearfix;
}

//Helper to size an element
// @author HUgo Giraudel
// @param {Length} $width
// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height; 
}

//argumentless mixins

//arguments list
@mixin shadows($shadow...){
  //type-of($shadows) == 'arglist'
  // ... 
}
@mixin dummy($a, $b, $c) {
  //...
}
@include dummy(true, 42, 'kittens');

$params: (true, 42, 'kittens');
@include dummy($params...);

$params: (
  'c': 'kittens',
  'a': true,
  'b': 42,
);
@include dummy($params...);

//vendor mixins
//Mixin helper to output vendor prefixes 
// @acess public
// @author HugoGiraudel
// @param {String} $property - Unprefixed CSS property
// @param {*} $value - Raw CSS value
// @param {List} $prefixes - List of prefixes to output
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'moz', 'ms'));
}

//conditional statements
$support-legacy: 'true';
@if $support-legacy {
  //...
} @else {
  //...
}
@if not index($support-legacy, $support-legacy) {
  //...
}

//Loops
$colors: ();
//iterate over a list
@each $theme in $support-legacy {
  .section-#{$theme} {
    background-color: map-get($colors, $theme);
  }
}
//iterate over a map
//use $key and $value
@each $key, $value in $colors {
  .section-#{$key} {
    background-color: $value;
  }
}
//for loop
@for $i from 1 through 10 {
  .foo:nth-of-type(#{$i}) {
    border-color: hsl($i * 36, 50%, 50%);
  }
}


/////////////////////////////////////////////////////////////////
//Sass: Mixin or Placeholder?
//link: http://www.sitepoint.com/sass-mixin-placeholder/
//
//
@mixin center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.container {
  @include center;
  //other styles go here
}

@mixin size($width, $height: $width){
  width: $width;
  height: $height;
}
.icon {
  @include size(32px);
}
//or
.cover {
  @include size(32px, 100%);
}

@mixin absolute($args){
  //List of offsets to check for in $args
  $offsets: top right bottom left;
  
  //We loop through $offsets to deal with them one by one
  @each $o in $offsets {
    //If current offset found in $args
    //assings its index to $i
    //Or 'false' if not found
    $i: index($args, $o);
    
    //Now we do the verification
    //1. Is the offset listed in $args? (not false)
    //2. Is the offset value within the list range? 
    //3. Is the offset value valid? 
    @if $i
    and $i + 1 <= length($args)
    and type-of(nth($args, $i + 1)) == number {
      
      //If everything is okay
      //We assign the according value to the current offset
        #{$o}: nth($args, $i + 1);
    }
  }
}

%center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.container {
  @extend %center;
}

/////////////////////////////////////////////////////////
// What Nobody Told You About Sass’s @extend
// link:http://www.sitepoint.com/sass-extend-nobody-told-you/
//
.message {
  padding: .5em;
}
.message-error {
  @extend .message;
}

.message + .message {
  margin-bottom: .5em;
}
.message-error {
  @extend .message;
}

.message {
  padding: .5em;
}
.important {
  font-weight: bold;
}
.message-error {
  @extend .message, .important;
}

/////////////////////////////////////////////////////////////////
//A Sass Component in 10 Minutes
//link: http://www.sitepoint.com/sass-component-10-minutes/
//
$message-types: (
  (error #b94a48)
  (valid #468847)
  (warning #c09853)
  (info #3a87ad)
) !default;
%message {
  padding: .5em;
  margin-bottom: .5em;
  border-radius: .15em;
  border: 1px solid;
}
@mixin message($color){
  @extend %message;
  color: $color;
  border-color: lighten($color, 20%);
  background: lighten($color, 40%);
}
//or
@each $message-type in $message-types {
  $type: nth($message-type, 1);
  $color: nth($message-type, 2);
  
  .message-#{$type} {
    @include message($color);
  }
}

/////////////////////////////////////////////////////////////
//Approaches to Media Queries in Sass
//link: https://css-tricks.com/approaches-media-queries-sass/
//
//In short article is about what aproach is most DRY
//and simple regarding @media queries.
//The final decission I can make out of it is that
//the best way is to use multidimensional list or map
//to store breakpoint name and value
//also it might be helpful to store $retina as well


////////////////////////////////////////////////////////////
//WAll You Ever Need to Know About Sass Interpolation
//link: https://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375
//
//interpolatin in scss from string
//the way it behaves is very similaru to ruby
$description: 'awesome';
@warn 'Tuts+ is #{$description}';

//in functions
$sidebar-width: 250px;

.main {
  width: calc(100% - #{$sidebar-width});
}

//in css directives
// @support , @page, @media
$value: screen;
@media #{$value} {
  //...
}
@media (max-width: $value) {
  //...
}

//selectors
$value: custom;
selector-#{$value} {
  property: value;
}


//////////////////////////////////////////////////////////
//MindBEMding – getting your head ’round BEM syntax
//link: https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
//
.block {}
.block__element {}
.block--modifier {}
//double hyphens cuz of
.site-search {}
.site-search__field {}
.site-search--full {}

