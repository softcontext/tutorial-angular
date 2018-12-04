(function() {
  class Sedan {
    constructor(color = 'Red', doors = 4) {
      this.color = color;
      this.doors = doors;
    }
    show() {
      console.log(this.color, this.doors);
    }
  }
  
  let s = new Sedan('Blue', 2);
  console.log(s);
  s.show();
}());
