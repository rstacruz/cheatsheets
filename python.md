---
title: Python
seo_title: Python cheatsheet — lists, dicts, strings
description: "Python lists: dicts, strings, iteration, comprehensions and file handling. Reference."
subtitle: Readable language for scripting
category: Python
intro: |
  Python is a general-purpose language for scripting and applications. This reference covers built-in types, strings, comprehensions, and file handling.
links:
  - title: Python tutorial
    url: https://docs.python.org/3/tutorial/index.html
  - title: Built-in types
    url: https://docs.python.org/3/library/stdtypes.html
  - title: Built-in functions
    url: https://docs.python.org/3/library/functions.html
updated: 2026-11-26
last_verified_with: "Python 3.15.2."
tier: t3
---

### Tuples (immutable)

```py
tuple = ()
```
<!-- {: data-highlight="tuple = ()"} -->

See: [Tuples](https://docs.python.org/3/library/stdtypes.html#tuples)

### Lists (mutable)

```py
list = []
list[i:j]  # returns list subset
list[-1]   # returns last element
list[:-1]  # returns all but the last element
*list      # expands all elements in place

list[i] = val
list[i:j] = otherlist  # replace ith to jth-1 elements with otherlist
del list[i:j]

list.append(item)
list.extend(another_list)
list.insert(index, item)
list.pop()        # returns and removes last element from the list
list.pop(i)       # returns and removes i-th element from the list
list.remove(i)    # removes first item whose value is i
list1 + list2     # combine two lists
set(list)         # remove duplicate elements from a list

list.reverse()    # reverses the elements of the list in-place
list.count(item)
sum(list)

zip(list1, list2)  # returns an iterator of paired tuples
list.sort()        # sorts in-place, returns None
sorted(list)       # returns sorted copy of list
",".join(list)     # joins elements with commas
```
<!-- {: data-highlight="list.append; list.pop; list.sort; sorted(list)"} -->

See: [Lists](https://docs.python.org/3/library/stdtypes.html#lists)

### Dict

```py
dict = {}
dict = {'a': 1, 'b': 2}
dict['c'] = 3
del dict['a']    # Remove key-value pair with key 'a'
dict.keys()
dict.values()
"key" in dict    # let's say this returns False, then...
dict["key"]      # if "key" not in dict raises KeyError
dict.get("key")  # if "key" not in dict returns None
dict.get("key", "optional return value if no key")
dict.setdefault("key", 1)
**dict           # expands all k/v pairs in place
```
<!-- {: data-highlight="dict.keys; dict.get; dict.setdefault"} -->

See: [Dictionaries](https://docs.python.org/3/library/stdtypes.html#dict)

### Set

```py
set = set()
set = {1, 2, 3}
set.add(4)
set.remove(2)
```
<!-- {: data-highlight="set.add; set.remove"} -->

See: [Sets](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)

### Iteration

```py
for item in ["a", "b", "c"]:
for i in range(4):        # 0 to 3
for i in range(4, 8):     # 4 to 7
for i in range(1, 9, 2):  # 1, 3, 5, 7
for key, val in dict.items():
for index, item in enumerate(list):
```
<!-- {: data-highlight="range; dict.items; enumerate"} -->

See: [for statements](https://docs.python.org/3/reference/compound_stmts.html#the-for-statement)

### [String](https://docs.python.org/3/library/stdtypes.html#string-methods)

```py
str[0:4]
len(str)

string.replace("-", " ")
",".join(list)
"hi {0}".format('j')
f"hi {name}" # same as "hi {}".format(name)
str.find(",")
str.index(",")   # same, but raises ValueError
str.count(",")
str.split(",")

str.lower()
str.upper()
str.title()

str.lstrip()
str.rstrip()
str.strip()

str.islower()

# Escape characters
>>> 'doesn\'t'  # use \' to escape the single quote...
    "doesn't"
>>> "doesn't"  # ...or use double quotes instead
    "doesn't"
>>> '"Yes," they said.'
    '"Yes," they said.'
>>> "\"Yes,\" they said."
    '"Yes," they said.'
>>> '"Isn\'t," they said.'
    '"Isn\'t," they said.'
```
<!-- {: data-highlight="string.replace; str.find; str.split"} -->

See: [String methods](https://docs.python.org/3/library/stdtypes.html#string-methods)

### Casting

```py
int(str)
float(str)
str(int)
str(float)
'string'.encode()
```
<!-- {: data-highlight="int(str); float(str); str(int)"} -->

See: [Built-in types](https://docs.python.org/3/library/stdtypes.html)

### Comprehensions

```py
[fn(i) for i in list]            # .map
map(fn, list)                    # .map, returns iterator

filter(fn, list)                 # .filter, returns iterator
[fn(i) for i in list if i > 0]   # .filter.map
```
<!-- {: data-highlight="[fn(i) for i in list]; [fn(i) for i in list if i > 0]"} -->

See: [List displays](https://docs.python.org/3/reference/expressions.html#list-displays)

### Regex

```py
import re

re.match(r'^[aeiou]', str)
re.sub(r'^[aeiou]', '?', str)
re.sub(r'(xyz)', r'\1', str)

expr = re.compile(r'^...$')
expr.match(...)
expr.sub(...)
```
<!-- {: data-highlight="re.match; re.sub; re.compile"} -->

See: [Regular expression operations](https://docs.python.org/3/library/re.html)

## File manipulation
### Reading

#### Open and close

```py
file = open("hello.txt", "r")  # open in read mode
file.close()
```

<!-- {: data-highlight="file.close"} -->

#### Read content

```py
print(file.read())      # read from the current position
print(file.readline())  # read one line
file.seek(0, 0)         # place the cursor at the start
```

<!-- {: data-highlight="file.readline; file.seek"} -->

See: [io.IOBase.readline](https://docs.python.org/3/library/io.html#io.IOBase.readline)

### Writing (overwrite)

```py
file = open("hello.txt", "w") # open in write mode 'w'
file.write("Hello World")

text_lines = ["First line", "Second line", "Last line"]
file.writelines(text_lines)

file.close()
```
<!-- {: data-highlight="file.writelines"} -->

See: [io.IOBase.writelines](https://docs.python.org/3/library/io.html#io.IOBase.writelines)

### Writing (append)

```py
file = open("Hello.txt", "a") # open in append mode
file.write("Hello World again")
file.close()
```
<!-- {: data-highlight="open"} -->

See: [open()](https://docs.python.org/3/library/functions.html#open)

### Context manager

```py
with open("welcome.txt", "r") as file:
    # 'file' refers directly to "welcome.txt"
    data = file.read()

# The file closes automatically at the end of the block.
```
<!-- {: data-highlight="with open"} -->

See: [the with statement](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement)
