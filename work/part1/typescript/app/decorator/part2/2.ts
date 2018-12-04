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