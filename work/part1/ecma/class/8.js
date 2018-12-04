class Square {
  constructor(length = 1) {
    this.length = length;
    // this.area = length * length;
  }
  get area() {
    return this.length * this.length;
  }
  set area(area) {
    this.length = Math.sqrt(area, 2);
  }
}

var s = new Square(10);
console.log(s.length);
console.log(s.area);

// 면적을 주고 객체의 길이정보가 같이 갱신되면 좋겠다.
s.area = 400;

console.log(s.length);
console.log(s.area);
