(function() {
  interface MyFunctionParamsType {
    (name: string, age: number): void;
  }

  let show: MyFunctionParamsType = function(name: string, age: number): void {
    console.log(`Name: ${name}, Age: ${age}`);
  };

  show("Tom", 56);
}());
