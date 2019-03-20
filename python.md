---
title: Python
category: Python
updated: 2018-03-20
layout: 2017/sheet
prism_languages: [python]
description: |
  A quick overview of Python
---

### Import

``` python
import mypackage
import mymodule from mypackage
```

#### Alias Imports

``` python
import mymodule as mod
import mymodule from mypackage as mod
```

### [String](https://docs.python.org/2/library/stdtypes.html#string-methods)

#### String Creation

``` python
site = "devhints"
message = "Welcome to %s." % site
message = f"Welcome to {site}"     # python 3.6+
```
    
#### String Methods

``` python
str[0:4]
len(str)

string.replace("-", " ")
",".join(list)
"hi {0}".format('j')
str.find(",")
str.index(",")   # same, but raises IndexError
str.count(",")
str.split(",")

str.lower()
str.upper()
str.title()

str.lstrip()
str.rstrip()
str.strip()

str.islower()
```
    
### Regex

``` python
import re

re.match(r'^[aeiou]', str)
re.sub(r'^[aeiou]', '?', str)
re.sub(r'(xyz)', r'\1', str)

expr = re.compile(r'^...$')
expr.match(...)
expr.sub(...)
```


### Lists
A list stores a series of items in a particular order. You
access items using an index, or within a loop.  

#### List Creation

``` python
list = []
sites = ['github.com', 'devhints.io', 'python.org', ]
```

#### Get Items from List
``` python
list[i:j]  # returns list subset
list[-1]   # returns last element
list[:-1]  # returns all but the last element
```

### Modify items in a list

``` python
list[i] = val
list[i:j] = otherlist  # replace ith to jth element with otherlist
del list[i:j]
```

### List Methods

``` python
list.append(item)
list.extend(another_list)
list.insert(index, item)
list.pop(i)       # returns and removes i-th element from the list
list.remove(i)    # removes the first item from the list whose value is i
list1 + list2     # combine two list    
list(set(list))   # remove duplicate elements from a list

list.reverse()    # reverses the elements of the list in-place
list.count(item)
sum(list)

zip(list1, list2)  # returns list of tuples with n-th element of both list1 and list2
list.sort()        # sorts in-place, returns None

sorted(list)       # returns sorted copy of list
",".join(list)     # returns a string with list elements seperated by comma
```

### Tuples

Tuples are similar to lists, but the items in a tuple can't be
modified.

#### Tuple Creation

``` python
list = tuple()
sites = ('github.com', 'devhints.io', 'python.org', )
```

### Dictionary

#### Dictionary Creation
``` python
sites = {'code': 'github.com', 'cheatsheets': 'devhints.io', 'docs': 'python.org', }
```

#### Access Items in a Dictionary
``` python
sittes['code']
```

#### Reassign an Item
``` python
sites['code'] = 'gitlab.com'
```

#### Dictionary Methods

``` python
dict.keys()
dict.values()
"key" in dict    # let's say this returns False, then...
dict["key"]      # ...this raises KeyError
dict.get("key")  # ...this returns None
dict.setdefault("key", 1)
```
### Casting

``` python
int(str)
float(str)
str(int)
str(float)
'string'.encode()
```

### Iteration

#### For Loops
``` python
for item in ["a", "b", "c"]:
for i in range(4):        # 0 to 3
for i in range(4, 8):     # 4 to 7
for i in range(1, 9, 2):  # 1, 3, 5, 7
for key, val in dict.items():
for index, item in enumerate(list):
```

#### While Loops
``` python
current_value = 1
while current_value <= 5:
    print(current_value)
    current_value += 1
```

### Comprehensions

``` python
[fn(i) for i in list]            # .map
map(fn, list)                    # .map, returns iterator

filter(fn, list)                 # .filter, returns iterator
[fn(i) for i in list if i > 0]   # .filter.map
```

### If Statements

``` python
if site == 'devhints.io':
    print('TL;DR for developer documentation - a ridiculous collection of cheatsheets')
else if site === 'python.org':
    print('python standard library documentation')
else:
    pass
```

### User Input

``` python
name = input("What's your name? ")
print(f"Hello, {name}!")
```

### Functions

#### A Simple Function
``` python
def greet_user():
    """Display a simple greeting."""
    print("Hello!")
greet_user()
```

#### Passing an Argument

``` python
def greet_user(username):
    """Display a personalized greeting."""
    print("Hello, " + username + "!")
greet_user('jesse')
```

#### Default Values for parameters

``` python
def make_pizza(topping='bacon'):
    """Make a single-topping pizza."""
    print("Have a " + topping + " pizza!")
make_pizza()
make_pizza('pepperoni')
```
#### Returning a Value
``` python
def add_numbers(x, y):
    """Add two numbers and return the sum."""
    return x + y
sum = add_numbers(3, 5)
print(sum)
```

### Classes

#### Class Creation
``` python
class Dog():
    """Represent a dog."""
    def __init__(self, name):
        """Initialize dog object."""
        self.name = name
        
    def sit(self):
        """Simulate sitting."""
        print(self.name + " is sitting.")
 
my_dog = Dog('Peso')
print(my_dog.name + " is a great dog!")
my_dog.sit()
```

#### Class Inheritance
``` python
class SARDog(Dog):
    """Represent a search dog."""

    def __init__(self, name):
        """Initialize the sardog."""
        super().__init__(name)

    def search(self):
        """Simulate searching."""
        print(self.name + " is searching.")
 
my_dog = SARDog('Willie')
print(my_dog.name + " is a search dog.")
my_dog.sit()
my_dog.search()

```

#### Data Classes
_Python 3.7+_

``` python
from dataclasses import dataclass
@dataclass
class DCls(object):
    x: str
    y: str
```

#### Immutable Data Class

``` python
@dataclass(frozen=True)
class DCls(object):
    x: str
    y: str
```

### Working With Files

#### Reading a File

``` python
filename = 'siddhartha.txt'
with open(filename) as file_object:
    lines = file_object.readlines()
```

#### Writing to a File

``` python
filename = 'journal.txt'
with open(filename, 'w') as file_object:
    file_object.write("I love programming.")
```

#### Appending to a File
``` python
filename = 'journal.txt'
with open(filename, 'a') as file_object:
    file_object.write("\nI love making games.")
```

### Exceptions

#### Catching an Exception

``` python
prompt = "How many tickets do you need? "
num_tickets = input(prompt)

try:
    num_tickets = int(num_tickets)
except ValueError:
    print("Please try again.")
else:
    print("Your tickets are printing.")
```

### Breakpoints

``` python
import pdb; pdb.set_trace() # not built into pre 3.7

breakpoint() # built into Python 3.7+

```
