var a = 10;

function say() {
  console.log('Hello World!');
}

// 이 함수는 exports에 등록하지 않았으므로
// 다른 파일에서 사용할 수 없다.
function add(a, b) {
  return a + b;
}

// module.exports = {
//   a: a,
//   say: say
// }

// exports는 module.exports를 가리키는 별칭이다.
exports.a = a;
exports.say = say;