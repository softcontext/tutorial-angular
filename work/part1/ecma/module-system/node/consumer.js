const provider = require('./provider');
// provider.js에 있는 자원을 사용하고 싶다.
// 그럴 때 require 함수를 사용한다.

console.log(typeof provider, provider);
// object { a: 10, say: [Function: say] }

console.log(provider.a);
// 10
provider.say();
// Hello World!

const provider2 = require('./provider');

console.log(provider === provider2);
// true
// require 작업은 한 번만 처리된다.

const {a, say} = require('./provider');
// require 처리결과는 바로 provider.js에서 exports한 객체다.
// 따라서, 해체 할당 문법을 사용할 수 있다.

console.log(a);
// 10
say();
// Hello World!