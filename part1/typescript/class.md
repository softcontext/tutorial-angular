# Class

타입스크립트는 ES6에서 도입한 클래스 문법을 그대로 사용하지 않고 일부를 변경하거나 조금 더 기능을 추가해서 사용합니다. 가장 큰 기능 확장은 이름에 맞게 추가적으로 타입을 정의해 놓고 사용하는 것이라 할 수 있습니다. ES6에서는 `static` 키워드를 함수에만 적용할 수 있지만 타입스크립트는 변수에도 적용할 수 있습니다.

타입스크립트는 클래스를 인터페이스처럼 사용하기도 합니다. 그렇기 때문에 `interface`가 클래스를 확장할 수도 있습니다.

## ES6 Class Syntax

```JavaScript
class Sedan {
  constructor(color = 'Red', doors = 4) {
    this.color = color;
    this.doors = doors;
  }
  show() {
    console.log(this.color, this.doors);
  }
}

let s = new Sedan('Blue', 2);
console.log(s);
s.show();
```

위 코드는 ECMAScript 표준문법에 맞게 작성된 제대로 작동하는 코드입니다. 그러나 `.js` 확장자를 `.ts`로 바꾸는 순간 여러 곳에서 에러가 있다가 불만을 표시할 것입니다.

`Property 'color' does not exist on type 'Sedan'.`  
`Property 'doors' does not exist on type 'Sedan'.`  

ES 스크립트 관점에서 이는 거짓입니다. 심지어 그대로 방치해도 트랜스파일링이 잘 진행됩니다. 코드의 수행도 문제가 없습니다. 그러나, 타입스크립트 관점에서는 이는 문법 에러입니다. 타입스크립트는 보다 강력한 코드 작성규칙을 원합니다. 협업이 중시되는 현대에서는 코드작성 시 강력한 작성규칙을 부여하는 것이 버그를 잡는 것보다 유리하다고 판단하는 것 입니다. 타입스크립트가 원하는 대로 코드를 작성해 봅시다.

## TS Class Syntax

```TypeScript
class Sedan {
  color; // 추가
  doors; // 추가
  constructor(color = 'Red', doors = 4) {
    this.color = color;
    this.doors = doors;
  }
  show() {
    console.log(this.color, this.doors);
  }
}

let s = new Sedan('Blue', 2);
console.log(s);
s.show();
```

`this` 연산자로 새 객체에 멤버 프로퍼티로 추가하는 자원은 클래스 바로 밑에 미리 선언해야 합니다. 이렇게 사용하면 전통적인 클래스 문법과 비슷해 집니다. 타입스크립트 코드도 결국 자바스크립트 코드로 바뀐 후 실행되기에 자바스크립트의 관점에서 이 방식을 보면 트랜스파일링 후 사라지는 쓸데없는 부가작업이지만 새 객체의 멤버 프로퍼티가 무엇인지 파악하는 점에서는 도움이 된다고 할 수 있습니다. 중요한 것은 클래스 밑에 선언된 변수의 값을 어디에서도 할당하지 않는다면 새 객체에 프로퍼티에 추가되지 않는다는 부분입니다.

```TypeScript
class Sedan {
  color;
  doors;
  wheels; // 초기 값을 할당하지 않았다.
  constructor(color = 'Red', doors = 4) {
    this.color = color;
    this.doors = doors;
  }
  show() {
    console.log(this.color, this.doors);
  }
}

let s = new Sedan('Blue', 2);
console.log(s); // wheels 프로퍼티는 존재하지 않는다.
s.show();
```

좀 더 엄격하게 TS 방식으로 코드를 개선하면 다음과 같습니다.

```TypeScript
class Sedan {
  private color: string;
  private doors: number;
  constructor(color: string = 'Red', doors: number = 4) {
    this.color = color;
    this.doors = doors;
  }
  public show(): void {
    console.log(this.color, this.doors);
  }
}

let s = new Sedan('Blue', 2);
console.log(s);
s.show();
```

전통적인 클래스 지원 언어의 관점에서 보면 `color`, `doors` 멤버변수가 먼저 처리되고 그 다음 생성자 코드가 처리되는 것처럼 보일 수 있습니다. 아닙니다. 타입스크립트 문법을 지키기 위해서 선언한 멤버변수는 타입스크립트의 허상일 뿐입니다. 왜 자꾸 강조하냐면 다음처럼 변형해서 사용할 수도 있기 때문입니다.

```TypeScript
class Sedan {
  constructor(private color: string = 'Red', private doors: number = 4) {
    this.color = color;
    this.doors = doors;
  }
  public show(): void {
    console.log(this.color, this.doors);
  }
}

let s = new Sedan('Blue', 2);
console.log(s);
s.show();
```

`constructor` 파라미터 변수 앞에 접근제어자 중 하나를 추가하면 굳이 클래스 밑에 멤버변수를 선언하지 않아도 됩니다.
