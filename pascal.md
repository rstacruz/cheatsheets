---
title: FreePascal
layout: 2017/sheet
category: Pascal
updated: 2019-10-28
intro: |
    [Pascal](https://wiki.freepascal.org/Main_Page) is a statically typed programming langauge developed by [Niklaus Wirth](https://wiki.freepascal.org/Niklaus_Wirth) in the 70s.
    
    It was intented to be a general purpose language and still used in educational context.
description: |
    Pascal language constructs and their usage usage explained by examples.
keywords:
    - Pascal
    - Free Pascal
prism_languages: [pascal]
---

Keywords are generally not case-sensitive, but their uppercase form is used here for clarity.


Variables & Constants
---------
{: .-three-column}

### Datatypes

```freepascal
INTEGER
(* non-decimal values [-32678 : 32767] *)

BOOLEAN
(* true or false *)

REAL
(* decimal values [3.4x10e-38 : 3.4x10e38] *)

CHAR
(* Single character text *)

STRING
(* Multi-character text *)
```

#### Comments

Comments have two different notations, but there are not line-comments available.

```freepascal

(* Put your comment inbetween here. *)

{ Or here, if you prefer curly braces. }
```

### Declaration

Values of variables may be changed and must be declared with their type.

Constants must not be changed later and automatically infer their type upon declaration.

```freepascal
var pizzaShopName : STRING,
    amountOfPizzaOrdered : INTEGER,
    orderWasPlaced: BOOLEAN,
    pizzaPrice: REAL;

const REFUSE_PINEAPPLES = true;
```

### Assignment

```freepascal
myVariableName := "SomeValue";

amountOfPizzaOrdered := 3;

orderWasPlaced := FALSE;
orderWasPlaced := TRUE OR FALSE;
orderWasPlaced := FALSE AND FALSE;
```

Operators
---------
{: .-two-column}

### Comparisson

#### Less than (or equal to)

```freepascal
<
<=
```

#### Greater than (or equal to)
```freepascal
>
>=
```

#### Equal to / Not equal to
```freepascal
=
<>
```

### Conjunction

#### Infix notation
```freepascal
AND
OR
```

#### Prefix notation
```freepascal
NOT
```

#### Example
```freepascal
NOT (pizzaWasDelivered AND pizzaWasPaid)
```

Structure
---------
{: .-two-column}

### Program

```freepascal
PROGRAM MyNewProgram;

VAR
    variablesDeclared : BOOLEAN;

CONST
    constantsDeclared = TRUE;

(* Place your procedures and functions here *)

BEGIN
    (* Read inputs *)
    (* Compute *)
    (* Output *)
END.
```

### Loops

#### Condition-based

```freepascal
WHILE (NOT orderWasPlaced) DO
BEGIN
    (* Wait ... *)
END;

REPEAT
    (* Wait ... *)
UNTIL orderWasPlaced;
```

#### Counter-based

```freepascal
FOR i := 0 TO 20 DO
BEGIN
END;
```

### Conditions

#### Single-statement

```freepascal
IF (NOT orderWasPlaced) THEN
    placeOrder();

IF (NOT REFUSE_PINEAPPLES) THEN
    addPineapplesOnOrder()
ELSE
    laughAboutPizzaHawai();
```

#### Multi-statement block

```freepascal
IF (NOT REFUSE_PINEAPPLES) THEN
BEGIN
    (* Order pinapples *)
    (* Tell others about pineapple on pizza *)
END;

IF (NOT REFUSE_PINEAPPLES) THEN
BEGIN
    orderPineapple();
    waitForPizza()
ELSE
    skipThisStep();
END;
```

User interaction
----------------

### Write
```freepascal
pizzaName := 'Salami';
pizzaPrice := 6.90;

WriteLn('The cost of ', pizzaName,
        ' pizza is ', pizzaPrice);
Write('!')

(* The cost of Salami pizza is 6.90! *)
```

### Read

#### Terminated by whitespace
```freepascal
Read(amountOfPizzas);
```

### Terminated by newline
```freepascal
ReadLn(pizzaName);
```

Arithmetic operations
---------------------

```freepascal
SQR(x)
SQRT(x)
POWER
MOD
DIV
ROUND
TRUNC
FRAC
+, -, *, /
```

Advanced data structures:
------------------------
{: .-two-column}

### Array

```freepascal
VAR pizzas: ARRAY[0..2] OF STRING;
```

#### Write
```freepascal
pizzas[0] = 'Al Capone';
```
#### Read
```freepascal
anotherPizza = pizzas[1];
(* anotherPizza = 'Peperoni' *)
```

### Record
```freepascal
VAR pizza : RECORD
    name: STRING;
    price: REAL;
END;
```

#### Read & Write
```freepascal
pizza.name := 'Salami';
pizza.price := 6.90;

anotherPizza = pizzas[1];
(* anotherPizza = 'Peperoni' *)
```

### Type
```freepascal
TYPE:
TYPE pizza = RECORD
    name : STRING;
    price : REAL;
END;
```

#### Read & Write
Using dot-notation, same as with records.


Advanced structures
-------------------

### Procedure

```freepascal
PROCEDURE orderPizza(pizzaPlace: STRING);

(* local variables *)
VAR
    wasOrderSuccessful: BOOLEAN;

BEGIN
    IF (pizzaPlace = 'Luigi') THEN
        wasOrderSuccessful := callLuigi()
END;
```

### Function

```freepascal
FUNCTION callLuigi(): BOOLEAN;

BEGIN

    (* Look up his number and call him *)

    IF (orderWasAcknoledged) THEN
        callLuigi := TRUE
    else
        callLuigi := FALSE

END;
```

