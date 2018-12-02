(function(global) {
  var add = function(x, y) {
    return x + y;
  };

  var sub = function(x, y) {
    return x - y;
  };

  // calc는 모듈이다.
  var calc = {
    add: function(a, b) {
      return add(a, b);
    },
    sub: function(a, b) {
      return sub(a, b);
    }
  };

  global.calc = calc;
})(global);

console.log(global.calc.add(1, 2));
// 3
console.log(calc.sub(1, 2));
// -1
// global은 생략할 수 있다.