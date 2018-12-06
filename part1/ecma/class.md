# Class

## 클래스 문법으로 작성한 생성자 함수의 특징

* 클래스는 호이스팅 되지 않는다. 클래스 문법으로 선언한 생성자 함수는 호이스팅 되지 않는다. 따라서, 밑에서 선언한 클래스를 위에서 호출하는 만행(?)을 저지를 수 없다.  
  
* 클래스 범위 연산자로 중괄호를 사용한다. 클래스 범위안에 선언한 자원은 엄격모드에서 실행된다. 클래스 범위 연산자안에 생성자 로직, 상속 자원, static 자원을 등록한다.   
  
* 클래스 안에 생성자 로직은 constructor 함수안에 정의한다. 클래스 문법에서는 새 객체의 멤버 프로퍼티를 정의하기 위한 생성자함수 constructor 함수를 사용한다.  
  
* extends 키워드로 부모 클래스가 지정된 경우 자식의 constructor 함수보다 부모의 constructor 함수가 먼저 호출되어야 한다.  

## 클래스 기본 문법

* constructor 함수 안에서 this 키워드로 선언된 자원은 new 키워드로 만들어지는 새 객체의 프로퍼티가 된다.  
  
* 함수들은 클래스.prototype 객체에 메소드로 추가된다. ES5 이전에는 생성자 함수를 선언한 후 생성자 함수.prototype 객체에 메소드를 추가했었다.  
  
* get, set 키워드를 함수앞에 추가하여 접근자 프로퍼티를 클래스.prototype 객체에 추가할 수 있다.  
  
* 함수앞에 static 키워드를 붙이면 함수객체 자신의 프로퍼티로 추가된다. 이 자원은 상속관계와 무관하여 누구나 접근하여 사용할 수 있다.  

이제부터 기존 생성자 함수의 정의 방법으로부터 시작해서 점진적으로 코드를 수정하여 최신 클래스 문법까지의 변화를 살펴볼 것이다.

## 함수의 2가지 용도

1. 생성자 서비스: 새 객체를 생성해주는 서비스를 제공한다. 처리결과는 언제나 객체다.

2. 메소드 서비스: 로직을 제공하는 서비스를 제공한다. 처리결과는 객체일 수도 있고 원시 타입일 수도 있다.

> 주: 자바스크립트에서 function, class라고 써 있는 모두 것은 함수다. 자바스크립트에서 함수를 메소드라고 부르는 경우가 있는데 이 때는 함수가 특정 객체의 멤버상태일 때 그렇다. 주의할 것은 메소드 안에 존재하는 지역함수는 메소드가 아니라는 부분이다. 함수의 2가지 용도를 설명하는데 명쾌한 이해를 주기 위해서 "2. 메소드 서비스" 라고 분류했지만 사실 이는 자바스크립트에서 사용하는 용어가 아니라 전통적인 객체지향 언어관점에서 구분하는 방식을 채택한 것임을 밝혀둔다. 

```JavaScript
function car() {
  this.color = 'Red';
}

// #1
var c = new car();
// 새 객체가 만들어지는 과정
// 1. {}
// 2. {__proto__:car.prototype}
// 3. {__proto__:car.prototype, color: 'Red'}
// 4. c = {__proto__:car.prototype, color: 'Red'}
console.log(c);
console.log(c.__proto__ === car.prototype); // true

// #2
var result = car();
console.log(result);
console.log(global.color);
```

메소드 서비스와 생성자 서비스를 구분하기 위해서 생성자 함수는 대문자로 시작하여 작성하는 관습이 생겼다. 일반 함수는 prototype 히든 프로터가 존재하고 상속자원 등록용 객체를 자동으로 갖는다. 생성자 함수를 먼저 만든 후, 상속자원을 prototype 객체에 추가하고, 전역 서비스 자원을 생성자 함수객체에 추가한다. 

```JavaScript
function Car() {
  // 새 객체의 기본 프로퍼티로 추가한다.
  this.color = 'Red';
}
// 자식 객체에게 제공할 자원을 등록한다.
Car.prototype.show = function () {
  console.log('this.color = ' + this.color);
};
// 함수는 선언 즉시 객체이므로 객체의 행동을 수행할 수 있다.
// 누구에게나 제공하고 싶은 자원을 등록한다.
Car.info = function (obj) {
  console.log(Reflect.ownKeys(obj));
};

var c = new Car();
console.log(c);
console.log(c.__proto__ === Car.prototype); // true
console.log(c instanceof Car); // true

c.show();
Car.info(c);
```

`function Car` 대신 `class Car` 문법을 사용한다.

```JavaScript
// function Car() {
//   // 새 객체의 기본 프로퍼티로 추가한다.
//   this.color = 'Red';
// }

// 겉보기에는 클래스처럼 보이지만 실체는 (생성자 전용)함수입니다.
class Car {
  constructor () {
    this.color = 'Red';
  }
}

// Class constructor Car cannot be invoked without 'new'
// var x = Car();

// 자식 객체에게 제공할 자원을 등록한다.
Car.prototype.show = function () {
  console.log('this.color = ' + this.color);
};
// 누구에게나 제공하고 싶은 자원을 등록한다.
Car.info = function (obj) {
  console.log(Reflect.ownKeys(obj));
};

var c = new Car();
console.log(c);
console.log(c.__proto__ === Car.prototype); // true
console.log(c instanceof Car); // true

c.show();
Car.info(c);
```

`Car.prototype.show = function ()` 대신 `show ()` 코드를 사용한다.
`Car.info = function (obj)` 대신 `static info (obj)` 코드를 사용한다.

```JavaScript
// 겉보기에는 클래스처럼 보이지만 실체는 (생성자 전용)함수입니다.
class Car {
  // 새 객체의 기본 프로퍼티로 추가한다.
  constructor () {
    this.color = 'Red';
  }
  // 자식 객체에게 제공할 자원을 등록한다.
  // Car.prototype.show 형태로 처리된다.
  show () {
    console.log('this.color = ' + this.color);
  }
  // 누구에게나 제공하고 싶은 자원을 등록한다.
  static info (obj) {
    console.log(Reflect.ownKeys(obj));
  }
}
// 자식 객체에게 제공할 자원을 등록한다.
// Car.prototype.show = function () {
//   console.log('this.color = ' + this.color);
// };

// 누구에게나 제공하고 싶은 자원을 등록한다.
// Car.info = function (obj) {
//   console.log(Reflect.ownKeys(obj));
// };

var c = new Car();
console.log(c);
console.log(c.__proto__ === Car.prototype); // true
console.log(c instanceof Car); // true

c.show();
Car.info(c);

// 어떤 자원을 static으로 등록하는가?

console.log(typeof Number.parseInt('100'));
```

class 문법은 생성자 함수를 선언하는 또 하나의 방법일 뿐이다. 따라서, class 문법과 기존 function 문법을 섞어 쓰는 것에 제한은 없다. 위 코드에서 설명을 위해 남겨 둔 주석을 제거하면 다음과 같은 깨끗한 코드를 얻는다.

```JavaScript
class Car {
  constructor (color = 'Red') {
    this.color = color;
  }
  show () {
    console.log('this.color = ' + this.color);
  }
  static info (obj) {
    console.log(Reflect.ownKeys(obj));
  }
}

var c = new Car('Blue');
console.log(c);

var c2 = new Car();
console.log(c2);
```

class 문법을 외워서 작성하기 보다는 기존 function 문법과 어떻게 상호 치환할 수 있는지 이해하는 것이 좋다. 다음으로 코드를 좀 더 확장하여 상속을 정의하는 방법을 살펴보자.

```JavaScript
class Car {
  constructor (color = 'Red') {
    this.color = color;
  }
  show () {
    console.log('this.color = ' + this.color);
  }
  static info (obj) {
    console.log(Reflect.ownKeys(obj));
  }
}

var c = new Car('Blue');
console.log(c);

class Bus extends Car {
  constructor (color, doors = 4) {
    // ReferenceError:
    // Must call super constructor in derived class
    // before accessing 'this' or returning
    // from derived constructor
    super(color);
    this.doors = doors;
  }
}

console.log(Bus.prototype.__proto__ === Car.prototype); // true

var b = new Bus('Orange', 2);
console.log(b);
```

클래스 문법에서 constructor 함수를 생략하면 자동으로 추가된다. 이 때 constructor 함수는 부모의 constructor 함수를 호출하도록 되어 있다. 타 언어와 다른 점으로 constructor 함수를 생략할 때 자식이 받은 파라미터가 자동으로 부모의 constructor 함수에게 전달된다는 부분이 있다.

명시적으로 constructor 함수를 정의할 때 주의사항으로는 객체지향의 상속의 룰을 지키기 위해서 자식 constructor 함수에서 this를 사용하기 전에 부모의 constructor 함수가 먼저 호출되어야 한다는 부분이 있다.

객체에 프로퍼티는 값을 보관하는 데이터 프로퍼티와 접근을 제어하는 접근자 프로퍼티로 나눈다. 클래스 문법에서 함수 앞에 get, set 키워드를 사용하면 해당 함수는 접근자 프로퍼티로 취급되어 클래스.prototype 객체에 추가된다. 그렇기 때문에 get, set 함수는 이름이 같게 사용할 수 있다.

```JavaScript
class Square {
  constructor(length = 1) {
    this.length = length;
    // this.area = length * length;
  }
  get area() {
    return this.length * this.length;
  }
  set area(area) {
    this.length = Math.sqrt(area, 2);
  }
}

var s = new Square(10);
console.log(s.length);
console.log(s.area);

// 면적을 주고 객체의 길이정보가 같이 갱신되면 좋겠다.
s.area = 400;

console.log(s.length);
console.log(s.area);
```

접근자 프로퍼티의 getter 함수를 호출할 때 괄호를 붙이지 않는다. 할당 연산자와 같이 사용되면 자동으로 setter 함수로 연동되면 역시 괄호를 붙이지 않고 사용한다. 접근자 프로퍼티는 결국 하나의 프로퍼티로 존재하는 것이고 그 다음 getter/setter 방식으로 분기하여 설정한 함수가 연동되는 것이기 때문에 사용 시 괄호를 생략한다.

## class vs function 

class 문법은 생성자 function을 선언하는 또 하나의 방법이라고 설명했지만 100% 일치하지는 않는다. 다음은 관심이 있는 분들만 살펴보기를 당부드린다. 

```JavaScript
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
```

부모 A가 가진 static 자원을 자식이 가진 자원처럼 사용할 수 없었지만 class 문법은 이 또한 해결해 준다.

```JavaScript
/**
 * ES5
 */
function MyArray() {}

MyArray.prototype = Object.create(Array.prototype);

let myArray = new MyArray();
myArray[0] = 10;

console.log(myArray); // Array { '0': 10 }
console.log(myArray instanceof Array); // true
console.log(myArray.length); // 0 : Bad

/**
 * ES6
 */
class NewArray extends Array {}

let arr = new NewArray();
arr[0] = 10;

console.log(arr); // NewArray [ 10 ]
console.log(arr instanceof Array); // true
console.log(arr.length); // 1 : Good
```

class 문법은 완벽히 부모처럼 작동함을 보장한다.

## 자바스크립트의 class란 무엇인가?

자바스크립트는 재사용 가능한 Component 자원을 만들기 위해 함수와 prototype에 기반한 상속을 이용합니다. 함수는 선언 즉시 객체로 취급됩니다. 이미 존재하는 함수객체를 사용하여 새로운 객체를 생성합니다. 이를 프로토타입 상속이라고 합니다. 이러한 개념은 객체지향에 익숙해 있는 개발자들에게는 상당히 생소한 개념입니다. 그래서 ES6에서 개발자들이 좀 더 쉽게 자바스크립트 Application을 구현할 수 있도록 전통적인 클래스 기반의 문법을 도입했습니다. 중요한 것은 자바스크립트는 클래스 아키텍처를 도입한 것이 아니라 단순히 생성자 함수를 전통적인 클래스 기반의 문법으로 작성할 수 있는 방법을 도입한 것뿐이라는 부분입니다. 자바스크립트의 본연의 모습을 퇴색 시킬 수 있다는 점에서 일부의 반발이 있었지만 도구는 끊임없이 편리해지도록 개선되어야 한다는 점에서 긍정적으로 바라볼 수 있습니다.

```JavaScript
class Car {

}
```

위 코드를 트랜스파일링한 후에 결과는 다음과 같습니다.

```JavaScript
var Car = (function () {
    function Car() {
    }
    return Car;
}());
```

클래스 범위 연산자 안쪽에 배치한 자원과 외부를 격리시켜야 하기 때문에 IIFE 표현식을 사용합니다. 코드를 살펴보면 결국 클래스는 IIFE 표현식 안에 정의한 대문자로 시작하는 생성자 용 함수일 뿐이라는 것을 알 수 있습니다.
