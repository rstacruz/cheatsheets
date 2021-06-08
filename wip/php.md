---
title: PHP
category: PHP
layout: 2017/sheet
prism_languages: [php]
---

### Hello world

#### hello.php

```php
<?php
function greetMe($name): string
{
    return "Hello, " . $name . "!";
}

$message = greetMe($name);
echo $message;
```

All PHP files start with `<?php`.

See: [PHP tags](https://php.net/manual/en/language.basic-syntax.phptags.php)

### Selector Structure

#### IF

``` PHP
if (condition) {
  // Command...
}
```

#### IF ELSE

```php
if (condition) {
  // Command...
} else {
  // Command...
}
```

#### IF ELSEIF ELSE
```php
if (condition) {
  // Command...
} elseif (condition2) { 
  // Command...
} elseif (condition3) { 
  // Command...
} else { 
  // Command...
}
```

#### Ternary Operator
```php
var $result;

$result = (condition) ? true : false;
```

#### Switch
```php
switch ($variable) {
  case 'value1':
    // code to be executed if $variable == 'value1'
    break;
  case 'value2':
    // code to be executed if $variable == 'value2'
    break;
  ...
  default:
    // default case it's optional
}
```

### Objects

```php
<?php

$fruitsArray = array(
    "apple" => 20,
    "banana" => 30
);
echo $fruitsArray['banana'];
```

Or cast as object

```php
<?php

$fruitsObject = (object) $fruits;
echo $fruitsObject->banana;
``` 

### Inspecting objects

```php
<?php
var_dump($object);
```

Prints the contents of a variable for inspection.

See: [var_dump](https://php.net/var_dump)

### Classes

```php
class Person
{
    public $name = '';
}

$person = new Person();
$person->name = 'bob';

echo $person->name;
```

### Getters and setters

```php
class Person 
{
    private $name = '';

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
        return $this;
    }
}

$person = new Person();
$person->setName('bob');

echo $person->getName();
```

### isset vs empty
```php

$options = [
    'key' => 'value',
    'blank' => '',
    'nothing' => null,
];

var_dump(isset($options['key']), empty($options['key'])); // true, false
var_dump(isset($options['blank']), empty($options['blank'])); // true, true
var_dump(isset($options['nothing']), empty($options['nothing'])); // false, true
```
