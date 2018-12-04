/**
 * ES5
 */
function A() {}
A.fn = function() {};

function B() {}
B.prototype = Object.create(A.prototype);

// B.fn(); 
// TypeError: B.fn is not a function

/**
 * ES6
 */
class C {
  static fn() {}
}

class D extends C {}

D.fn(); 
// 호출이 가능하다.