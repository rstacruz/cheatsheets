---
title: Python
category: Python
---

### Lists

    list = []
    list[i:j]  # returns list subset
    list[-1]   # returns last element
    list[:-1]  # returns all but the last element
    
    list[i] = val
    list[i:j] = otherlist  # replace ith to jth-1 elements with otherlist
    del list[i:j]

    list.append(item)
    list.extend(another_list)
    list.insert(index, item)
    list.pop()        # returns and removes last element from the list
    list.pop(i)       # returns and removes i-th element from the list
    list.remove(i)    # removes the first item from the list whose value is i
    list1 + list2     # combine two list    
    set(list)         # remove duplicate elements from a list

    list.reverse()    # reverses the elements of the list in-place
    list.count(item)
    sum(list)

    zip(list1, list2)  # returns list of tuples with n-th element of both list1 and list2
    list.sort()        # sorts in-place, returns None
    sorted(list)       # returns sorted copy of list
    ",".join(list)     # returns a string with list elements seperated by comma

### Dict

    dict.keys()
    dict.values()
    "key" in dict    # let's say this returns False, then...
    dict["key"]      # ...this raises KeyError
    dict.get("key")  # ...this returns None
    dict.setdefault("key", 1)

### Iteration

    for item in ["a", "b", "c"]:
    for i in range(4):        # 0 to 3
    for i in range(4, 8):     # 4 to 7
    for i in range(1, 9, 2):  # 1, 3, 5, 7
    for key, val in dict.items():
    for index, item in enumerate(list):

### [String](https://docs.python.org/2/library/stdtypes.html#string-methods)

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

### Casting

    int(str)
    float(str)
    str(int)
    str(float)
    'string'.encode()

### Comprehensions

    [fn(i) for i in list]            # .map
    map(fn, list)                    # .map, returns iterator
    
    filter(fn, list)                 # .filter, returns iterator
    [fn(i) for i in list if i > 0]   # .filter.map

### Regex

    import re

    re.match(r'^[aeiou]', str)
    re.sub(r'^[aeiou]', '?', str)
    re.sub(r'(xyz)', r'\1', str)

    expr = re.compile(r'^...$')
    expr.match(...)
    expr.sub(...)

### Some new features in python3

#### Basic features

    print('bla')  # instead of print 'bla'
    range(10)     # instead of xrange(10) for an iterator
                  # list(range(10)) gives a list in python3
                  # range(10) gives a list in python2

#### f-strings ([PEP 498](https://www.python.org/dev/peps/pep-0498/))
Since Python 3.6, there are so called f-strings.

    x = 2
    print(f'x is {x}')  # prints 'x is 2'
    print(f'{2 * 7}')   # prints '14'
    print(f'{obj}')     # prints what str(obj) returns
    print(f'{obj!r}')   # prints what repr(obj) returns

#### Optional type annotations ([PEP 484](https://www.python.org/dev/peps/pep-0484/))
Type hints for function arguments and and their return types can (but don't need to) be given.
The same thing applies for variables.
These annotations can be checked by a static type checker.
They will be ignored at runtime, though.
Therefore, they don't harm the dynamic nature of the language or prevent type errors, but instead can be used to e.g. document the intent of the author and catch error earlier.
They are also available at runtime through the `__annotations__` field.
Types are also available in the `typing` module.

    def greeting(name: str) -> str:
        return 'Hello ' + name
    name: str = 'John'
    greeting(name)  # will print 'Hello John'
    greeting(1)     # will raise TypeError at runtime, but static type checker
                    # would recognize that input type does not match *before* runtime

#### async / await ([PEP 492](https://www.python.org/dev/peps/pep-0492/))
Multiple so called coroutines can be collected in a so called event loop which is the transition point between synchronous and asynchronous code.
The event loop gives control flow to one of its coroutines until this coroutine _decides_ to give control flow back to another coroutine with the keyword `await` ("cooperative multitasking").
The `await` keyboard can only be used inside a function defined with the `async` keyword.

    async def read_data(db):
        data = await db.fetch('SELECT ...')  # gives control flow back to the event loop
                                             # will wait *at least* until the result is available
                                             # context of function will be remembered
        ...  # will be executed once control flow is taken over again, not before

#### A glimpse of [function overloading](https://en.wikipedia.org/wiki/Function_overloading) ([PEP 443](https://www.python.org/dev/peps/pep-0443/))

Since Python 3.4, there is a function decorator `@functools.singledispatch` which allows to define overloading-like behavior for the **first** function parameter only (in constrast to [PEP 3124](https://www.python.org/dev/peps/pep-3124/) which was not accepted).

    from functools import singledispatch

    @singledispatch  # "entry point", defines the function name
    def f(x):
        print('Some other type:', x)  # default implementation
                  # called if none of the registred types matches

    @f.register(int)
    def _(x):
        print('Integer:', x)

    @f.register(list)
    def _(x):
        print('List entries:', *x)

    f(1)          # prints 'Integer: 1'
    f([1, 2, 3])  # prints 'List entries: 1 2 3'
    f('default')  # prints 'Some other type: default'
