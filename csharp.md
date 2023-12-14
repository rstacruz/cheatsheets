---
title: C#
category: C-like
updated: 2019-05-21
layout: 2017/sheet
prism_languages: [csharp]
description: |
  A quick overview of C# Features
---

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
### Exceptions

#### Throw Expressions 

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

#### Exception Filters

```csharp
internal static void ExceptionFilter(WebClient webClient)
{
    try
    {
        string html = webClient.DownloadString("http://weblogs.asp.net/dixin");
    }
    catch (WebException exception) when ((exception.Response as HttpWebResponse)?.StatusCode == HttpStatusCode.BadRequest)
    {
        // Handle exception.
    }
}
```

### Null coalescing operator

```csharp
internal static void DefaultValueForNullWithNullCoalescing(Point reference, ValuePoint? nullableValue)
{
    Point point = reference ?? Point.Default;
    ValuePoint valuePoint = nullableValue ?? ValuePoint.Default;
}
```

### Null conditional operators

```csharp
internal static void NullCheckWithNullConditional(Category category, Device[] devices)
{
    string categoryText = category?.ToString();
    string firstDeviceName = devices?[0]?.Name;
}
```

### String interpolation

```csharp
internal static void LogWithStringInterpolation(Device device)
{
    string message =$"{DateTime.Now.ToString("o")}: {device.Name}, {device.Price}";
    Trace.WriteLine(message);
}
```

### nameof operator

```csharp
internal static void NameOf(int count)
{
    if (count < 0)
    {
        throw new ArgumentOutOfRangeException(nameof(count));
    }
}
```

### Using Static

```csharp
using static System.String;
Format("{0}","Hi");
```

### Indexer Initializers

```csharp
var placesByZip = new Dictionary<string, string>
{
    ["63368"] = "Dardenne Prairie",
    ["63141"] = "Des Peres",
    ["63101"] = "St. Louis"
};
```

### Out Variables

```csharp
public void PrintCoordinates(Point p)
{
    p.GetCoordinates(out int x, out int y);
    WriteLine($"({x}, {y})");
}
```

`out` is used to declare a variable at the point where it is passed as an argument.

### Named Arguments

```csharp
PrintOrderDetails(orderNum: 31, productName: "Red Mug", sellerName: "Gift Shop");
```

### Optional Arguments

```csharp
public void ExampleMethod(int required, string optionalstr = "default string", int optionalint = 10)
```

### Property initializer / read only

```csharp
internal partial class Category
{
    internal Guid Id { get; } = Guid.NewGuid(); // Read only

    internal string Description { get; set; } = string.Empty;
}
```

### Type parameter constraints

```csharp
internal partial class Constraints<T1, T2, T3, T4, T5, T6, T7>
    where T1 : struct
    where T2 : class
    where T3 : DbConnection
    where T4 : IDisposable
    where T5 : struct, IComparable, IComparable<T5>
    where T6 : new()
    where T7 : T2, T3, T4, IDisposable, new() { }
```
The above generic type has 7 type parameters:
- T1 must be value type (structure)
- T2 must be reference type (class)
- T3 must be the specified type, or derive from the specified type
- T4 must be the specified interface, or implement the specified interface
- T5 must be value type (structure), and must implement all the specified interfaces
- T6 must have a public parameterless constructor
- T7 must be or derive from or implement T2, T3, T4, and must implement the specified interface, and must have a public parameterless constructor

### Default literal expression

```csharp
Func<string, bool> whereClause = default;
```