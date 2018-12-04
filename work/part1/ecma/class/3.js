function Car() {
  // 새 객체의 기본 프로퍼티로 추가한다.
  this.color = 'Red';
}
// 자식 객체에게 제공할 자원을 등록한다.
Car.prototype.show = function () {
  console.log('this.color = ' + this.color);
};
// 함수는 선언 즉시 객체이므로 객체의 행동을 수행할 수 있다.
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
