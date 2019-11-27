<style>
body{background-color:#222;color:yellowgreen;}
h1{color:red;}
h2{color:green;border:2px solid blue;padding-left:19px;border-radius:45px;}
</style>
# jQuery Basics
## jQuery Get Started

> can be downloaded from jQuery.com.

 ```html
<head> <script src="jquery-3.4.1.min.js"></script> </head>
```

> To use jQuery from Google or Microsoft, use one of the following:
```html
<!-- CDN from google -->
<script src=
"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
</script>
<!-- or From Microsoft -->
<script src=
"https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js">
</script>
```

> append jQuery into current page using console:

```js
var jquery=document.createElement("script");
jquery.src="https://code.jquery.com/jquery-1.9.1.min.js";
document.body.appendChild(jquery);

```
## jQuery Syntax

>  Basic syntax is:
    ```js
    $(selector).action()
    ```
- A `$` sign to define/access jQuery
- A `(selector)` to "query (or find)" HTML elements
- A jQuery `action()` to be performed on the element(s)

> prevent any jQuery code from running before the document is finished loading (is ready):
```js
 $(document).ready(function(){ // this is the preferred way:
  // jQuery methods go here...
});
// OR:
$(function(){
  // jQuery methods go here...
});
```

## jQuery Selectors
> Query selectors are used to "find" (or select) HTML elements based on their name, id, classes, types, attributes, values of attributes and much more. It's based on the existing CSS Selectors, and in addition, it has some own custom selectors.
<style>table tr td{border:1px solid black;}</style>
<table class="w3-table-all notranslate">
<tbody><tr>
<th style="width:20%">Selector</th>
<th style="width:25%">Example</th>
<th>Selects</th>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_all.asp" target="_blank">*</a></td>
<td>$("*")</td>
<td>All elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_id.asp" target="_blank">#<em>id</em></a></td>
<td>$("#lastname")</td>
<td>The element with id="lastname"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_class.asp" target="_blank">.<em>class</em></a></td>
<td>$(".intro")</td>
<td>All elements with class="intro"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_multiple_classes.asp" target="_blank">.<em>class,</em>.<em>class</em></a></td>
<td>$(".intro,.demo")</td>
<td>All elements with the class "intro" or "demo"</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_element.asp" target="_blank"><em>element</em></a></td>
<td>$("p")</td>
<td>All &lt;p&gt; elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_multiple_sel.asp" target="_blank"><em>el1</em>,<em>el2</em>,<em>el3</em></a></td>
<td>$("h1,div,p")</td>
<td>All &lt;h1&gt;, &lt;div&gt; and &lt;p&gt; elements</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_first.asp" target="_blank">:first</a></td>
<td>$("p:first")</td>
<td>The first &lt;p&gt; element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_last.asp" target="_blank">:last</a></td>
<td>$("p:last")</td>
<td>The last &lt;p&gt; element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_even.asp" target="_blank">:even</a></td>
<td>$("tr:even")</td>
<td>All even &lt;tr&gt; elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_odd.asp" target="_blank">:odd</a></td>
<td>$("tr:odd")</td>
<td>All odd &lt;tr&gt; elements</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_firstchild.asp" target="_blank">:first-child</a></td>
<td>$("p:first-child")</td>
<td>All &lt;p&gt; elements that are the first child of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_firstoftype.asp" target="_blank">:first-of-type</a></td>
<td>$("p:first-of-type")</td>
<td>All &lt;p&gt; elements that are the first &lt;p&gt; element of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_lastchild.asp" target="_blank">:last-child</a></td>
<td>$("p:last-child")</td>
<td>All &lt;p&gt; elements that are the last child of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_lastoftype.asp" target="_blank">:last-of-type</a></td>
<td>$("p:last-of-type")</td>
<td>All &lt;p&gt; elements that are the last &lt;p&gt; element of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_nthchild.asp" target="_blank">:nth-child(<em>n</em>)</a></td>
<td>$("p:nth-child(2)")</td>
<td>All &lt;p&gt; elements that are the 2nd child of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_nthlastchild.asp" target="_blank">:nth-last-child(<em>n</em>)</a></td>
<td>$("p:nth-last-child(2)")</td>
<td>All &lt;p&gt; elements that are the 2nd child of their parent, counting from the
last child</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_nthoftype.asp" target="_blank">:nth-of-type(<em>n</em>)</a></td>
<td>$("p:nth-of-type(2)")</td>
<td>All &lt;p&gt; elements that are the 2nd &lt;p&gt; element of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_nthlastoftype.asp" target="_blank">:nth-last-of-type(<em>n</em>)</a></td>
<td>$("p:nth-last-of-type(2)")</td>
<td>All &lt;p&gt; elements that are the 2nd &lt;p&gt; element of their parent, counting from the
last child</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_onlychild.asp" target="_blank">:only-child</a></td>
<td>$("p:only-child")</td>
<td>All &lt;p&gt; elements that are the only child of their parent</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_onlyoftype.asp" target="_blank">:only-of-type</a></td>
<td>$("p:only-of-type")</td>
<td>All &lt;p&gt; elements that are the only child, of its type, of their parent</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_parent_child.asp" target="_blank">parent &gt; child</a></td>
<td>$("div &gt; p")</td>
<td>All &lt;p&gt; elements that are a direct child of a &lt;div&gt; element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_parent_descendant.asp" target="_blank">parent descendant</a></td>
<td>$("div p")</td>
<td>All &lt;p&gt; elements that are descendants of a &lt;div&gt; element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_previous_next.asp" target="_blank">element + next</a></td>
<td>$("div + p")</td>
<td>The &lt;p&gt; element that are next to each &lt;div&gt; elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_previous_siblings.asp" target="_blank">element ~ siblings</a></td>
<td>$("div ~ p")</td>
<td>All &lt;p&gt; elements that are siblings of a &lt;div&gt; element</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_eq.asp" target="_blank">:eq(<em>index</em>)</a></td>
<td>$("ul li:eq(3)")</td>
<td>The fourth element in a list (index starts at 0)</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_gt.asp" target="_blank">:gt(<em>no</em>)</a></td>
<td>$("ul li:gt(3)")</td>
<td>List elements with an index greater than 3</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_lt.asp" target="_blank">:lt(<em>no</em>)</a></td>
<td>$("ul li:lt(3)")</td>
<td>List elements with an index less than 3</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_not.asp" target="_blank">:not(<em>selector</em>)</a></td>
<td>$("input:not(:empty)")</td>
<td>All input elements that are not empty</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_header.asp" target="_blank">:header</a></td>
<td>$(":header")</td>
<td>All header elements &lt;h1&gt;, &lt;h2&gt; ...</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_animated.asp" target="_blank">:animated</a></td>
<td>$(":animated")</td>
<td>All animated elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_focus.asp" target="_blank">:focus</a></td>
<td>$(":focus")</td>
<td>The element that currently has focus</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_contains.asp" target="_blank">:contains(<em>text</em>)</a></td>
<td>$(":contains('Hello')")</td>
<td>All elements which contains the text "Hello"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_has.asp" target="_blank">:has(<em>selector</em>)</a></td>
<td>$("div:has(p)")</td>
<td>All &lt;div&gt; elements that have a &lt;p&gt; element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_empty.asp" target="_blank">:empty</a></td>
<td>$(":empty")</td>
<td>All elements that are empty</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_parent.asp" target="_blank">:parent</a></td>
<td>$(":parent")</td>
<td>All elements that are a parent of another element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_hidden.asp" target="_blank">:hidden</a></td>
<td>$("p:hidden")</td>
<td>All hidden &lt;p&gt; elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_visible.asp" target="_blank">:visible</a></td>
<td>$("table:visible")</td>
<td>All visible tables</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_root.asp" target="_blank">:root</a></td>
<td>$(":root")</td>
<td>The document's root element</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_lang.asp" target="_blank">:lang(<em>language</em>)</a></td>
<td>$("p:lang(de)")</td>
<td>All &lt;p&gt; elements with a lang attribute value starting with "de"</td>
</tr>

<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute.asp" target="_blank">[<em>attribute</em>]</a></td>
<td>$("[href]")</td>
<td>All elements with a href attribute</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_equal_value.asp" target="_blank">[<em>attribute</em>=<em>value</em>]</a></td>
<td>$("[href='default.htm']")</td>
<td>All elements with a href attribute value equal to "default.htm"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_notequal_value.asp" target="_blank">[<em>attribute</em>!=<em>value</em>]</a></td>
<td>$("[href!='default.htm']")</td>
<td>All elements with a href attribute value not equal to "default.htm"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_end_value.asp" target="_blank">[<em>attribute</em>$=<em>value</em>]</a></td>
<td>$("[href$='.jpg']")</td>
<td>All elements with a href attribute value ending with ".jpg"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_prefix_value.asp" target="_blank">[<i>attribute</i>|=<i>value</i>]</a></td>
<td>$("[title|='Tomorrow']")</td>
<td>All elements with a title attribute value equal to 'Tomorrow', or starting
with 'Tomorrow' followed by a hyphen</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_beginning_value.asp" target="_blank">[<i>attribute</i>^=<i>value</i>]</a></td>
<td>$("[title^='Tom']")</td>
<td>All elements with a title attribute value starting with "Tom"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_contains_value.asp" target="_blank">[<i>attribute</i>~=<i>value</i>]</a></td>
<td>$("[title~='hello']")</td>
<td>All elements with a title attribute value containing the specific word "hello"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_attribute_contains_string_value.asp" target="_blank">[<i>attribute*</i>=<i>value</i>]</a></td>
<td>$("[title*='hello']")</td>
<td>All elements with a title attribute value containing the word "hello"</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input.asp" target="_blank">:input</a></td>
<td>$(":input")</td>
<td>All input elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_text.asp" target="_blank">:text</a></td>
<td>$(":text")</td>
<td>All input elements with type="text"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_password.asp" target="_blank">:password</a></td>
<td>$(":password")</td>
<td>All input elements with type="password"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_radio.asp" target="_blank">:radio</a></td>
<td>$(":radio")</td>
<td>All input elements with type="radio"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_checkbox.asp" target="_blank">:checkbox</a></td>
<td>$(":checkbox")</td>
<td>All input elements with type="checkbox"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_submit.asp" target="_blank">:submit</a></td>
<td>$(":submit")</td>
<td>All input elements with type="submit"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_reset.asp" target="_blank">:reset</a></td>
<td>$(":reset")</td>
<td>All input elements with type="reset"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_button.asp" target="_blank">:button</a></td>
<td>$(":button")</td>
<td>All input elements with type="button"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_image.asp" target="_blank">:image</a></td>
<td>$(":image")</td>
<td>All input elements with type="image"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_file.asp" target="_blank">:file</a></td>
<td>$(":file")</td>
<td>All input elements with type="file"</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_enabled.asp" target="_blank">:enabled</a></td>
<td>$(":enabled")</td>
<td>All enabled input elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_disabled.asp" target="_blank">:disabled</a></td>
<td>$(":disabled")</td>
<td>All disabled input elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_selected.asp" target="_blank">:selected</a></td>
<td>$(":selected")</td>
<td>All selected input elements</td>
</tr>
<tr>
<td><a href="https://www.w3schools.com/jquery/sel_input_checked.asp" target="_blank">:checked</a></td>
<td>$(":checked")</td>
<td>All checked input elements</td>
</tr>
</tbody></table>


> Instead of putting the jQuery functions inside the `<head> section; you can put your jQuery functions in a separate .js file:

```html
<head>
<script src=
"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
</script>
<script src="my_jquery_functions.js"></script>
</head>
```

## jQuery Events
> Syntax of Event Methods:

```js
$("p").click(); // assign a click event to all paragraphs on a page.
```
>Next step is to define what should happen when the event fires. You must pass a function to the event:
```js
$("p").click(function(){
  // action goes here!!
});
```
> Commonly Used jQuery Event Methods:
```js
$("p").click(function(){
  $(this).hide(); // When a click event fires on a <p> element; hide the current <p> element.
});
$("p").dblclick(function(){
  $(this).hide();
//executed when the user double-clicks on the HTML element.
});
// mouseenter(): when the mouse pointer enters the HTML element.
$("#p1").mouseenter(function(){
  alert("You entered p1!");
});
// mouseleave(): when the mouse pointer leaves the HTML element
$("#p1").mouseleave(function(){
  alert("Bye! You now leave p1!");
});
// mousedown(): when the left, middle or right mouse button is pressed down,
// while the mouse is over the HTML element.
$("#p1").mousedown(function(){
  alert("Mouse down over p1!");
});
// mouseup(): when the left, middle or right mouse button is released,
//while the mouse is over the HTML element.
$("#p1").mouseup(function(){
  alert("Mouse up over p1!");
});
/* The hover() method takes two functions and is a combination of the mouseenter() and
mouseleave() methods. first function is executed when the mouse
enters the HTML element, and the second function is executed
when the mouse leaves the HTML element:*/
$("#p1").hover(function(){
  alert("You entered p1!");
},
function(){
  alert("Bye! You now leave p1!");
});
// focus(): The function is executed when the form field gets focus:
$("input").focus(function(){
  $(this).css("background-color", "#cccccc");
});
// blur(): executed when the form field loses focus:
$("input").blur(function(){
  $(this).css("background-color", "#ffffff");
});
// on(): method attaches one or more event handlers for the selected elements;
// - Attach a click event to a <p> element:
$("p").on("click", function(){
  $(this).hide();
});
// - Attach multiple event handlers to a <p> element:
$("p").on({
  mouseenter: function(){
    $(this).css("background-color", "lightgray");
  },
  mouseleave: function(){
    $(this).css("background-color", "lightblue");
  },
  click: function(){
    $(this).css("background-color", "yellow");
  }
});
```
---


# jQuery Effects

## jQuery Hide/Show
> With jQuery, you can hide and show HTML elements:
```js
$("#hide").click(function(){
  $("p").hide();
});
$("#show").click(function(){
  $("p").show();
});
```
> Syntax:
```
$(selector).hide(speed,callback);
$(selector).show(speed,callback);
```
> Note: The optional speed parameter specifies the speed of the
hiding/showing, and can take the following values:  
<b><u>"slow", "fast", or milliseconds.</u></b>

> toggle(): $(selector).toggle(speed,callback);
```js
$("button").click(function(){
  $("p").toggle();// Shown elements are hidden and hidden elements are shown.
});
```

## jQuery Fade
> With jQuery you can fade an element in and out of visibility.

> jQuery has the following fade methods:

```js
// fadeIn(): To fade in a hidden element.
$(selector).fadeIn(speed,callback);
```
> Example:
```js
$("button").click(function(){
  $("#div1").fadeIn();
  $("#div2").fadeIn("slow");
  $("#div3").fadeIn(3000);
});
```
```js
// fadeOut(): fadeOut() method is used to fade out a visible element.
$(selector).fadeOut(speed,callback);
// The optional callback parameter is a function to be executed after the fading completes.
```
> Example:
```js
$("button").click(function(){
  $("#div1").fadeOut();
  $("#div2").fadeOut("slow");
  $("#div3").fadeOut(3000);
});
```
```js
//fadeToggle() method toggles between the fadeIn()[if fadded out] and
//fadeOut()[if fadded in] methods:
$(selector).fadeToggle(speed,callback);
```
> Example:
```js
$("button").click(function(){
  $("#div1").fadeToggle();
  $("#div2").fadeToggle("slow");
  $("#div3").fadeToggle(3000);
});
```
```js
//fadeTo() method allows fading to a given opacity
// (value between 0 and 1).
$(selector).fadeTo(speed,opacity,callback);
```
> Example:
```js
$("button").click(function(){
  $("#div1").fadeTo("slow", 0.15);
  $("#div2").fadeTo("slow", 0.4);
  $("#div3").fadeTo("slow", 0.7);
});
```

## jQuery Slide

> jQuery has the following slide methods:

```js
slideDown(): `$(selector).slideDown(speed,callback);`
 //The jQuery slideDown() method is used to slide
 //down(shows) an element:
 $("#flip").click(function(){
// $("#panel").slideDown();
//            .slideUp(); => slideUp(hides) an element.
//            .slideToggle()
});
/*
Try it:  [https://www.w3schools.com/jquery/tryit.asp?filename=
tryjquery_slide_down]
*/
```
<style>em.disc{background-color:#FFF;}</style>

## jQuery Animate: <em class="disc">Perform a custom animation of a set of CSS properties.</em>
> Syntax:
`$(selector).animate({params},speed,callback);`
where:

- `params` parameter defines the CSS properties to be animated.
- The optional `speed` parameter specifies the duration of the effect(slow,fast,milliseconds).
- The optional `callback` parameter is a function to be executed after the animation completes.

> Basic Example:
```js
 $("button").click(function(){
   moves a <div> element to the right, until it has reached a left property of 250px:
  $("div").animate({left: '250px'});
});  
```

> Example:
[https://jsbin.com/mazufutohe/1/edit?html,output]
Click the button to animate the div with a number of different properties.
> Note: All jQuery effects, including `.animate()`, can be turned off globally by setting `jQuery.fx.off = true`

---
> jQuery `animate()` - Manipulate Multiple Properties:
<em class=note>Is it possible to manipulate ALL CSS properties with the animate() method?</em>
```js
$("button").click(function(){
  $("div").animate({
    left: '250px',
    opacity: '0.5',
    height: '150px', /* you can use relative: height:'+=150px' */
    width: '150px' /* also, Pre-defined Values "show","hide","toggle" */
  });
});  
```
---


## jQuery `stop()`:
> Used to stop animations or effects before it is finished.
- works for all jQuery effect functions, including sibling,fading.
> Syntax:
`$(selector).stop(stopAll,goToEnd);`

> Example:
```js
$("#stop").click(function(){
  $("#panel").stop();
});
```
## jQuery Callback

- JavaScript statements are executed line by line. However, with effects, the next line of code can be run even though the effect is not finished. This can create errors.
> To prevent this, you can create a callback function.

> A callback function is executed after the current effect is finished.

> Syntax: `$(selector).hide(speed,callback);`

> Example with Callback
```js
$("button").click(function(){
  $("p").hide("slow", function(){
    alert("The paragraph is now hidden");
  });
});
```

## jQuery Chaining
> There is a technique called chaining, that allows us to run multiple jQuery commands, one after the other, on the same element(s).
 - To chain an action, you simply append the action to the previous action.
 - The following example chains together the css(), slideUp(), and slideDown() methods. The "p1" element first changes to red, then it slides up, and then it slides down:
 ```js
  $("#p1").css("color", "red").slideUp(2000).slideDown(2000);
  ```
  ---

## jQuery HTML
 ### Get Content:
 > jQuery methods for DOM manipulation are:
    `text()` - Sets or returns the text content of selected elements
    `html()` - Sets or returns the content of selected elements (including HTML markup)
    `val() `- Sets or returns the value of <b>form</b> fields
> text(), html() Example:

```js
$("#btn1").click(function(){
  alert("Text: " +
  $("#test").text());//Text: This is some bold text in a paragraph.
});
$("#btn2").click(function(){
  alert("HTML: " +
  $("#test").html());//HTML: This is some <b>bold</b> text in a paragraph.
});
```


## jQuery Get
> The jQuery attr() method is used to get attribute values.
- The following example demonstrates how to get the value of the href attribute in a link:

>Example:
```js
$("button").click(function(){
  alert($("#w3s").attr("href"));
});
```

## jQuery Set

> Use the second parameter to set a value:
```js
 $("#btn1").click(function(){
  $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
  $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
  $("#test3").val("Dolly Duck");
});
```


## jQuery Add
## jQuery Remove
## jQuery CSS Classes
## jQuery `css()`
## jQuery Dimensions

# jQuery Traversing
## jQuery Traversing
## jQuery Ancestors
## jQuery Descendants
## jQuery Siblings
## jQuery Filtering

# jQuery AJAX
## jQuery AJAX Intro
## jQuery Load
## jQuery Get/Post

# jQuery Misc
## jQuery `noConflict()`
## jQuery Filters
