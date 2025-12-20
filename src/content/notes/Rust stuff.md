---
created: 2025-10-19T00:00:00.000Z
modified: 2025-10-31T00:00:00.000Z
tags:
  - notes
  - code
title: Rust stuff
description: 'Miscellaneous notes on Rust concepts, coming from a C background'
date: 2025-10-19T00:00:00.000Z
permalink: rust-stuff/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---

Miscellaneous notes on Rust concepts, coming from a C background
# Rust stuff

> [!warning] Messy
> This note is just a blob of personal notes on Rust, in a similar vein as that [blob of notes on C++](/learning-c). I also stopped taking notes at some point in my readings so this page doesn't cover everything. Beware!!!

https://doc.rust-lang.org/book/
https://rust-unofficial.github.io/too-many-lists/
https://corrode.dev/blog/flattening-rusts-learning-curve/
that embedded rust book
https://docs.rust-embedded.org/book/c-tips/index.html
https://github.com/diwic/reffers-rs/blob/master/docs/Pointers.md
https://corrode.dev/blog/prototyping/

# General
Automatic referencing and dereferencing
* No need for arrow operators to read a value out of a pointer to the object.
* Rust will figure this out automatically and apply the proper reference or dereference as required

Methods are functions defined in an `impl` block with self as the first parameter. Associated functions don't have self as the first parameter and are accessed from the struct's namespace using `::`

Async code requires a runtime. The runtime is what determines how the thread will wait and resume between different async/await actions.

Interior mutability - value appears immutable for most uses, but can be mutated in certain situations
* Good use case: mock objects

Iterators and closures are zero overhead. Iterators have the same performance as normal loops.

Keep unit tests in the same file as source, integration tests in the tests/ directory

# Ownership
Heap data is moved when it is assigned (` = `). Ownership of that heap memory transfers to the variable on the left side of the assignment.

Use references (`&`) to use a value without transferring ownership.
* References are effectively C pointers, not C++ references/aliases
* Mutable references can only be borrowed ONE AT A TIME. This prevents two places having a mutable reference to something and modifying/reading it at the same time.
* Mutable references cannot exist when an immutable reference to the same data also exists
* References exist from when they are introduced until they are last used within a scope
* A slice is a kind of reference to part of an array/collection, like a String

# Pointers
References (`&`) are pointers

`Box<T>` is a pointer to data on the heap. Boxes own the value they point to.

`deref` trait lets a struct automatically dereference itself (such as to access a stored value). It changes the behavior of the `*` operator.
* Rust will automatically call `.deref()` on the object being dereferenced

`drop` trait defines what happens when a pointer (like Box) goes out of scope (usually free the heap data it points to).

With `RefCel<T>` borrowing and ownership rules are enforced at run time instead of compile time.
* We obtain immutable and mutable references to the data inside RefCell using RefCell's runtime borrow and borrowmut API. Only one mutable borrow and many immutable borrow can exist at any point while running (same as the static borrow checking rules)
* "Mutex is the thread safe version of RefCell". So consider refcell kind of like a single threaded mutex?

Weak references need to be upgraded to strong references in order to be used. Some overhead is involved in this, but the tradeoff is that a weak reference doesn't count towards ownership count until it is upgraded. Good for data that doesn't need to be owned and is okay for it to not exist.
* You can also use weak refs to prevent ownership reference cycles, where a refcount becomes inaccurate leading to a memory leak
# Traits
`where` clause to specify traits of each generic parameter in the function signature

# Generics
Generics are kind of like void pointers

Use `<>` to define names for the generic types to be used. By convention and for readability, the names of these generic types are usually one letter, like `T`

Generic types don't incur anymore overhead than concrete types
* At compile time, rust will deduce all usages of a generic type and create a concrete type for each one it finds (monomorphization)

Associated types
