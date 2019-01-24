var a = 10;

function say() {
  console.log('Hello World!');
}

export function add(a, b) {
  return a + b;
}

// module.exports = {
//   a: a,
//   say: say
// }

// 함수 프로퍼티 축약 표현식을 사용하고 있다.
export {
  a,
  say
}