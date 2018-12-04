(function() {
  function init<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      firstName = "Tom";
      lastName = "Cruise";
      
      sayMyName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  }

  @init
  class P {
    age: number;

    constructor(age) {
      this.age = age;
    }
  }

  let p = new P(56);
  console.log(p); // class_1 { age: 56, firstName: 'Tom', lastName: 'Cruise' }
  console.log((<any>p).sayMyName()); // Tom Cruise
}());