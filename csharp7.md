---
title: C# 7
subtitle: "C# 7 feature summary"
category: C-like
last_verified_with: "C# 7.3."
updated: 2018-12-06
tier: t3
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

See: [out parameter modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/out-parameter-modifier)

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

See: [Patterns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns)

### Tuples

#### Tuple type

```csharp
(string, string, string) LookupName(long id) // tuple return type
{
    ... // retrieve first, middle and last from data storage
    return (first, middle, last); // tuple literal
}
```

#### Use the tuple

```csharp
var names = LookupName(id);
WriteLine($"found {names.Item1} {names.Item3}.");
```

#### Tuple elements with name

```csharp
(string first, string middle, string last) LookupName(long id)
```

#### Use named elements

```csharp
var names = LookupName(id);
WriteLine($"found {names.first} {names.last}.");
```

#### Tuple Literals

```csharp
   // named tuple elements in a literal
   return (first: first, middle: middle, last: last);
```

#### Tuple Deconstruction

```csharp
(var first, var middle, var last) = LookupName(id1);
WriteLine($"found {first} {last}.");
```

#### Deconstruct with var

```csharp
var (first, middle, last) = LookupName(id1); // var outside
```

#### Assign to existing variables

```csharp
(first, middle, last) = LookupName(id2);
```

See: [Tuple types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples)


### Local Functions

```csharp
public int Fibonacci(int x)
{
    if (x < 0)
        throw new ArgumentException(
            "Less negativity please!", nameof(x));
    return Fib(x).current;

    (int current, int previous) Fib(int i)
    {
        if (i == 0) return (1, 0);
        var (p, pp) = Fib(i - 1);
        return (p + pp, p);
    }
}
```

See: [Local functions](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions)

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

See: [Integer literals](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types#integer-literals)

### Ref Returns and Locals

```csharp
public ref int Find(int number, int[] numbers)
{
    for (int i = 0; i < numbers.Length; i++)
    {
        if (numbers[i] == number) 
        {
            // return the storage location, not the value
            return ref numbers[i];
        }
    }
    throw new IndexOutOfRangeException($"{nameof(number)} not found");
}

int[] array = { 1, 15, -39, 0, 7, 14, -12 };
ref int place = ref Find(7, array); // aliases 7's place in the array
place = 9; // replaces 7 with 9 in the array
WriteLine(array[4]); // prints 9
```

See: [ref returns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements#ref-returns)

### More Expression Bodied Members

```csharp
class Person
{
    private static ConcurrentDictionary<int, string> names =
        new ConcurrentDictionary<int, string>();
    private int id = GetId();

    // constructors
    public Person(string name) => names.TryAdd(id, name);
    // destructors
    ~Person() => names.TryRemove(id, out *);
    public string Name
    {
        get => names[id];                                 // getters
        set => names[id] = value;                         // setters
    }
}
```

C# 7.0 adds accessors, constructors, and finalizers to expression bodies.

See: [Expression body definition](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-operator#expression-body-definition)

### Throw Expressions 

```csharp
class Person
{
    public string Name { get; }
    public Person(string name) =>
        Name = name ?? throw new ArgumentNullException(name);
    public string GetFirstName()
    {
        var parts = Name.Split(" ");
        return (parts.Length > 0)
            ? parts[0]
            : throw new InvalidOperationException("No name!");
    }
    public string GetLastName() =>
        throw new NotImplementedException();
}
```

See: [throw expression](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/throw#the-throw-expression)
