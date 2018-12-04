// 파라미터가 없는 경우 빈 소괄호를 명시적으로 선언해야 한다.
var foo1 = () => {
  return 1;
}

// 파라미터가 하나인 경우 소괄호를 생략할 수 있다.
var foo2 = a => {
  return a * 2;
}

// 파라미터를 복수로 받는 경우 소괄호를 명시적으로 선언해야 한다.
var foo3 = (a, b) => {
  return a + b;
}

console.log(foo1());
console.log(foo2(2));
console.log(foo3(3, 4));