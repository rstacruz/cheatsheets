---
title: PlantUML
category: Markup
subtitle: Diagram markup language
logo: { src: /assets/logos/plantuml.svg }
intro: |
  PlantUML is a markup language for creating diagrams.
links:
  - title: https://plantuml.com/
    url: https://plantuml.com/
tier: t3
last_verified_with: "PlantUML 1.2026.10."
created_at: 2014-02-25
updated: 2026-11-25
---

### Format

#### Diagram

```
@startuml
Car : drive()
Dog : bark()
@enduml
```
<!-- {: data-highlight="@startuml; @enduml"} -->

#### Render

```bash
plantuml file.uml && open file.png
```

See: [PlantUML documentation](https://plantuml.com/)

## Classes

### Methods

```
Car : drive()
```
<!-- {: data-highlight="drive()"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Methods (alt)

```
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
```
<!-- {: data-highlight="-private(); #protected(); ~package private(); +public()"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Lines

```
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
```
<!-- {: data-highlight="..; ==; --; __"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Associations

```
Car <|-- SmallCar      # extension
Car *-- Engine         # composition
Cars o-- Car           # aggregation
Car <|.. SmallCar      # dotted line (use .. instead of --)
Car <|--* Car

-left->
-right->
```
<!-- {: data-highlight="<|--; *--; o--"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Relations

```
Driver - Car : drives >
Car -- Owner : < owns
Car *-- Wheel : has 4 >
```
<!-- {: data-highlight="drives; owns; has 4"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Notes

```
class Car {
}
note left: Something something

note top of Car : This is a car.
```
<!-- {: data-highlight="note left; note top"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

### Namespaces

```
namespace Client {
  class Driver {
  }
}

Car -- Client.Driver : owns >
```
<!-- {: data-highlight="namespace Client"} -->

See: [Class diagram](https://plantuml.com/class-diagram)

## Activities

### Simple flow

```
(*) --> "First Activity"
--> (*)
```
<!-- {: data-highlight="-->"} -->

See: [Activity diagram](https://plantuml.com/activity-diagram-beta)

### Labeled transitions

```
(*) --> "First Activity"
-->[You can put also labels] "Second Activity"
--> (*)
```
<!-- {: data-highlight="-->[You can put also labels]"} -->

See: [Activity diagram](https://plantuml.com/activity-diagram-beta)
