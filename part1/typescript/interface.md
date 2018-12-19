# Interface

타입스크립트에서 인터페이스는 새로운 데이터 타입을 만드는 추상 데이터 타입으로 사용이 되며 일반 변수, 함수, 클래스의 타입 체크를 위해서 사용됩니다. 인터페이스를 이용하여 타입을 선언하면 인터페이스 안에 명시된 프로퍼티의 선언과 메소드의 구현이 강제되기 때문에 프로그래밍의 일관성을 확보할 수 있습니다.

참고로 ES6는 `interface`를 지원하지 않습니다. 타입스크립트만 지원합니다. 그렇기 때문에 인터페이스를 컴파일 한 결과물을 보면 인터페이스의 내용은 사라지게 됩니다.

## Parameter Type Checking

인터페이스는 객체의 프로퍼티 구성 상태를 체크하는 목적으로 사용할 수 있습니다. 함수가 받는 파라미터는 객체이고 그 객체가 가진 프로퍼티는 어떠한 것들이 있는지 확신할 수 있게 됩니다.

```TypeScript
interface User {
  id: number;
  name: string;
  show(): void;
}

let user: User = {
  id: 1,
  name: 'Tom',
  show(): void {
    console.log(`Id is ${this.id} and Name is ${this.name}`);
  }
};

function proceed(user: User): void {
  user.show();
}

proceed(user);
```

## Class Types

클래스가 인터페이스를 구현하여 인터페이스가 제안하는 변수나 함수를 소유하도록 강제할 수 있습니다.

```TypeScript
interface User {
  id: number;
  name: string;
  show(): void;
}

class Member implements User {
  id;
  name;
  constructor(id: number, name: string) { 
    this.id = id;
    this.name = name;
  }
  show(): void {
    console.log(`Id is ${this.id} and Name is ${this.name}`);
  }
}

let member: Member = new Member(1, 'Tom');

function proceed(user: User): void {
  user.show();
}

proceed(member);
```

## Function Types

인터페이스는 함수의 파라미터 정의와 리턴 자료형을 지정하는데 사용할 수 있습니다.

```TypeScript
interface MyFunctionParamsType {
  (name: string, age: number): void;
}

let show: MyFunctionParamsType = function(name: string, age: number): void {
  console.log(`Name: ${name}, Age: ${age}`);
};

show("Tom", 56);
```

## Constructor Interface

사용하는 생성자 함수의 자료형을 명시하면 오히려 에러가 나는 경우가 있습니다. 다음 예제에서 `getInstance` 메소드의 파라미터 `construct`의 자료형을 `any`로 설정하면 해결이 되지만 `User` 자료형의 객체를 만들어 주는 `UserFactory`라는 이름에 걸 맞지 않는 것이 마음에 들지 않습니다.

```TypeScript
const UserFactory = {
  getInstance: function(construct: User, name: string, age: number) {
    // Cannot use 'new' with an expression 
    // whose type lacks a call or construct signature.
    return new construct(name, age);
  }
};

class User {
  constructor(private name: string, private age: number) {
    this.name = name;
    this.age = age;
  }
  show() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

let user = UserFactory.getInstance(User, "Tom", 56);
user.show();
```

이 때, 인터페이스를 사용하여 `constructor`의 타입을 지정하면 해결할 수 있습니다.

```TypeScript
interface UserConstructor {
  // construct signature
  new(name: string, age: number): User;
}

const UserFactory = {
  getInstance: function(construct: UserConstructor, name: string, age: number) {
    return new construct(name, age);
  }
};

class User {
  constructor(private name: string, private age: number) {
    this.name = name;
    this.age = age;
  }
  show() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

let user = UserFactory.getInstance(User, "Tom", 56);
user.show();
```
