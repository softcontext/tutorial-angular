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