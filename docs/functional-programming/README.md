# Functional Programming

## Point-free style

Point-free style programming Point-free style, also known as tacit programming, is a functional programming style in which a function's definition **does not explicitly reference** its arguments. Instead, the function is defined solely in terms of the composition of other functions.

```ts
// Imperative style
// function refers to its arguments explicitly to calculate the result
function doubleAndAddOne(array: number[]): number[] {
  let result: number[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[i] * 2 + 1);
  }
  return result;

// Point-free style
// function is defined solely in terms of the composition of other functions
// and does not refer to its arguments explicitly
const double = (x: number): number => x * 2;
const addOne = (x: number): number => x + 1;
const doubleAndAddOne = (array: number[]): number[] => array.map(double).map(addOne);
```

Point-free style forces to decompose a function to basic functions and makes function easily reusable.

### Point-free style with methods

In order to extract a method from an object we need to bind it to the object as it will loose its context.

```ts
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
  greet: function (message: string) {
    const fullName = this.getFullName();
    return `${message}, ${fullName}!`;
  },
};

// This works as expected
console.log(person.greet('Hello'));

// Now we try to extract the greet function
const greeter = person.greet;
// throws: TypeError: Cannot read properties of undefined (reading 'getFullName')
// as `greeter` is run outside its `person` context.
console.log(greeter('Hey'));

// If we bind the context to the function, it works
const greeter2 = person.greet.bind(person);
console.log(greeter2('Salute'));
```

## Injection in FP

Provide to a function all the dependencies it needs to do its job. This is called injection.

```ts
const mapper = (x) => x * 2;
const doulbled = [1, 2, 3].map(mapper);
```

`map` function needs a mapper function to do its job. We provide it with the `mapper` function. This is called injection.
