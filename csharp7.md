---
title: C# 7
category: C-like
updated: 2018-12-06
prism_languages: [csharp]
description: |
  A quick overview of C# 7
---

### Out Variables

```csharp
public void PrintCoordinates(Point p)
{
    p.GetCoordinates(out int x, out int y);
    WriteLine($"({x}, {y})");
}
```

`out` is used to declare a variable at the point where it is passed as an argument.

### Pattern Matching

#### Is-expressions with patterns

```csharp
public void PrintStars(object o)
{
    if (o is null) return;     // constant pattern "null"
    if (!(o is int i)) return; // type pattern "int i"
    WriteLine(new string('*', i));
}
```

#### Switch statements with patterns

```csharp
switch(shape)
{
    case Circle c:
        WriteLine($"circle with radius {c.Radius}");
        break;
    case Rectangle s when (s.Length == s.Height):
        WriteLine($"{s.Length} x {s.Height} square");
        break;
    case Rectangle r:
        WriteLine($"{r.Length} x {r.Height} rectangle");
        break;
    default:
        WriteLine("<unknown shape>");
        break;
    case null:
        throw new ArgumentNullException(nameof(shape));
}
```

### Tuples

#### Tuple type

```csharp
(string, string, string) LookupName(long id) // tuple return type
{
    ... // retrieve first, middle and last from data storage
    return (first, middle, last); // tuple literal
}
```

```csharp
var names = LookupName(id);
WriteLine($"found {names.Item1} {names.Item3}.");
```

#### Tuple elements with name

```csharp
(string first, string middle, string last) LookupName(long id) // tuple elements have names
```

```csharp
var names = LookupName(id);
WriteLine($"found {names.first} {names.last}.");
```

#### Tuple Literals

```csharp
   return (first: first, middle: middle, last: last); // named tuple elements in a literal
```

#### Tuple Deconstruction

```csharp
(var first, var middle, var last) = LookupName(id1);
WriteLine($"found {first} {last}.");
```
or
```csharp
var (first, middle, last) = LookupName(id1); // var outside
```
or
```csharp
(first, middle, last) = LookupName(id2); // assign onto existing variables
```


### Local Functions

```csharp
public int Fibonacci(int x)
{
    if (x < 0) throw new ArgumentException("Less negativity please!", nameof(x));
    return Fib(x).current;

    (int current, int previous) Fib(int i)
    {
        if (i == 0) return (1, 0);
        var (p, pp) = Fib(i - 1);
        return (p + pp, p);
    }
}
```

### Literal Improvements

#### Digit Separator inside numbers literals

```csharp
var d = 123_456;
var x = 0xAB_CD_EF;
```

#### Binary Literals

```csharp
var b = 0b1010_1011_1100_1101_1110_1111;
```

### Ref Returns and Locals

```csharp
public ref int Find(int number, int[] numbers)
{
    for (int i = 0; i < numbers.Length; i++)
    {
        if (numbers[i] == number) 
        {
            return ref numbers[i]; // return the storage location, not the value
        }
    }
    throw new IndexOutOfRangeException($"{nameof(number)} not found");
}

int[] array = { 1, 15, -39, 0, 7, 14, -12 };
ref int place = ref Find(7, array); // aliases 7's place in the array
place = 9; // replaces 7 with 9 in the array
WriteLine(array[4]); // prints 9
```

### More Expression Bodied Members

C# 7.0 adds accessors, constructors and finalizers to the list of things that can have expression bodies:

```csharp
class Person
{
    private static ConcurrentDictionary<int, string> names = new ConcurrentDictionary<int, string>();
    private int id = GetId();

    public Person(string name) => names.TryAdd(id, name); // constructors
    ~Person() => names.TryRemove(id, out *);              // destructors
    public string Name
    {
        get => names[id];                                 // getters
        set => names[id] = value;                         // setters
    }
}
```

### Throw Expressions 

```csharp
class Person
{
    public string Name { get; }
    public Person(string name) => Name = name ?? throw new ArgumentNullException(name);
    public string GetFirstName()
    {
        var parts = Name.Split(" ");
        return (parts.Length > 0) ? parts[0] : throw new InvalidOperationException("No name!");
    }
    public string GetLastName() => throw new NotImplementedException();
}
```
