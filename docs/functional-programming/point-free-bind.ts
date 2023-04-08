/* eslint-disable no-console */
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
