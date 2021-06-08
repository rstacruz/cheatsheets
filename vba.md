---
title: VBA
category: VBA
layout: 2017/sheet
---

### Comment
```vb
'Comment in one line
'Doesn't have multiline comment
```

### Variables 

```vb
Dim nByte     as Byte     ' Range between 0 and 255
Dim nInteger  as Integer  ' Range between -32768 and 32768 
Dim nLong     as Long     ' Range between -2,147,483,648 and 2,147,483,648

Dim nSingle   as Single   ' Decimal number with 2 digits of decimal
Dim nDouble   as Double   ' Decimal number
Dim nDecimal  as Decimal  ' Bigger Double
Dim nCurrency as Currency ' Specific to numbers with currency format

Dim birthDate as Date     ' Date values
Dim name      as String   ' To texts
Dim exist     as Boolean  ' To True and False values
Dim obj       as Object   ' To Objects 
Dim variable  as Variant  ' Accept all of types
```

### Selector Structure

#### If

```vb
If (condition) Then
   ' Command...
End If
```

#### If Else

```vb
If (condition) Then
   ' Command...
Else
   ' Command...
End If
```

#### Select Case (same Switch)
```vb
Dim number as Integer

Select Case number
   Case = 1 
      ' Case number equal 1
   Case = 2 
      ' Case number equal 2
   Case Else
      ' Case if doesn't match
End Select 
}


Select Case number
   Case = 1, 2, 3
      ' Case number equal 1 or 2 or 3
   Case >= 4
      ' Case number bigger or equal 4
   Case Else
      ' Case if doesn't match
End Select 
}
```
