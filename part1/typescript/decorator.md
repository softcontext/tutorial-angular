# Decorator

타입스크립트의 데코레이터는 파이썬의 데코레이터와 마찬가지로 함수를 파라미터로 받는 함수를 쉽게 선언하는 방법입니다.

`tsconfig.json` 파일에서 experimentalDecorators 컴파일러 옵션을 활성화해야합니다.

```JSON
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

## Class Decorator

클래스 위에 데코레이터를 설정하면 데코레이터 함수에게 클래스 객체의 참조가 전달된다.

```TypeScript
// Constructor Interface
interface PersonConstructor {
  new(name: string): Person;
}

/**
 * 파라미터 타입으로 Person을 사용하는 경우
 * 다음과 같은 에러가 발생할 수 있다.
 * 
 * 1. Cannot use 'new' with an expression
 * whose type lacks a call or construct signature.
 * 2. Argument of type 'typeof Person' is not assignable
 * to parameter of type 'Person'. 
 * Property 'name' is missing in type 'typeof Person'.
 * 3. Property 'prototype' does not exist on type 'Person'.
 *
 * 다음과 같이 처리하여 해결할 수 있다.
 * 1. 파라미터 타입으로 any를 사용한다.
 * 2. 파라미터 타입으로 인터페이스 PersonConstructor를 사용한다.
 */
function Hello(construct: PersonConstructor) {
  construct.prototype.say = function() {
    console.log(`Hello ${this.name}`);
  }
}

@Hello
class Person {
  constructor(private name: string = 'Anonymous') {
    this.name = name;
  }
}

let p = new Person('Tom');
(<any>p).say(); // Hello Tom
```

함수를 중첩해서 정의하면 데코레이터 사용 시 파라미터를 추가로 받을 수 있습니다.

```TypeScript
(function() {
  function Component(param: any) {
    return function(constructor: any) {
      return class extends constructor {
        constructor() {
          super();
          this.name = param.name;
        }
      }
    }
  }

  @Component({
    name: 'Tom'
  })
  class Person {

  }

  let p = new Person();
  console.log(p); // class_1 { name: 'Tom' }
}());
```

앵귤러는 적극적으로 데코레이터를 받아들여서 앵귤러의 구성 요소를 선언할 때 데코레이터에게 설정정보를 가진 객체를 전달하면 앵귤러 프레임워크가 클래스를 직접 객체로 생성하고 객체가 기본적으로 앵귤러의 구성요소로써의 역할을 수행할 수 있도록 조작합니다.

## Method Decorator

```TypeScript
(function() {
  function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
    // P { foo: [Function] }
    console.log(`${propertyKey}() was called!`);
    // foo() was called!
    console.log(descriptor);
    // {
    //   value: [Function],
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // }
  }

  class P {
    @log
    foo() {

    }
  }

  const p = new P();
  p.foo();
})();
```

메소드 위에 `@log` 데코레이터를 설정하면 해당 메소드가 호출될 때 마다 로그가 출력됩니다. 다음 예제를 보시면 어떻게 기능을 추가할 수 있는지 힌트를 얻게 됩니다.

```TypeScript
(function() {
  function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    // 타겟 객체의 메소드를 포장한 새 함수를 설치한다.
    descriptor.value = function() {
      // arguments: 타겟객체의 메소드가 받아야 할 파라미터를 대신 받는다.
      console.log(`${propertyKey}() was called. arguments:`, arguments);
      // 타겟 객체의 메소드에게 파라미터를 전달하면서 호출한다.
      var result = method.apply(this, arguments);
      // 타겟 객체의 메소드가 리턴 값을 받아서 재 리턴한다.
      return result;
    };
  }

  class P {
    @log
    foo(a: string, b: string) {
      console.log(`Do something`);
    }
  }

  const p = new P();
  p.foo('Hello', 'World');
  // foo() was called. arguments: { '0': 'Hello', '1': 'World' }
  // Do something
})();
```

데코레이터는 프로퍼티나 파라미터에도 적용할 수 있습니다. 이에 대한 부분은 생략하오니 관심이 있는 분은 다음 사이트를 참고하시기 바랍니다.

`https://www.typescriptlang.org/docs/handbook/decorators.html`
