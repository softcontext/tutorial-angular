# Types

자바스크립트의 자료형을 그대로 계승합니다. 

## 기본 자료형(Primitive)

자바스크립트는 객체를 제외한 모든 값은 `변경 불가능한 값(Immutable Value)`입니다. 이런 값을 `원시 값(Primitive Values)`이라고 부릅니다. 타입스크립트에서 자바스크립트의 원시 타입 6가지를 사용할 수 있습니다.

* boolean
* number
* string
* null
* undefined
* Symbol(ES6에서 추가됨)

## 참조 자료형

객체는 식별자(Identifier)로 참조할 수 있는 메모리에 있는 값입니다. 

* object

자바스크립트에서 객체는 속성들을 담고있는 가방(Collection)으로 볼 수 있습니다. 객체 리터럴 문법(Object Literal Syntax)으로 제한적으로 몇 가지 속성을 간단히 초기화할 수 있습니다. 객체는 생성된 후 나중에 동적으로 속성들을 추가하거나 제거할 수도 있습니다. 속성 값은 객체를 포함해 어떠한 자료형도 될 수 있으며 속성은 키(Key) 값으로 식별됩니다. 키 값은 `String`이거나 `Symbol`값을 사용할 수 있습니다.

두 종류의 객체 속성이 있는데, 이들은 종류에 따라 고유한 특성값들을 갖고 있습니다. `데이터 속성 (Data property)`과 `접근자 속성(Accessor property)`이 그것입니다.

타입스크립트는 협업을 위해서 자료형을 명시하고 사용합니다. 자료형으로 원시 타입을 사용해도 되고 이를 객체로 취급해주는 래퍼 타입을 사용할 수도 있습니다.

추가로 타입스크립트가 정의한 자료형을 이용할 수도 있습니다. 자바스크립트의 원시타입은 이를 객체로 취급할 수 있도록 각각 래퍼 자료형이 존재합니다. 예를 들어 boolean 자료형이 원시타입이라면 이를 래핑하는 Boolean 이라는 생성자 함수가 존재하는 방식입니다.

```TypeScript
let a: boolean = false;
let b: Boolean = new Boolean(true);

console.log(a.valueOf());
console.log(b.valueOf());
```

a는 원시 타입임에도 불구하고 객체처럼 메소드를 호출할 수 있습니다. `자동형변환(Autoboxing)`이 적용되기 때문입니다.

```TypeScript
let c: boolean = new Boolean(true);
```

타입스크립트에서 위의 코드는 에러입니다. boolean 타입의 변수에 Boolean 래퍼 타입을 할당할 수 없다는 오류가 발생합니다. booelan, Boolean 타입을 모두 사용할 수 있습니다. Boolean 자료형을 사용하면 결국 생성자 함수를 호출해야 하기 때문에 데이터 저장 용도로 사용할 경우는 boolean 자료형을 이용하는 것이 좋습니다.

```TypeScript
let x: string[] = ['1', "2", `3`];
let y: Array<number> = [1, 2, 3, 4];
```

배열의 타입은 위 2가지 방식 모두 사용이 가능합니다.

## enum

`enum`은 상수를 취급하는 객체입니다. 함수의 `arguments` 객체처럼 프로퍼티 키가 `'0','1','2'` 식으로 존재하기 때문에 배열처럼 사용할 수 있습니다. 하지만 객체는 `for-in` 구문을 배열은 `for` 구문을 사용하는 것이 좋습니다. `enum`은 `let`의 스코프 규칙을 따릅니다. 따라서 조건문의 코드 블록 연산자는 변수의 유효 범위를 제한하는 스코프 연산자로써의 역할을 수행합니다. 간단히 말해서, 각각의 변수는 해당 조건문 안에서만 유효한 지역변수가 됩니다.

```TypeScript
if (true) {
  enum Color { Red, Green, Blue }
  console.log(Color.Red);   // 0 
  console.log(Color);
  // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
}

if (true) {
  enum Color { Red = 1, Green, Blue = 4 }
  // Color.Red 다음 원소들은 1부터 1씩 증가합니다.
  console.log(Color.Green);   // 2
  console.log(Color.Blue);   // 4
}

if (true) {
  enum Color { Red = 1, Green, Blue }
  console.log(Color);
  // { '1': 'Red', '2': 'Green', '3': 'Blue', Red: 1, Green: 2, Blue: 3 }
  
  // let a: string = Color.Green;  // 문자열에 숫자대입 안됨
  let b: string = Color[3]; // 가능
  console.log(b); // Blue
}
```

## any

어떠한 자료형도 할당할 수 있다고 명시할 때 사용합니다. 취급하는 자료형을 명시하지 않는 것과 어떠한 자료형도 가능하다고 명시하는 것에는 차이가 있습니다. 방치하기 보다는 `any`를 사용하세요.

```TypeScript
if (true) {
  let a: any = 100;
  a = "Hello World!!"; // 가능
  a = true; // 가능 

  let b: any[] = [1, "Hello", {a}];
}
```

## Type Assertions

자료형 단정(단언)은 컴파일러에게 `"이 타입 사용이 맞아!"`라는 의미를 전달하는 것입니다. 형 변환(Type Casting)과 같은 의미로 사용되지만 실제 특별한 확인작업이 발생하지는 않습니다. 프로그래머가 타입 체킹을 했다고 가정하여 따로 검증하지는 않습니다.

자료형 단정을 하는 방법은 2가지가 있습니다. `Angle-bracket Syntax(<>)`를 이용하는 방법과 `as syntax`를 이용하는 방법을 사용할 수 있습니다. 

```TypeScript
if (true) {
  let a: any = "Hello World";
  let b: number = (<string>a).length;
  b = (a as string).length;
}
```
