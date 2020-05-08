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
var_dump($object)
```

Prints the contents of a variable for inspection.

See: [var_dump](http://php.net/var_dump)

### Classes

```php
class Person {
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
    public $name = '';

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
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

### Send JSON via Post request
```php

//The JSON data.
$data = array(
    'username' => 'MyUsername',
    'password' => 'MyPassword'
);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
));
curl_setopt($ch, CURLOPT_POST, 1);  //Tell cURL that we want to send a POST request
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));  //Attach our encoded JSON string to the POST fields.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  //avoid outputting the return value directly. 

$reply = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

```
