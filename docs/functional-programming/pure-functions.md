## Pure Functions

In functional programming, a pure function is a function that has the following two properties:

- Given the same input, it always produces the same output.
- It has no side effects. It does not modify something outside of its scope.

> Checklist: Is my function impure?
>
> - Depends on Global state? If yes, then yes
> - Does it have internal state? If yes, then yes
> - Does it alter arguments? If yes, then yes
> - Does it has inherent non-pureness (uses random data, uses current date, etc)? If yes, then yes
> - Does it have side effects?

It's important to note that not all impure functions are necessarily bad or should be avoided. In some cases, we need to work with external state or modify some state outside of the function's scope. However, we should be aware of the side effects and try to minimize their impact on the rest of our program. Functional programming encourages us to isolate impure functions and use them judiciously, while favoring pure functions whenever possible.
