class Car {
  constructor (color = 'Red') {
    this.color = color;
  }
  show () {
    console.log('this.color = ' + this.color);
  }
  static info (obj) {
    console.log(Reflect.ownKeys(obj));
  }
}

var c = new Car('Blue');
console.log(c);

class Bus extends Car {
  constructor (color, doors = 4) {
    // ReferenceError:
    // Must call super constructor in derived class
    // before accessing 'this' or returning
    // from derived constructor
    super(color);
    this.doors = doors;
  }
}

console.log(Bus.prototype.__proto__ === Car.prototype); // true

var b = new Bus('Orange', 2);
console.log(b);
