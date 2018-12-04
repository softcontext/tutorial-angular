// 겉보기에는 클래스처럼 보이지만 실체는 (생성자 전용)함수입니다.
class Car {
  // 새 객체의 기본 프로퍼티로 추가한다.
  constructor () {
    this.color = 'Red';
  }
  // 자식 객체에게 제공할 자원을 등록한다.
  // Car.prototype.show 형태로 처리된다.
  show () {
    console.log('this.color = ' + this.color);
  }
  // 누구에게나 제공하고 싶은 자원을 등록한다.
  static info (obj) {
    console.log(Reflect.ownKeys(obj));
  }
}
// 자식 객체에게 제공할 자원을 등록한다.
// Car.prototype.show = function () {
//   console.log('this.color = ' + this.color);
// };

// 누구에게나 제공하고 싶은 자원을 등록한다.
// Car.info = function (obj) {
//   console.log(Reflect.ownKeys(obj));
// };

var c = new Car();
console.log(c);
console.log(c.__proto__ === Car.prototype); // true
console.log(c instanceof Car); // true

c.show();
Car.info(c);

// 어떤 자원을 static으로 등록하는가?

console.log(typeof Number.parseInt('100'));
