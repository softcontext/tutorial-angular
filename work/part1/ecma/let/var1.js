var global_scope_var = 10;

(function() {
  console.log('global_scope_var = ' + global_scope_var);
  // 함수 안쪽에서 외부에 존재하는 
  // 글로벌 스코프 자원은 접근이 가능하다.

  var function_scope_var = 20;

  if (true) {
    console.log('function_scope_var = ' + function_scope_var);
    // 안쪽에서 외부에 존재하는 
    // 함수 스코프 자원은 접근이 가능하다.

    var var_in_block = 30;
    // 조건문의 중괄호는 코드 블록 연산자이다.
    // 그러나, 조건문의 중괄호는 스코프 연산자가 아니다.
  }

  console.log('var_in_block = ' + var_in_block);
  // 조건문의 중괄호는 스코프 연산자가 아니기 때문에
  // 조건문 안에서 선언한 자원은 블록 연산자 외부에서 접근이 가능하다.
  // 대부분의 다른 언어들은 이것을 허용하지 않는다.
  
  console.log('function_scope_var = ' + function_scope_var);
  // 함수 스코프 자원은 함수안에서 전역적으로 접근이 가능하다.
})();

console.log('global_scope_var = ' + global_scope_var);
// 글로벌 스코프 자원은 전역적으로 접근이 가능하다.

// console.log('function_scope_var = ' + function_scope_var);
// ReferenceError : 함수 스코프 자원은 함수밖에서 접근이 불가능하다.
