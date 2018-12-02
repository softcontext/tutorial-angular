// 함수는 파라미터를 낱개로 받아서 처리하도록 설계되었다.
// 받은 파라미터 중에서 2개만 사용되고 있다.
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

/**
 * 함수의 파라미터 자리에 사용되는 ... 기호는 
 * 스프레드 연산자란 용어 대신 나머지 파라미터라고 부른다.
 */
function calc(operator, ...args) {
  // 낱개들을 하나의 배열로 모으므로 나머지 파라미터다.
  // - 전달 받은 파라미터 중에서 첫 값을 operator 변수에 할당한다.
  // - 나머지 파라미터들은 args 배열에 할당한다.
  console.log(Array.isArray(args));
  // args는 배열이다.
  console.log(typeof arguments === 'object');
  // arguments는 객체다.

  switch (operator) {
    case '+':
      return add(...args);
      // 배열을 낱개로 펼치므로 스프레드 연산자다.
    case '-':
      return subtract(...args);
      // 배열을 낱개로 펼치므로 스프레드 연산자다.
    default:
      return [operator, ...args];
      // 배열을 낱개로 펼치므로 스프레드 연산자다.
  }
}

console.log(calc('+', 1, 2, 3));
// 3
console.log(calc('-', 1, 2, 3));
// -1
console.log(calc('*', 1, 2, 3));
// [ '*', 1, 2, 3 ]