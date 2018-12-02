# Spread Operator

스프레드 연산자 또는 펼침(전개) 연산자라고 부른다. 다수의 요소를 하나씩 나누어 처리할 수 있는 편리한 문법이다. 이터러블 객체(배열 같은 객체) 앞에 `...` 연산자를 붙여서 설정한다.

```
// 함수 호출 시 낱개로 잘라서 파라미터로 전달한다.
myFunction(...iterableObj);

// 배열에 작성 시 낱개로 잘라서 새로운 배열의 요소로 추가한다.
[...iterableObj, 4, 5, 6]
```

```JavaScript
// 함수는 파라미터를 낱개로 받아서 처리하도록 설계되었다.
function add(a, b) {
  return a + b;
}

// 마침 갖고 있는 변수의 자료형이 배열이다.
let arr = [10, 20, 30];

// 따라서, 배열 요소를 직접 하나씩 꺼내서 
// 파라미터로 전달해야 한다. 불편하다!
console.log(add(arr[0], arr[1]));
// 30

// Function.prototype.apply 함수는
// 배열을 받아서 낱개로 처리하는 로직을 제공한다.
// apply 함수의 두 번째 파라미터로 배열을 받는다.
// 배열의 길이가 클수록 이전 방법 보다는 편리하다.
console.log(add.apply(null, arr));
// 30

/**
 * 스프레드 연산자 ...를 사용하면 
 * 배열의 아이템들을 낱개로 펼친 다음 
 * 함수에게 파라미터로 전달한다.
 */
console.log(add(...arr));
// 30
```

```JavaScript
let arr1 = [2, 3, 4];

// arr1 배열을 낱개로 펼친 다음 새 배열에 넣는다.
let arr2 = [1, ...arr1, 5];

console.log(arr2);
// [ 1, 2, 3, 4, 5 ]

arr1 = [10, 20, 30];
arr2 = [40, 50];

/**
 * Function.prototype.concat : 
 * 두 배열을 붙여서 새 배열을 만든다.
 */
let arr3 = arr1.concat(arr2);
console.log(arr3);
// [ 10, 20, 30, 40, 50 ]

/**
 * Function.prototype.put : 
 * 배열의 끝에 요소를 추가한다.
 */
let index = arr1.push(arr2);
console.log(index);
// 4
console.log(arr1);
// [ 10, 20, 30, [ 40, 50 ] ]
// arr2가 가리키는 배열이 통째로 들어간다.

arr1 = [10, 20, 30];
arr2 = [40, 50];

arr1.push(...arr2);
console.log(arr1);
// [ 10, 20, 30, 40, 50 ]
// arr2 배열의 아이템들을 낱개로 펼친 다음 
// arr1 배열에 추가한다.
```