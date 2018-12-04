(function() {
  interface PersonConstructor {
    new(name: string): Person;
  }

  function Hello(construct: PersonConstructor) {
    const obj: Person = new construct('Tom');
    console.log(obj); // Person { name: 'Tom' }
  }

  function HelloFactory(show: boolean) {
    if (show) {
      return Hello; // Hello 데코레이터 함수를 사용한다.
    } else {
      return null; // 데코레이터 함수를 사용하지 않는다.
    }
  }

  @HelloFactory(true)
  class Person {

  }
})();



