// 조건문의 블록 연산자는 var 연산자로 선언한 변수의 스코프를 제한하지 않는다.

for (var i = 1; i <= 3; i++) {
  console.log('in block : i = ' + i);
}

console.log('out block : i = ' + i); 
// 접근이 가능하다!

// 함수에서 사용하는 중괄호는 블록 연산자이자 스코프 연산자이므로
// 변수의 접근을 제한하려면 함수안에서 선언해야 한다.

for (let j = 1; j <= 3; j++) {
  console.log('in block : j = ' + j);
}

// console.log('out block : j = ' + j); 
// ReferenceError: j is not defined
// 조건문안에서 let 연산자로 선언한 변수는 조건문 밖에서 접근할 수 없다.
// let 연산자로 선언한 변수에 한해서 조건문의 중괄호는 
// 범위 연산자이자 스코프 연산자로 작동한다.