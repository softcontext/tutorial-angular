'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
var a = 10;

function say() {
  console.log('Hello World!');
}

function add(a, b) {
  return a + b;
}

// module.exports = {
//   a: a,
//   say: say
// }

// 함수 프로퍼티 축약 표현식을 사용하고 있다.
exports.a = a;
exports.say = say;