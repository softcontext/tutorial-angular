(function() {
  function hello(constructorFn: Function) {
    constructorFn.prototype.hello = function() {
      console.log("hello");
    }
  }

  @hello
  class Person {

  }

  const p = new Person();
  // p.hello(); // error 실제로 없고 다른 방법으로 추가됬기 때문에
  (<any>p).hello(); // hello - ??? 왜 이렇게 해야하는지 추후에 업데이트 하겠습니다.
})();



