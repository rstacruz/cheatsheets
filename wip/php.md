---
title: PHP
category: Other
layout: 2017/sheet
prism_languages: [php]
---

### Hello world

#### hello.php

```php
<?php
function greetMe($name) {
  return "Hello, " . $name . "!";
}

$message = greetMe($name);
echo $message;
```

All PHP files start with `<?php`.

See: [PHP tags](http://php.net/manual/en/language.basic-syntax.phptags.php)

### Objects

```php
<?php

$fruits = array(
  "apple" => 20,
  "banana" => 30
)
```

### Inspecting objects

```php
<?php
var_dump($object)
```

Prints the contents of a variable for inspection.

See: [var_dump](http://php.net/var_dump)
