---
title: Python
category: Python
---

### Tuples (Immutable)

```py
t = ()  # Empty tuple
t = (1, 2, 3)  # Tuple with elements
t = (1,)  # Single-element tuple (comma is required)

# Accessing elements
t[0]  # First element
t[-1]  # Last element

# Methods
len(t)  # Get the length
```

### Lists (Mutable)

```py
lst = []  # Empty list
lst = [1, 2, 3]  # List with elements

# Accessing and slicing
lst[i:j]  # Sublist from index i to j-1
lst[-1]  # Last element
lst[:-1]  # All but the last element

# Modifications
lst[i] = value  # Set an element
lst.append(value)  # Add to the end
lst.insert(i, value)  # Insert at position i
lst.extend([1,2,3])  # Extends list with another list
lst.pop()  # Remove and return element. Can also accept an index.
lst.remove(value)  # Remove first occurrence of value
del lst[i:j]  # Delete slice between i and j-1
list1 + list2  # combine two list

# Useful methods
lst.sort()  # In-place sort
sorted(lst)  # Sorted copy
lst.reverse()  # In-place reverse
list(reversed(lst)) # Reversed copy
list.count(value)  # Counts number of elements with the specified value
",".join(lst)  # Join elements into a string if all elements are strings
",".join(map(str, lst))  # Join elements into a string
```

### Dictionaries (Key-Value Pairs)

```py
d = {}  # Empty dict
d = {"a": 1, "b": 2}  # Initialize with values

# Accessing and modifying
d["key"]  # Access value
d.get("key", "default")  # Safe access with default
d["key"] = value  # Add or update
d.setdefault("key", "default")   # If no key, insert with the specified value
del d["key"]  # Delete key-value pair
"key" in d  # Checks if key in dict

# Iteration
for key, value in d.items():  # Iterate over key-value pairs
    print(key, value)

# Useful methods
list(d.keys() ) # List of keys
list(d.values())  # List of values
list(d.items())  # List of key-value pairs


# Error cases:
d["key"]  # if "key" not in dict raises KeyError
d.get("key")  # if "key" not in dict returns None

** dict  # expands all k/v pairs in place
```

### Set

```py
s = set()  # Empty set
s = {1, 2, 3}  # Set with values
s = set([1, 2, 3, 3])  # Convert List into Set

# Modifications
s.add(4)  # Add element
s.remove(2)  # Remove element

# Set operations
s1 | s2  # Union
s1 & s2  # Intersection
s1 - s2  # Difference
s1 ^ s2  # Symmetric difference
```

### Iteration

```py
for i in range(4):  # 0 to 3
for i in range(4, 8):  # 4 to 7
for i in range(1, 9, 2):  # 1, 3, 5, 7 from 1 to 8 step by 2
for item in lst:
for key, value in dict.items(): 
for index, value in enumerate(lst):
```

### [String Manipulation](https://docs.python.org/2/library/stdtypes.html#string-methods)

```py
s = "hello world"

# Basic methods
s.upper()  # HELLO WORLD
s.lower()  # hello world
s.strip()  # Remove leading/trailing spaces
s.lstrip() or s.rstrip()
lst = s.split(" ")  # Split by space into list
s.replace("world", "Python")  # Replace substring
",".join(["a", "b", "c"])  # Join elements with a separator

str.count(value)  # Count # of values
str.find(value)  # Returns first index of value in str, -1 otherwise
str.index(value)  # same, but raises IndexError

str.isalpha()  # True if all the chars are alphabet letters(a-z).
str.isdigit()  # True if digit(s)

# Formatting
f"Hello, {name}!"  # f-string
"Hello, {}!".format(name)  # Same as f-string
"{:.2f}".format(3.14159)  # Format float to 2 decimals

# Escape Characters
print('doesn\'t')  # Use \' to escape the single quote
print("doesn't")  # Or use double quotes instead
```

### Casting

```py
int(str)
float(str)
str(int)
str(float)
'string'.encode()
```

### Comprehensions

```py
# List comprehension
squared = [x ** 2 for x in range(10)]

# Dictionary comprehension
squared_dict = {x: x ** 2 for x in range(10)}

# Set comprehension
unique = {x for x in lst if x > 0}

# Filter and map
filtered = [x for x in lst if x > 0]
transformed = list(map(str, lst))

[fn(i)
for i in list]  # .map
map(fn, list)  # .map, returns iterator

filter(fn, list)  # .filter, returns iterator
[fn(i) for i in list if i > 0]  # .filter.map
```

### Queues (FIFO)
```py
from collections import deque

queue = deque()  # Initialize
queue.append(1)  # Enqueue
print(queue.popleft())  # Dequeue (FIFO)
print(queue.pop())  # LIFO: Remove and return last element
```

#### Using queue.Queue (Thread-Safe):
```py
from queue import Queue

q = Queue()
q.put(1)  # Enqueue
print(q.get())  # Dequeue (FIFO)
print(q.qsize())  # Current size
print(q.empty())  # Check if empty
```

### Priority Queues
```py
from queue import PriorityQueue

pq = PriorityQueue()
pq.put((2, "B"))  # Insert with priority 2
pq.put((1, "A"))  # Insert with priority 1
print(pq.get())  # Dequeue (Lowest priority first): (1, "A")
```

### Heap
```py
import heapq

heapq.heapify(lst)  # Converts a list into a min-heap in-place
heapq.heappush(heap, item)  # Adds item to the heap while maintaining heap order
heapq.heappop(heap)  # Removes and returns the smallest element in the heap
```


### Regex (see https://regex101.com)

```py
import re

pattern = r"^\d+$"  # Matches integers
if re.match(pattern, "123"):
    print("It's a number!")

re.match(r'^[aeiou]', str)
re.sub(r'^[aeiou]', '?', str)
re.sub(r'(xyz)', r'\1', str)

expr = re.compile(r'^...$')
expr.match(...)
expr.sub(...)
```

## Tips & Tricks

## Type Conversion

```py
int("42")  # String to int
float("3.14")  # String to float
str(42)  # Int to string
list("abc")  # String to list
```

## Sorting

```py
sorted(lst)  # Ascending order
sorted(lst, reverse=True)  # Descending order
lst.sort(key=lambda x: x[1])  # Custom sort by second element
```

## Useful Built-ins
```py
sum(lst)  # Sum of elements
max(lst)  # Maximum element
min(lst)  # Minimum element
zip(lst1, lst2)  # Pair elements
all(lst)  # True if all elements are true
any(lst)  # True if any element is true
```

## File manipulation

### Reading

```py
file = open("hello.txt", "r")  # open in read mode 'r'
file.close()

# Alternative
with open("file.txt", "r") as f:
    content = f.read()  # Read entire file
lines = f.readlines()  # Read all lines as a list
```

```py
file.read()  # read the entire file and set the cursor at the end of file
file.readline()  # Reading one line
file.seek(0, 0)  # place the cursor at the beginning of the file
```

### Writing (overwrite)

```py
file = open("hello.txt", "w")  # open in write mode 'w'
file.write("Hello World")
file.writelines(["First line", "Second line", "Last line"])
file.close()

# Alternative
with open("file.txt", "w") as f:
    f.write("Hello, world!")  # Overwrite file
f.writelines(["Line1\n", "Line2\n"])  # Write multiple lines
```

### Writing (append)

```py
file = open("Hello.txt", "a")  # open in append mode
file.write("Hello World again")
file.close()
```

### Context manager

```py
with open("welcome.txt", "r") as file:
# 'file' refers directly to "welcome.txt"
    data = file.read()

# It closes the file automatically at the end of scope, no need for `file.close()`.
```
