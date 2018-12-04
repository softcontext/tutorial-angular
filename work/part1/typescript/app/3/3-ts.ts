(function() {
  class Sedan {
    // private color: string;
    // private doors: number;
    constructor(private color: string = 'Red', private doors: number = 4) {
      this.color = color;
      this.doors = doors;
    }
    public show(): void {
      console.log(this.color, this.doors);
    }
  }

  let s = new Sedan('Blue', 2);
  console.log(s);
  s.show();
})();
