// 함수의 블록 연산자가 없을 때 return 구문이 적용된다.
var fn = a => a * 2;
console.log(fn(10)); 
// 20

// 함수의 블록 연산자가 있을 때 return 구문은 적용되지 않는다.
var fn = a => {
  a * 2
};
console.log(fn(10)); 
// undefined

// 필요하다면 명시적으로 return 구문을 추가해야 한다.
var fn = a => {
  return a * 2
};
console.log(fn(10)); 
// 20

// 화살표 연산자 바로 오른쪽에 있는 중괄호는
// 블록 연산자 기호로 취급된다.
// 객체 선언 리터럴로 취급되기 위해서 
// 소괄호를 사용하고 있다.
var fn = a => ({
  id: a
});
console.log(fn(10)); 
// {id:10}