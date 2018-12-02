/**
 * 함수가 파라미터를 못 받는 경우,
 * 함수가 제대로 동작하기 위해서 
 * 기본값을 설정할 필요가 있다.
 */

function add(x, y) {
  return x + y;
}

console.log(add());
// NaN : Not a Number

/**
 * || 연산자를 사용하여 받는 파라미터가 없는 경우, 
 * 대신 기본값을 할당하는 방법이다. 
 */

function add2(x, y) {
  x = x || 0;
  y = y || 0;
  return x + y;
}

console.log(add2());
// 0

/**
 * 새로 도입된 문법을 사용하면
 * 좀 더 깔끔하게 코드를 작성할 수 있다.
 * 파라미터 자리에 할당 연산자는
 * 받는 파라미터가 없는 경우에만 작동한다.
 */

function add3(x = 0, y = 0) {
  return x + y;
}

console.log(add3(10));
// 10

/**
 * 파라미터 자리에서 간단한 연산처리도 할 수 있다.
 */

function add4(x = 0, y = 0, z = x + y) {
  console.log('z =', z);
}

add4(); // z = 0
add4(1, 2); // z = 3
add4(1, 2, 999); // z = 999