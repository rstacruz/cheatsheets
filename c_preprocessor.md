---
title: C Preprocessor
subtitle: C macro preprocessor reference
category: C-like
intro: |
  Quick reference for the [C macro preprocessor](https://en.m.wikipedia.org/wiki/C_preprocessor), which can be used independent of C/C++.
last_verified_with: "C23, GCC 16.2."
updated: 2026-11-25
tier: t3
links:
  - title: C macro preprocessor
    url: https://en.wikipedia.org/wiki/C_preprocessor
---

## Reference

<!-- {: .-three-column} -->

### Compiling

```
$ cpp -P file > outfile
```

See: [Invoking the preprocessor](https://gcc.gnu.org/onlinedocs/cpp/Invocation.html)

### Includes

```
#include "file"
```

See: [Include syntax](https://gcc.gnu.org/onlinedocs/cpp/Include-Syntax.html)

### Defines

```
#define FOO
#define FOO "hello"

#undef FOO
```

See: [Object-like macros](https://gcc.gnu.org/onlinedocs/cpp/Object-like-Macros.html)

### If

```
#ifdef DEBUG
  console.log('hi');
#elif defined VERBOSE
  ...
#else
  ...
#endif
```

See: [Conditional syntax](https://gcc.gnu.org/onlinedocs/cpp/Conditional-Syntax.html)

### Error

```
#if VERSION == 2.0
  #error Unsupported
  #warning Not really supported
#endif
```

See: [Diagnostics](https://gcc.gnu.org/onlinedocs/cpp/Diagnostics.html)

### Macro

```
#define DEG(x) ((x) * 57.29)
```

See: [Function-like macros](https://gcc.gnu.org/onlinedocs/cpp/Function-like-Macros.html)

### Token concat

```
#define DST(name) name##_s name##_t
DST(object);   #=> object_s object_t;
```

See: [Token concatenation](https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html)

### Stringification

```
#define STR(name) #name
char * a = STR(object);
#=> char * a = "object";
```

See: [Stringification](https://gcc.gnu.org/onlinedocs/cpp/Stringizing.html)

### file and line

```
#define LOG(msg) \
  console.log(__FILE__, __LINE__, msg)
#=> console.log("file.txt", 3, "hey")
```

See: [Predefined macros](https://gcc.gnu.org/onlinedocs/cpp/Standard-Predefined-Macros.html)
