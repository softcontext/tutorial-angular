var CONSTABLE_PI = 3.141592;
// 대문자로 변수명을 지어서 상수처럼 사용함을 알린다.

CONSTABLE_PI = 3.14;
// 하지만, 값의 변경을 원천적으로 막을 수 없었다.

const CONSTANT_PI = 3.141592;
// 상수를 선언한다.

// CONSTANT_PI = 3.14; 
// TypeError: Assignment to constant variable.
// const 연산자로 선언한 상수에 값을 재 할당할 수 없다.

/**
 * 상수가 객체의 참조 값을 갖고 있는 경우
 */

const USER = {
  name: 'Chris'
};

USER.name = 'Aaron';
// USER가 가리키는 참조 값을 변경할 수는 없지만
// 객체의 프로퍼티는 상수가 아니므로 변경할 수 있다.
