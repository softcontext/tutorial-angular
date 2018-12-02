# let

let 연산자는 `스코프(접근이 가능한 유효 범위)`를 갖는 지역 변수를 선언합니다. 

```JavaScript
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
  // expected output: 2
}

console.log(x);
// expected output: 1
```

이미 var 연산자가 있었는데 왜 let 이라는 연산자를 새로 도입했을까요?

## var 연산자의 문제점

let 연산자를 제대로 이해하기 위해서 기존에 사용하던 var 연산자의 문제점을 살펴보는 것이 좋겠습니다. let 연산자가 도입되기 전까지는 언제나 스코프를 갖는 변수를 선언할 수 없었습니다.

코드 `블록 연산자`는 코드를 중괄호로 감싸서 처리대상 코드를 그룹핑하기만 할 뿐, 그 안에 존재하는 자원의 접근여부에는 관여하지 않습니다. 접근여부를 결정하는 스코프로는 다음 2가지가 있습니다.

### 글로벌 스코프

글로벌 스코프로 선언한 자원은 파일의 처음부터 끝까지 어느 위치에서든 해당 자원에 접근하여 사용할 수 있습니다. var 연산자로 변수를 선언하면 글로벌 스코프를 갖는 자원이 됩니다.

### 함수 스코프

함수 안에서 정의한 자원은 함수 외부에서 접근할 수 없습니다. 함수 내부에서만 처음부터 끝까지 해당 자원에 접근하여 사용할 수 있습니다.

> 일부 전문가들은 클로저 스코프를 추가하여 3가지 있다고 얘기하기도 합니다.

```JavaScript
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
```

var 연산자로 선언한 자원의 접근 가능여부는 헷갈리기 쉽다. 대신 let 연산자를 사용하면 간단히 정리된다. 평소 알던 다른 언어에서 제공하는 스코프 개념과 같아지기 때문이다.

```JavaScript
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
```

var 연산자는 심지어 재 선언도 허용하므로 협업 시 버그를 양산하는 주범이었다.

```JavaScript
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
```

변수 선언 시, let 연산자를 사용하면 다른 언어들과 마찬가지로 언제나 중괄호에 따라 변수의 스코프가 결정된다. 따라서, var 연산자 대신 let 연산자의 사용을 권장한다.

```JavaScript
/**
 * 과제 : 출력 결과를 예상하고 왜 그런지 설명해 보자.
 * 기술면접에서 많이 물어보는 질문이다.
 */

for (var i = 1; i <= 3; i++) {
  console.log('i =', i);
}

for (var j = 1; j <= 3; j++) {
  setTimeout(function () {
    console.log('j =', j);
  }, 2000);
}

for (var k = 1; k <= 3; k++) {
  (function() {
    var count = k;
    setTimeout(function () {
      console.log('count =', count);
    }, 3000);
  }());
}

for (let m = 1; m <= 3; m++) {
  setTimeout(function () {
    console.log('m =', m);
  }, 4000);
}

console.log('Done');

var oldTime = Date.now();

while (Date.now() < oldTime + 1000) {}

console.log('End of Code');
```
