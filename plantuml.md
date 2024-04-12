---
title: PlantUML
---

### About
{: .-intro}

PlantUML is a markup language for creating diagrams.

- <https://plantuml.com/>

### Format

    @startuml
    Car : drive()
    Dog : bark()
    @enduml

    # plantuml file.uml && open file.png

## Classes

 * http://plantuml.sourceforge.net/classes.html

### Methods

    Car : drive()

### Methods (alt)

    class Car {
      String make
      year : Integer
      void drive()

      -private()
      #protected()
      ~package private()
      +public()

      {static} String id
      {abstract} void methods()
    }

### Lines

    class Car {
      These are separated by lines.
      The next line is a dotted line
      ..
      Next is a double-stroke
      ==
      Next is a plain line
      --
      Next is a strong line
      __
      You can make headers with it
      .. header ..
    }

### Associations

    Car <|-- SmallCar      # extension
    Car *-- Engine         # composition
    Cars o-- Car           # aggregation
    Car <|.. SmallCar      # dotted line (use .. instead of --)
    Car <|--* Car

    -left->
    -right->

### Relations

    Driver - Car : drives >
    Car -- Owner : < owns
    Car *-- Wheel : has 4 >

### Notes

    class Car {
    }
    note left: Something something

    note top of Car : This is a car.

### Namespaces

    namespace Client {
      class Driver {
      }
    }

    Car -- Client.Driver : owns >


## Activities

    (*) --> "First Activity"
    -->[You can put also labels] "Second Activity"
    --> (*)

