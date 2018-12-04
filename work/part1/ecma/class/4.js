// function Car() {
//   // 새 객체의 기본 프로퍼티로 추가한다.
//   this.color = 'Red';
// }

// 겉보기에는 클래스처럼 보이지만 실체는 (생성자 전용)함수입니다.
class Car {
  constructor () {
    this.color = 'Red';
  }
}

// Class constructor Car cannot be invoked without 'new'
// var x = Car();

// 자식 객체에게 제공할 자원을 등록한다.
Car.prototype.show = function () {
  console.log('this.color = ' + this.color);
};
// 누구에게나 제공하고 싶은 자원을 등록한다.
Car.info = function (obj) {
  console.log(Reflect.ownKeys(obj));
};

var c = new Car();
console.log(c);
console.log(c.__proto__ === Car.prototype); // true
console.log(c instanceof Car); // true

c.show();
Car.info(c);
