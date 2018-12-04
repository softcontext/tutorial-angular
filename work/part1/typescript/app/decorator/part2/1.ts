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

