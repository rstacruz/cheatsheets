<style>
  h1{color:brown;}
  h2{color:green;}
  html,body{background-color:black;}
  body{margin:1%;border:2px solid yellow;}
  p{color:white;}
  pre{color:darkred;
    border:1px dashed yellow;
  }
  i{color:orange;}

</style>

# Overview
## What's jQuery:

jQuery is a fast, small, and feature-rich JavaScript library that makes HTML document traversal and manipulation, event handling, and animation much simpler and compatible with all browsers.

<p class="example">Example:</p>

```js
//with javascript:
var el = document.getElementById("start");
el.innerHTML = "Go";
// with jQuery, we need just a single line of code: 
$("#start").html("Go");

```
## Getting Started:
###### Three ways to get:
1. download a copy from [www.jquery.com](www.jquery.com)
2. include it from CDN Network(like google or microsoft) by
`<script src="https://code.jquery.com/jquery-3.1.1.js"></script>`

###### Good practice(This prevents any jQuery code from running before the document is finished loading):
```js
$(document).ready(function() {
   // jQuery code goes here
});
```
```js
// The same code but shorter:
$(function() {
   // jQuery code goes here
});
```
###### Syntax: select (query) HTML elements and perform "actions" on them:
`$("selector").action()`

###### Examples
  
```js
$("p").hide()  // hides all <p> elements
$(".demo").hide()  // hides all elements with class="demo"
$("#demo").hide()  // hides the element with id="demo"
```
## Selector
######  the jQuery selectors start with the dollar sign and parentheses: $(<i>selector</i>).

$("div.menu")  // all <div> elements with class="menu"

$("p:first")  // the first <p> element

$("h1, p") // all <h1> and all <p> elements

$("div p") // all <p> elements that are descendants of a <div> element

$("*")  // all elements of the DOM

![jquery-selector]()







