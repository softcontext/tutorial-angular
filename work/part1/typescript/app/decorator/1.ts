(function() {
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
})();



