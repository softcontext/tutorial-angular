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

var c2 = new Car();
console.log(c2);
