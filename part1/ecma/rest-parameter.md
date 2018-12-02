# Rest Parameter

레스트(나머지) 파라미터 문법은 스프레드 연산자와 동일한 `...` 연산자를 사용하다. 스프레드 연산자는 다수의 항목을 가진 객체를 낱개로 펼치는 역할을 수행하고 나머지 파라미터 연산자는 낱개로 펼쳐진 요소들을 하나의 배열로 모으는 역할을 수행한다. 실제 코드를 보면서 좀 더 구체적으로 차이점을 알아보자.

```JavaScript
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
```

사실 하나의 `...` 연산자에 두 가지 호칭이 있다는 것이 잘 이해가 안 될 수도 있다. 하지만 다음 예제를 보면 왜 그런지 이해가 될 것이다.

```JavaScript
const [first, ...arr] = [10, 20, 30, 40];
// 배열을 낱개로 펼치므로 스프레드 연산자이면서
// 낱개들을 하나의 배열로 모으므로 나머지 파라미터다.
console.log(first);
// 10
console.log(arr);
// [ 20, 30, 40 ]
```

여러개가 하나로 취급되는 상황에서 `...` 연산자로 낱개로 쪼갤 수 있고 낱개로 각각 취급되는 상황에서는 `...` 연산자를 사용하여 하나로 모을 수 있다고 생각하자.
