var log = console.log;

var obj = {
  a: 1,
  b: 2,
  c: 3
};

/**
 * object.property 문법으로 접근해서 하나씩 할당한다. 불편하다!
 */
var aa = obj.a;
var bb = obj.b;

log(aa + bb);
// 3

/**
 * 해체할당 문법을 사용하면 객체의 프로퍼티를 
 * 간단하게 꺼내어 새 변수에 할당할 수 있다.
 */
var {a, b} = obj;
// 변수 a, c는 반드시 객체의 프로퍼티명과 같아야 한다.

log(a + b);
// 3

/**
 * 배열은 인덱스기반으로 해체 할당할 수 있다.
 */
var array = [10, 20, 30];

var [x1, , x3] = array;

log('x1 = ' + x1); 
// x1 = 10
log('x3 = ' + x3); 
// x3 = 30