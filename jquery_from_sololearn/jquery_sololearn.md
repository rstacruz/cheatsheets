<style>
  h4,h6,p,pre{font-size:1.4em;}
  </style>
# Overview
## What's jQuery:

jQuery is a fast, small, and feature-rich JavaScript library that makes HTML document traversal and manipulation, event handling, and animation much simpler and compatible with all browsers.

#### Example:

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
```js
$("div.menu")  // all <div> elements with class="menu"
$("p:first")  // the first <p> element
$("h1, p") // all <h1> and all <p> elements
$("div p") // all <p> elements that are descendants of a <div> element
$("*")  // all elements of the DOM
```
![jquery-selector.jpeg](https://api.sololearn.com/DownloadFile?id=3119)

# Attributes:
## Get & Set Attribute Values

```js
$(function() {
  $("a").attr("href"); // get href attribute
  $("a").attr("href", "http://www.jquery.com"); // change the href attribute
});
```
## Removing Attributes
```js
// remove the 'border' and 'class' attributes from the table
$("table").removeAttr("border");
$("table").removeAttr("class");
```
## Get Content
```js
$("p").html(); // get the content of 'p' including the HTML markup
$("p").text(); // get the content of 'p' without the HTML markup
```
## Set Content (the existing content will lost.)
 ```js
$("#test").text("hello!"); // If the content you are setting contains
//HTML markup, you should use the html() method instead of text().
```
## Val() method (hint: the value attribute of forms elements)
```js

<input type="text" id="name" value="Your Name">(function() {
 $("#name").val(); // return "Your Name" OR:
 $"#name".val("New Name"); // change to "New Name"
});
```
## Adding Content and Elements (methods used to add new content to a selected element without deleting the existing content)
```js
$("#demo").append("David");//inserts content at the end of the selected elements.
$("#demo").prepend("David");// inserts content at the beginning of the selected elements.
$("#demo").before("<i>Some Title</i>");   // inserts content after the selected elements.
$("#demo").after("<b>Welcome</b>"); // inserts content before the selected elements.

```
## Adding new Elements:(using .append,.prepend,.before,.after)
```html
<p id="demo">Hello</p>
```
```js
var txt = $("<p></p>").text("Hi"); // create a new `<p>` element contains the text 'Hi'
$("#demo").after(txt);//insert the newly created <p> element after the #demo paragraph.
// add multiple elemens as a comma separated arguments
$("#demo").append(var1, var2, var3).// the same way for prepend(),after(),before().

```
# Manipulating CSS

## Adding & Removing Classes
#### addClass()/ removeClass() and toggleClass().
```html
<div>Some text</div>
```
```css
.header {
  color: blue;
  font-size:x-large;
}
.header-bg{
  background-color: yellow;
}
.header-border{
  border:2px dashed green;
}
```

```js
$("div").addClass("header"); // assigns the class 'header' to the div element
$("div").addClass("header-bg header-header-border"); // assign multi class to the div element
$("div").remveClass("header header-bg") // remove the classes .header and .header-bg
$("div").toggleClass("header");// remove it if existed or add it to the element if not.
```

## CSS Properties
```js
// for single css property
$(function() {
  $("p").css("background-color"); // return the CSS background-color property 'values'
  $("p").css("background-color", "blue"); // set the CSS background-color property to 'blue'
});
// for multiple css properties, use JSON syntax: css({"property":"value","property":"value",...});
$("p").css({"color": "red", "font-size": "200%"}); //This will set the color and font-size properties of the paragraph.
```
## Dimensions
<b>Note</b> : Adding arguments to these methods will change(set) element dimension properties.
- The `width()` and `height()` (hint: `content`) methods get and set(by passing argument) the dimensions without the padding, borders and margins.
- The `innerWidth()` and `innerHeight()` (hint: `padding`) methods also include the padding.
- The `outerWidth() and outerHeight()`  (hint: `border`) methods include the padding and borders.
Check out this image to understand how they work:
![HTML Element- Dimensions](https://api.sololearn.com/DownloadFile?id=3120)
---

# Manipulate DOM
## The DOM

#### DOM Traversal:
<b>`(the term  used to describe the process of moving through the DOM and finding (selecting) HTML elements based on their relation to other elements.)`</b>

![Consider this structure:](https://api.sololearn.com/DownloadFile?id=3085)
<br>

- The `<html>` element is the parent of `<body>` and an ancestor of everything belo`w it.
- The `<body>` element is the parent of the `<h1>` and `<a>` elements.
- The `<h1>` and `<a>` elements are child elements of the `<body>` element and descendants of `<html>`.
- The `<h1>` and `<a>` elements are siblings (they share the same parent).
- An `ancestor` is a parent, grandparent, great-grandparent, and so on.
- A `descendant` is a child, grandchild, great-grandchild, and so on.
Siblings share the same parent.


## Traversing

The parent() method returns the direct parent element of the selected element. <b>Note:</b>
The parent() method can only traverse a single level up the DOM tree.

```html
<div> div element<p>paragraph</p></div>
```
```js
var e = $("p").parent();
e.css("border", "2px solid red");
```
#### Most used traversal methods are presented below: 
![](https://api.sololearn.com/DownloadFile?id=3044)

#### eq() method: 

select a specific element from multiple selected elements.
For example, if the page contains multiple div elements and we want to select the **third one**: `$("div").eq(2);`

## Removing Elements
- remove selected elements from the DOM using the remove() method:
```$("p").eq(1).remove();```
- use `remove` method to remove multiple selected elements(including its child elements): `$("p").remove()`.

> For example: to remove all siblings of the element with id="txt": `("#txt")siblings().remove();`


#### Removing Contents:
- To remove (leave it empty- no children) the child elements of the selected element(s):
`$("div").empty();`
> For Example: to empty the second child element of the element with id="nav":\
`var e = $("#nav").children();`
`e.eq(2).empty();`


# Events
## Handling Events:
- `click`: To handle the click event on an element with id="demo" and display the current date when the button is clicked.
```js
$("#demo").click(function() {
  $("body").html(Date());
});
```
- `keydown`:  To handle the keydown event for the element with id="name" and assigns the content of the div with id="msg" the value of the input field.
```js
$("#name").keydown(function() {
  $("#msg").html($("#name").val());
});
```
- Another way to handle events in jQuery is by using the `on()` method.
The on() method is used to attach an event to the selected element:
```js
$( "p" ).on( "click", function() {
  alert("clicked");
});
```
  > The `on()` method is useful for binding the same handler function to multiple events. You can provide multiple event names separated by spaces as the first argument. 
- You can remove event handlers using the `off()` method:
```js
$("div").on("click", function() { 
  alert('Hi there!'); 
  $("div").off("click");
});
```
## The Event Object
#### Every event handling function can receive an event object, which contains properties and methods related to the event:
- `pageX, pageY` the mouse position (X & Y coordinates) at the time the event occurred, relative to the top left of the page.
- `type` the type of the event (e.g. "click").
- `which` the button or key that was pressed.
- `data` any data that was passed in when the event was bound.
- `target` the DOM element that initiated the event.
- `preventDefault()` prevent the default action of the event (e.g., following a link).
- `stopPropagation()` Stop the event from bubbling up to other elements.

#### For Examples: To handle the click event on an <a> element and prevent it from following the link provided in the href attribute:

```html
 <a href="https://www.sololearn.com">Click me</a>
```
```js
 $(function() {
 $( "a" ).click(function(event) {
        alert(event.pageX);
        event.preventDefault();
    });
});
```
#### Trigger Event: (trigger a click event without the user actually clicking on an element:)
```js
$("div").click(function() {
alert("Clicked!");
});
$("div").trigger("click");
```

