var multi_declare = 10;

var multi_declare = 20;
// 재 선언이 가능하다!

let single_declare = 10;

// let single_declare = 20;
// SyntaxError: Identifier 'single_declare' has already been declared
// 재 선언이 불가능하다.

if (true) {
  var multi_declare = 30;
  // 이미 존재하는 변수를 재선언!

  let single_declare = 30;
  // 다른 변수를 선언

  console.log('multi_declare = ' + multi_declare);
  // 30
  console.log('single_declare = ' + single_declare);
  // 30
}

console.log('multi_declare = ' + multi_declare);
// 30
console.log('single_declare = ' + single_declare);
// 10