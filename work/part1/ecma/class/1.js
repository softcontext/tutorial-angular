/*
  함수의 2가지 용도
  1. 생성자: 새 객체를 만든다.
  2. 메소드: 로직을 제공한다.
*/

function car() {
  this.color = 'Red';
}

// #1
var c = new car();
// 새 객체가 만들어지는 과정
// 1. {}
// 2. {__proto__:car.prototype}
// 3. {__proto__:car.prototype, color: 'Red'}
// 4. c = {__proto__:car.prototype, color: 'Red'}
console.log(c);
console.log(c.__proto__ === car.prototype); // true

// #2
var result = car();
console.log(result);
console.log(global.color);
