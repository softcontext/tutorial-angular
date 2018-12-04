class Sedan {
  color: string;
  // doors: number;
  constructor(color = 'Red', private doors = 4){
    this.color = color;
    // this.doors = doors;
  }
  show(){

  }
  static print(){

  }
}

let s = new Sedan('Blue', 2);
console.log(s);
