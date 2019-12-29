## 1. Sass Variable Scope

Sass variables are only available at the level of nesting where they are defined.

```scss
$myColor: red;

h1 {
  $myColor: green;  // if green!global ==> then p will be a green also.
  color: $myColor; //green
}
// $myColor:blue ==> then p will be blue.
p {
  color: $myColor; //red
}
```
so; the css output:

```css
h1 {color: green;}

p {color: red;}
```
---
### 2. The !global switch:

   - The default behavior for variable scope can be overridden by using the !global switch.
   - !global indicates that a variable is global, which means that it is accessible on all levels.

Tip: Global variables should be defined outside any rules. It could be wise to define all global variables in its own file, named "_globals.scss", and include the file with the @include keyword.

### 3. Example: Sass Nested Rules:

<u>mystyle.scss"</u>
<em>Notice that in Sass, the ul, li, and a selectors are nested inside the nav selector.</em>
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
<em>While in CSS, the rules are defined one by one (not nested):</em>

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {display: inline-block;}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
### 4. Sass nested properties:

<em>Example: in SCSS, you can nest CSS properties which has the same prefix:</em>

<u>SCSS Syntax:</u>

```scss
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```
<em>The Sass transpiler will convert the above to normal CSS:</em>

<u>CSS Output:</u>

```css
font-family: Helvetica, sans-serif;
font-size: 18px;
font-weight: bold;

text-align: center;
text-transform: lowercase;
text-overflow: hidden; 
```
#### 4. Import (composing):

<em><b>Let's assume we have a reset file called "reset.scss", that looks like this:</b></em>

<em>SCSS Syntax (reset.scss):</em>

```scss
html,
body,
ul,
ol {
  margin: 0;
  padding: 0;
} 
```
<em>To import the "reset.scss" file into another file called "standard.scss".</em>

<em>When we add the @import directive at the top of a file; this way its content will have a `global scope`:</em>

<b>SCSS Syntax (standard.scss):</b>

```scss
@import "reset";

body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: red;
} 
```
<em><b>So, when the "standard.css" file is transpiled, the CSS will look like this:</b></em>

<u>CSS output:</u>
```css
html, body, ul, ol {
  margin: 0;
  padding: 0;
}

body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: red;
} 
```
---

<u><b>Important: A tip on hyphens and underscore in Sass: Hyphens and underscores are considered to be the same. This means that @mixin important-text { } and @mixin important_text { } are considered as the same mixin!</b></u>
---

## Sass @extend Directive

The @extend directive lets you share a set of CSS properties from one selector to another. It useful if you have almost identically styled elements that only differ in some small details.

The following Sass example first creates a basic style for buttons (this style will be used for most buttons). Then, we create one style for a "Report" button and one style for a "Submit" button. Both "Report" and "Submit" button inherit all the CSS properties from the .button-basic class, through the @extend directive. In addition, they have their own colors defined:

SCSS Syntax:
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}

<b>After compilation, the CSS will look like this:</b>

CSS Output:
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  background-color: red;
}

.button-submit  {
  background-color: green;
  color: white;
}

















