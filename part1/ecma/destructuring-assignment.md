# Destructuring Assignment

해체(구조 분해) 할당이라고 번역해서 부른다. 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트 표현식이다.

```JavaScript
var log = console.log;

var obj = {
  a: 1,
  b: 2,
  c: 3
};

/**
 * object.property 문법으로 접근해서 하나씩 할당한다. 불편하다!
 */
var aa = obj.a;
var bb = obj.b;

log(aa + bb);
// 3

/**
 * 해체할당 문법을 사용하면 객체의 프로퍼티를 
 * 간단하게 꺼내어 새 변수에 할당할 수 있다.
 */
var {a, b} = obj;
// 변수 a, c는 반드시 객체의 프로퍼티명과 같아야 한다.

log(a + b);
// 3

/**
 * 배열은 인덱스기반으로 해체 할당할 수 있다.
 */
var array = [10, 20, 30];

var [x1, , x3] = array;

log('x1 = ' + x1); 
// x1 = 10
log('x3 = ' + x3); 
// x3 = 30
```

함수가 객체를 파라미터로 받을 때, 해체 할당 문법을 사용하면 코드도 짧아지고 가독성도 향상된다. 객체는 프로퍼티 키로 해체하기 때문에 순서가 상관없다.

```JavaScript
function show({age, name}) {
  console.log(name, age);
  // Chris 25
}

let user = {
  id: 1,
  name: 'Chris',
  age: 25
};

show(user);
```
