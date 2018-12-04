(function() {
  function Component(param: any) {
    return function(constructor: any) {
      // 생성자를 오버라이드하여 새로운 클래스를 반환한다.
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
