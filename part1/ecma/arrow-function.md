# Arrow Function

애로우함수는 선언하는 문법만 다른 것이 아니라 많은 부분에서 일반적인 함수와 다르므로 명확한 이해가 필요하다. 

* 애로우 함수는 선언된 위치를 기준으로 가장 가까운 스코프의 소유주(Function Context)에 자동으로 바인딩된다. 이러한 방식을 `Lexical Scope`라고 부른다. 바인딩은 고정이며 변경되지 않는다.
<br/>

* 애로우 함수는 이름을 가질 수 없으며 언제나 익명함수로 선언해서 사용한다. 따라서 함수 선언식은 이용할 수 없고 함수 표현식으로 정의해야 한다.
<br/>

* 애로우 함수는 생성자로 사용될 수 없다. new 키워드와 같이 이용할 수 없다는 뜻이다.
<br/>

* 애로우 함수는 prototype 프로퍼티가 없다. 따라서 상속관계를 맺을 수 없다. 모든 일반 함수는 상속을 위한 프로퍼티가 존재한다. 그 만큼 애로우 함수보다 무겁다는 뜻이다. 예를 들어서 이벤트 처리 시 사용하는 콜백함수는 상속관계를 맺지 않으므로 이러한 경우에 적극적으로 애로우 함수를 사용하는 것이 좋다.
<br/>

* 애로우 함수는 arguments 객체를 갖고 있지 않다. 따라서 파라미터를 명시적으로 선언해야만 전달되는 파라미터를 사용할 수 있다. 나머지 파라미터 문법을 이용하면 편리하게 파라미터를 이용할 수 있다.

애로우 함수는 함수 선언 시 `뚱뚱한 화살표 연산자(=>)`를 사용하여 정의한다.

```JavaScript
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
```

애로우 함수는 바디부분의 범위연산자(중괄호)를 명시적으로 선언하지 않으면 return 구문이 선언된 것처럼 행동한다. 사실 자바스크립트는 함수 끝에서 언제나 return 하는 행동방식을 보인다. 다만 일반 함수에서 return 구문을 생략하면 `return;`과 같이 행동하지만 애로우 함수에서는 `return 처리결과`와 같이 행동한다는 차이가 있을 뿐이다.

명시적으로 함수의 범위연산자(중괄호)를 사용하면 컴파일러는 개입하지 않는다.

```JavaScript
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
```

함수안에서 사용하는 this는 함수를 호출할 때 결정된다.

이미 알고 있으리라 생각하지만 점검 차원에서 this를 판별하는 방법을 살펴보자.

```JavaScript
global.a = 'a in global';

function foo() {
  console.log(this.a);
}

foo.a = 'a in foo';

const obj = {
  a: 'a in obj',
  foo
}

function Bar() {
  this.a = 'a in new object instanceof Bar';
  this.foo = foo;
}

const target = {
  a: 'a in target'
};

function baz(...args) {
  console.log(this.a);
  return args.join(',');
}

// 1. 글로벌 스코프의 있는 함수를 호출할 때
foo();

// 2. 객체의 멤버로 존재하는 메소드로써의 함수를 호출할 때
// obj가 foo 함수를 소유한 상태에서 함수가 호출되면 
// 함수의 Function Context는 obj가 된다.
obj.foo();

// 3. new 연산자와 같이 함수가 호출될 때
// 함수가 생성자로 사용되면 Function Context는 
// 새로 만들어지는 객체가 된다.
let b = new Bar();
b.foo();

// 4. 함수안에서 사용할 this를 지정하면서 호출할 때
// 4.1 call: 함수에 전달할 파라미터를 낱개로 지정한다.
console.log(baz.call(target, 10, 20, 30));

// 4.2 apply: 함수에 전달할 파라미터를 배열로 지정한다.
// appy 함수 내부에서 낱개로 처리되어 함수에 전달된다.
console.log(baz.apply(target, [10, 20, 30]));

// 5. 함수안에 this를 미리 고정시킨 후 사용할 때
const qux = baz.bind(target);
console.log(qux(10, 20, 30));
```

화살표 연산자로 만드는 함수는 Function.prototype.bind 처리 후 사용하는 함수와 비슷하게 작동합니다. 화살표 함수를 제대로 이해하기 위해서 계속 전진해 봅시다.

```JavaScript
global.a = 'a in global';

function foo() {
  console.log(this.a);
}

foo.a = 'a in foo';

foo(); 
// a in global

//
foo.call(foo); 
// a in foo
```

자, 이제 위 코드는 이해가 되리라 생각합니다. 다음 코드도 이해가 되는지 살펴보시죠.

```JavaScript
function foo() {
  console.log(this === foo); // true
  
  setTimeout(function() {
    console.log(this === foo); // false
    console.log(this.a); // undefined
  }, 1000);
}

foo.a = 'a in foo';

foo.call(foo);
```

foo 함수안에 존재하는 지역함수도 그 함수의 this는 함수가 호출될 때 결정됩니다. 따라서, foo의 this와 콜백함수의 this는 같지 않습니다. 콜백함수의 this를 foo 함수의 this와 같게 하려면 추가적인 조치가 필요합니다.

```JavaScript
function foo() {
  console.log(this === foo); // true

  setTimeout((function() {
    console.log(this === foo); // true
    console.log(this.a); // func
  }).bind(this), 100);
}

foo.a = 'a in foo';

foo.call(foo);
```

bind 함수를 사용하여 콜백함수의 this를 foo 함수의 this와 같게 만들었습니다. 매번 bind 처리를 하는 것이 번거롭다면 바로 이때 애로우 함수를 사용하시면 됩니다.

```JavaScript
function foo() {
  setTimeout(() => {
    console.log(this.a); // a in foo
  }, 100);
}

foo.a = 'a in foo';

foo.call(foo);
```

훨씬 깔끔하고 가독성이 좋아지죠. 애로우 함수의 this는 가장 가까운 스코프의 this와 일치됩니다. 따라서, 이벤트 시 작동하는 콜백함수를 작성할 때 좋습니다.

애로우 함수의 this는 렉시컬 스코프 룰에 따라서 코드가 있는 위치에서 가장 가까운 스코프에 바인딩됩니다. 객체는 스코프를 갖고 있지 않으므로 객체의 메소드를 작성할 때 애로우 함수를 사용하는 것은 대부분 적합하지 않습니다.

추가적인 학습은 다음 사이트를 참고하세요.

`https://mzl.la/1rrAsL3`

```JavaScript
/**
 * 일반 함수를 사용해야 할 때 vs 애로우 함수를 사용해야 할 때
 * 과제 : 결과를 예측하고 왜 그런지 설명하시오.
 */
console.log(this === module.exports); // true

this.title = "title in module.exports";

let foo = {
  title: "title in foo"
};

// method 함수는 메소드명, 익명함수를 파라미터로 받아서
// 동적으로 this가 가리키는 객체에 프로퍼티로 추가한다.
foo.method = function(name, cb) {
  this[name] = cb;
};

foo.method("bar", () => {
  console.log(this.title);
});

foo.bar();
```