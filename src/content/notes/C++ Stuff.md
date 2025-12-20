---
created: 2025-09-24T00:00:00.000Z
modified: 2025-10-10T00:00:00.000Z
tags:
  - notes
  - code
title: Learning C++
description: 'Miscellaneous notes on C++ concepts, coming from a C background'
date: 2025-09-24T00:00:00.000Z
permalink: learning-c/
layout: post.njk
thumbnail: /content/attachments/cpp.png
---

Miscellaneous notes on C++ concepts, coming from a C background
# Learning C++

> [!warning] Messy
> This note is just a blob of personal notes on C++. Beware!!!

![cpp.png](/content/attachments/cpp.png)

In summary,
* Holy moly, there's a lot of nuance in C++, especially with regard to memory, performance, and safety. I've been living in the C stone age for so long I didn't know all this stuff existed!

# Primary Resources

[The C++ Programming Language (4th Edition) by Bjarne Stroustrup](https://chenweixiang.github.io/docs/The_C++_Programming_Language_4th_Edition_Bjarne_Stroustrup.pdf)
* Read through "1. Notes to the Reader" and "2. A Tour of C++: The Basics"`
	* Gets you familiar with the basic C++ philosophy, syntax, features
* Read through the rest of the "X. A Tour of C++: ..." chapters

> The general ideals for design and programming can be expressed simply:
	- Express ideas directly in code.
	- Express independent ideas independently in code.
	- Represent relationships among ideas directly in code.
	- Combine ideas expressed in code freely – where and only where combinations make sense.
	- Express simple ideas simply.

[Effective Modern C++](https://ananyapam7.github.io/resources/C++/Scott_Meyers_Effective_Modern_C++.pdf)
* Read through all sections

# Concepts

reference
* a non-nullable, non-reassignable "pointer" to the original variable/structure. a named "alias" to the exact same underlying variable.
* "A reference is similar to a pointer, except that you don't need to use a prefix ∗ to access the value referred to by the reference."
* pass-by-reference - passing references as arguments to functions

move semantics and rvalue references
* introduced in C++ 11
* instead of copying allocated memory, *move* allocated memory to reuse it!
	* *steal* data from an existing, temporary object
* https://www.internalpointers.com/post/c-rvalue-references-and-move-semantics-beginners
		* aside: rule of three and rule of five
* https://blog.vero.site/post/rvalue-references
* https://eli.thegreenplace.net/2011/12/15/understanding-lvalues-and-rvalues-in-c-and-c/

lvalue
* value on the left-hand-side of an assignment
* lvalues have an persistent, identifiable location in memory
* lvalues hold rvalues
```
int x = 5; // x is an lvalue
int* ptr = &x; // &x yields the address of an lvalue
*ptr = 10; // *ptr is an lvalue
```

rvalue
* value on the right-hand-side of an assignment
* rvalues do not have a persistent, identifiable location in memory
```
int y = 5; // 5 is an rvalue
int z = x + y; // x + y is an rvalue
```

vector
* resizable array (think: ArrayList from Java)
* Use vectors when you need array-like access but the size changes
* Use linked lists when you need stack/queue-like access

new and delete
* Consider this a more concise malloc() and free()
* Avoid direct, "naked" usage of new and delete.
	* For example, by placing it in an object constructor and destructor. These will be called automatically (inserted by the compiler) as objects go out of scope.
	* For example, by using a smart/shared pointer object that will auto-free when going out of scope
	* For example, by using *containers* (ex. vector/string/map) and *handle classes* (ex. lock/unique_ptr)

constexpr
* code that runs at compile time - "to be evaluated at compile time"
* vs. const - "I promise not to change this value (at run time)"
* you can do a lot with this!

template
* "placeholder" type for use in function, class, and constexpr definitions to help maintain type safety

static initializers
* compiler-generated functions that run during load time, in order to populate non-local variables with data
* be aware of when this occurs, as it adds extra overhead!

list assignment
* you can assign values with this list syntax `{}`
```
int i1 = 7.2; // i1 becomes 7
int i2 {7.2}; // error: floating-point to integer conversion
int i3 = {7.2}; // error: floating-point to integer conversion (the = is redundant)
```

range for loop
* A copy of the value of v is placed in x
* x could also be a reference (ex. `auto& x`)
```
int v[] = {0,1,2,3,4,5,6,7,8,9};

// for each x in v
for (auto x : v)
	cout << x << '\n';

```

class
* think: allows you to create a new basic data type like int or float
* allows a tight coupling between data members of a struct/typedef and the operations that can be done on the struct/typedef
* private - can only be accessed inside the class
* public - can be accessed by anyone with an instance of the class
* constructor
	* you can put a member initializer list before the first opening brace of constructor to have default member values
	* must be same name as the class
	* prefer using braced initializer when creating a class instance
	* you can define multiple constructors with different parameters for the same class
* destructor
* structs are classes where all members are public
* structs can have member functions
* member functions are implicitly invoked on the member that called it (think: "self")
* initialization by copy - assignment from one instance to another (using = or braced initializer)
	* default: all members of class are copied to new class
* private class data can still be accessed through address manipulation and explicit type conversion. but this is not recommended
* `explicit` keyword on constructor means it cannot be used for implicit conversions to initialize the class
	* guide: single argument constructors should be `explicit` to avoid accidental implicit conversions
* functions defined in the class definition itself are `inline` and will be duplicated for each translation unit
* put `const` after function signature and before implementation braces to promise that the function will not modify the class's data members
	* `int Date::year() const {…}`
* `mutable` class member prefix means a the value can be modified even in a const object
* `this` in a class function is a pointer to the class instance
* `static` members are shared across all class instances
	* `static` prefix is not included in the definition
	* beware of race conditions on static members if multiple threads can access it at the same time!!
* classes (and enums) can be nested inside a class
* `using` to create a "member alias". handy for templates/generic programming
* member initializer list in a constructor can have an efficiency advantage. For example, directly initializing to a value vs initializing to an empty value and then copying
* copy constructor/assignment - uses & (reference)
* move constructor/assignment - uses && (rvalue reference)
* return-by-value return values are trated as rvalues at the return site

enum classes
* `enum class Color {red, blue, green}`
* members of the enum are namespaced to `Color`, access with `Color::red`
* since it is a class, you can define operators for it (ex. make `++` do something special with the enum)

separate compilation
* https://hackingcpp.com/cpp/lang/separate_compilation.html
* files -> preprocessor -> compiled into standalone object files
* object files -> linked into executable
	* linker will combine all the binary code in the object files and connect function calls between the files together
* translation units - a file with code in it (.cpp)
	* One Definition Rule (ODR) - definitions cannot be duplicated in a translation unit
		* header guards are used to prevent multiple headers in a translation unit duplicate defining
		* Note that definitions CAN be duplicated PER individual translation unit, just not multiple times in ONE unit
* external linkage - definition of declared symbol is in a separate, outside translation unit (to be linked)
* internal linkage - definition of declared symbol is in the current translation unit
* beware of what goes in headers, since they the preprocessor will paste the contents into the translation unit before compiling. if there are multiple definitions, linker will fail!

namespaces
* `name_of_namespace::name_of_my_definition_in_namespace`
* allows stuff to be grouped together and prevent names of functions/variables from clashing with other namespaces

exceptions
* you can `throw` exceptions and handle them in `try {} catch (e) {}` blocks

invariant
* more of a concept than a language feature
* invariant - a condition that should always be true
* class invariant - a condition that should always be true for a class (ex. in a vector class, the size of elements will always equal the size of the array)

static assertions
* `static_assert(condition, "error message")`
* condition can be anything that is a constexpr (can be statically evaluated)

you can specify default arguments for functions

lifetime management
* constructors, copy, move, destructor
* if one of the above has a nontrivial implementation, you probably need to implement all of the above
* destructors are automatically called when a variable goes out of scope or the object is deleted
