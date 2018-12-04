# TypeScript Essence

TypeScript는 Microsoft에서 개발하여 2012년에 발표한 오픈 소스 프로그래밍 언어입니다. 대규모 JavaScript Application 개발을 목표로 만들어졌습니다. Angular가 기본 언어로 채택하여 인지도가 많이 상승했습니다.

## 특징

* TypeScript는 JavaScript의 Superset입니다. TypeScript는 JavaScript의 모든 기능을 포함하고 그 외 추가적인 기능들을 가지고 있습니다.

* TypeScript는 컴파일 언어이지만 컴파일 결과가 Machine Code가 아닌 JavaScript 코드입니다. 이런 프로그래밍을 `메타프로그래밍` 이라고 합니다.

* TypeScript는 컴파일 시점에 Type Checking을 수행하는 정적 타입 언어입니다.

## 개발환경

### Step 1

적당한 위치에 type-script라는 이름으로 폴더를 하나 생성합니다. 그리고 타입스크립트 환경설정 파일을 다음과 같이 작성합니다.

**tsconfig.json**

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": false,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": true,
  "buildOnSave": false,
  "exclude": [
    "node_modules"
  ],
  "filesGlob": [
    "app/**/*.ts",
    "typings/index.d.ts"
  ],
  "atom": {
    "rewriteTsconfig": false
  }
}
```

`npm install -g typescript` 명령으로 타입스크립트 CLI 도구를 설치하고 `tsc --init` 명령으로 `tsconfig.json` 파일을 생성할 수 있습니다. 참고로 어떠한 항목을 설정할 수 있는지는 다음 소스를 참고하시기 바랍니다.

```JSON
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation:  */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true                            /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

### Step 2

Atom 에디터에 `atom-typescript` 패키지를 추가로 설치합니다.

`"app/**/*.ts"` 설정에 따라서 타입스크립트 파일은 app 폴더 밑에 배치해야 하고 확장자는 `.ts`로 끝나도록 작성해야 합니다. `"compileOnSave": true` 옵션으로 타입스크립트 파일을 저장할 때 자동으로 트랜스파일링 작업이 처리됩니다.

### Step 3

**sample.ts**

```TypeScript
console.log('Hello World!');

// Transpiling : ctrl+s or F6
```

코드를 작성하고 저장하면 다음 파일이 생성됩니다.

**sample.js**

```
console.log('Hello World!');
// Transpiling : ctrl+s or F6
```

이제부터 개발 및 수정 작업은 `~.ts` 파일로 하고 실행은 `~.js` 파일로 수행하면 됩니다. 마치 자바에서 `~.java` 파일로 개발 및 수정을 하고 `~.class` 파일은 그냥 이용하는 것과 같습니다.

### Step 4

코딩 스타일 가이드에 맞추어 개발하고 이를 감시해 주는 역할을 수행하는 `linter-eslint` 패키지를 설치합니다. 필수는 아니지만 발생할 수 있는 오류를 미리 감지하고 `Coding Convention`을 따르기 위해서 사용하는 것이 일반적입니다.

## 자료형

자바스크립트의 7가지 자료형을 그대로 사용합니다. 추가로 타입스크립트가 정의한 자료형을 이용할 수 있습니다. 자바스크립트의 원시타입은 이를 객체로 취급할 수 있도록 각각 래퍼 자료형이 존재합니다. 예를 들어 boolean 자료형이 원시타입이라면 이를 래핑하는 Boolean 이라는 생성자 함수가 존재하는 방식입니다.

```TypeScript
let a: boolean = false;
let b: Boolean = new Boolean(true);

console.log(a.valueOf());
console.log(b.valueOf());
```

a는 원시 타입임에도 불구하고 객체처럼 메소드를 호출할 수 있습니다. 자동형변환(Autoboxing)이 적용되기 때문입니다.

```TypeScript
let c: boolean = new Boolean(true);
```

타입스크립트에서 위의 코드는 에러입니다. boolean 타입의 변수에 Boolean 래퍼 타입을 할당할 수 없다는 오류가 발생합니다. booelan, Boolean 타입을 모두 사용할 수 있습니다. Boolean 자료형을 사용하면 결국 생성자 함수가 호출되는 것이기 때문에 데이터 저장 용도로 사용할 경우는 boolean 자료형을 이용하는 것이 좋습니다.

```TypeScript
let x: string[] = ['1', "2", `3`];
let y: Array<number> = [1, 2, 3, 4];
```

배열의 타입은 위 2가지 모두 사용이 가능합니다.

### enum

enum은 상수를 취급하는 객체입니다. 함수의 arguments 객체처럼 프로퍼티 키가 `'0','1','2'` 식으로 존재하기 때문에 배열처럼 사용할 수 있습니다. 하지만 객체는 `for-in` 구문을 배열은 `for` 구문을 사용하는 것이 좋습니다. enum은 let의 스코프 규칙을 따릅니다. 따라서 조건문의 코드 블록 연산자는 변수의 유효 범위를 제한하는 스코프 연산자로써의 역할을 수행합니다. 간단히 말해서, 각각 해당 조건문 안에서만 유효한 지역변수가 됩니다.

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

### any

어떠한 자료형도 할당할 수 있게 됩니다. 취급하는 자료형을 명시하지 않는 것과 어떠한 자료형도 가능하다고 명시하는 것에는 차이가 있습니다. 방치하기 보다는 any를 사용하세요.

```TypeScript
if (true) {
  let a: any = 100;
  a = "Hello World!!"; // 가능
  a = true; // 가능 

  let b: any[] = [1, "Hello", {a}];
}
```

### Type Assertions

Type Assertions는 컴파일러에게 “이 타입 사용이 맞아!”라는 의미를 전달하는 것입니다. Type Casting과 같은 의미로 사용되지만 실제 특별한 체크작업이 발생하지는 않습니다. 프로그래머가 특정한 타입 체크를 진행했다고 가정하여 따로 검증하지 않습니다.

자료형 단정을 하는 방법은 2가지가 있습니다. `Angle-bracket Syntax(<>)`를 이용하는 방법과 `as syntax`를 이용하는 방법입니다. 

```TypeScript
if (true) {
  let a: any = "Hello World";
  let b: number = (<string>a).length;
  b = (a as string).length;
}
```

## Interface

타입스크립트에서 인터페이스는 새로운 데이터 타입을 만드는 추상 데이터 타입으로 사용이 되며 일반 변수, 함수, 클래스의 타입 체크를 위해서 사용됩니다. 인터페이스를 이용하여 타입을 선언하면 인터페이스 안에 명시된 프로퍼티의 선언과 메소드의 구현이 강제되기 때문에 프로그래밍의 일관성을 확보할 수 있습니다.

참고로 ES6는 interface를 지원하지 않습니다. 타입스크립트만 지원합니다. 그렇기 때문에 인터페이스를 컴파일 한 결과물을 보면 인터페이스의 내용은 사라지게 됩니다.

### Parameter Type Checking

인터페이스는 객체의 프로퍼티 구성 상태를 체크하는 목적으로 사용할 수 있습니다.

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

### Class Types

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
  constructor(id: number, name: string) { }
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

### Function Types

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

### Constructor Interface

사용하는 생성자 함수의 자료형을 명시하면 오히려 에러가 나는 경우가 있습니다. 다음 예제에서 getInstance 메소드의 파라미터 construct의 자료형을 any로 설정하면 해결이 되지만 User 자료형의 객체를 만들어 주는 UserFactory라는 이름에 걸 맞지 않는 것이 마음에 들지 않습니다.

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

이 때, 인터페이스를 사용하여 constructor의 타입을 지정하면 해결할 수 있습니다.

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

## Class

타입스크립트는 ES6에서 도입한 클래스 문법을 그대로 사용하지 않고 일부를 변경하거나 조금 더 기능을 추가해서 사용합니다. 가장 큰 기능 확장은 이름에 맞게 추가적으로 타입을 정의해 놓고 사용하는 것이라 할 수 있습니다. ES6에서는 static 키워드를 함수에만 적용할 수 있지만 타입스크립트는 변수에도 적용할 수 있습니다.

타입스크립트는 클래스를 인터페이스처럼 사용하기도 합니다. 그렇기 때문에 interface가 클래스를 확장할 수도 있습니다.

### ES6 Class Syntax

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

위 코드는 ECMAScript 표준문법에 맞게 작성된 제대로 작동하는 코드입니다. 그러나 .js 확장자를 .ts로 바꾸는 순간 여러 곳에서 에러가 있다가 불만을 표시할 것입니다.

`Property 'color' does not exist on type 'Sedan'.`  
`Property 'doors' does not exist on type 'Sedan'.`

ES 스크립트 관점에서 이는 거짓입니다. 심지어 그대로 방치해도 트랜스파일링이 잘 진행됩니다. 코드의 수행도 문제가 없습니다. 그러나, TS 스크립트 관점에서는 이는 문법 에러입니다. TS 스크립트는 보다 강력한 코드 작성규칙을 원합니다. 협업이 중시되는 현대에서는 코드작성 시 강력한 작성규칙을 부여하는 것이 버그를 잡는 것보다 유리하다고 판단하는 것 입니다. TS가 원하는 대로 코드를 작성해 봅시다.

### TS Class Syntax

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

this 연산자로 새 객체에 멤버 프로퍼티로 추가하는 자원은 클래스 바로 밑에 미리 선언해야 합니다. 이렇게 사용하면 전통적인 클래스 문법과 비슷해 집니다. TS도 결국 JS로 바뀌어 실행되기에 JS의 관점에서 이 방식을 보면 트랜스파일링 후 사라지는 쓸데없는 부가작업이지만 새 객체의 멤버 프로퍼티가 무엇인지 파악하는 점에서는 도움이 된다고 할 수 있습니다. 중요한 것은 클래스 밑에 선언된 변수의 값을 어디에서도 할당하지 않는다면 새 객체에 프로퍼티에 추가되지 않는다는 부분입니다.

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

전통적인 클래스 지원 언어의 관점에서 보면 color, doors 멤버변수가 먼저 처리되고 그 다음 생성자 코드가 처리되는 것처럼 보일 수 있습니다. 아닙니다. 타입스크립트 문법을 지키기 위해서 선언한 멤버변수는 타입스크립트의 허상일 뿐입니다. 왜 자꾸 강조하냐면 다음처럼 변형해서 사용할 수도 있기 때문입니다.

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

constructor 파라미터 변수 앞에 접근제어자 중 하나를 추가하면 굳이 클래스 밑에 멤버변수를 선언하지 않아도 됩니다.

## Access Modifier

타입스크립트는 3가지 종류의 접근제어자를 제공합니다. 접근제어자를 명시하지 않으면 모두 public으로 간주합니다.

* public
누구나 접근할 수 있습니다. class 내부/외부에서 자유롭게 접근이 가능합니다.
* protected
class 내부와 상속받은 하위 class 내부에서 접근이 가능합니다.
* private
class 내부에서만 접근이 가능합니다.

constructor에 파라미터를 명시할 때, 접근제어자를 같이 명시하면 클래스 밑에 멤버변수가 선언된 것으로 간주합니다. readonly 키워드도 비슷한 역할을 수행합니다.

### Readonly Properties

readonly 키워드를 이용해 객체가 처음 생성되는 시점에만 프로퍼티들을 수정가능하도록 설정할 수 있습니다. 한번 값이 세팅되면 그 후에는 수정할 수 없게됩니다.

```TypeScript
if (true) {
  interface Point {
    readonly x: number;
    y: number;
  }

  let point: Point = { x: 10, y: 20 };
  point.x = 100; // 에러
}

if (true) {
  let arr: number[] = [1, 2, 3, 4];
  let roArray: ReadonlyArray<number> = arr;

  roArray[0] = 10; // 코드 에러
  roArray.push(10); // 코드 에러

  arr = roArray; // 코드 에러
  arr = roArray as number[]; // 가능
}
```

## Decorator

타입스크립트의 데코레이터는 파이썬의 데코레이터와 마찬가지로 함수를 파라미터로 받는 함수를 쉽게 선언하는 방법입니다.

`tsconfig.json` 파일에서 experimentalDecorators 컴파일러 옵션을 활성화해야합니다.

```JSON
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### Class Decorator

클래스 위에 데코레이터를 설정하면 데코레이터 함수에게 클래스 객체의 참조가 전달된다.

```TypeScript
// Constructor Interface
interface PersonConstructor {
  new(name: string): Person;
}

/**
 * 파라미터 타입으로 Person을 사용하는 경우
 * 다음과 같은 에러가 발생할 수 있다.
 * 
 * 1. Cannot use 'new' with an expression
 * whose type lacks a call or construct signature.
 * 2. Argument of type 'typeof Person' is not assignable
 * to parameter of type 'Person'. 
 * Property 'name' is missing in type 'typeof Person'.
 * 3. Property 'prototype' does not exist on type 'Person'.
 *
 * 다음과 같이 처리하여 해결할 수 있다.
 * 1. 파라미터 타입으로 any를 사용한다.
 * 2. 파라미터 타입으로 인터페이스 PersonConstructor를 사용한다.
 */
function Hello(construct: PersonConstructor) {
  construct.prototype.say = function() {
    console.log(`Hello ${this.name}`);
  }
}

@Hello
class Person {
  constructor(private name: string = 'Anonymous') {
    this.name = name;
  }
}

let p = new Person('Tom');
(<any>p).say(); // Hello Tom
```

함수를 중첩해서 정의하면 데코레이터 사용 시 파라미터를 추가로 받을 수 있습니다.

```TypeScript
(function() {
  function Component(param: any) {
    return function(constructor: any) {
      return class extends constructor {
        constructor() {
          super();
          this.name = param.name;
        }
      }
    }
  }

  @Component({
    name: 'Tom'
  })
  class Person {

  }

  let p = new Person();
  console.log(p); // class_1 { name: 'Tom' }
}());
```

앵귤러는 적극적으로 데코레이터를 받아들여서 앵귤러의 구성 요소를 선언할 때 데코레이터에게 설정정보를 가진 객체를 전달하면 앵귤러 프레임워크가 클래스를 직접 객체로 생성하고 객체가 기본적으로 앵귤러의 구성요소로써의 역할을 수행할 수 있도록 조작합니다.

### Method Decorator

```TypeScript
(function() {
  function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
    // P { foo: [Function] }
    console.log(`${propertyKey}() was called!`);
    // foo() was called!
    console.log(descriptor);
    // {
    //   value: [Function],
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // }
  }

  class P {
    @log
    foo() {

    }
  }

  const p = new P();
  p.foo();
})();
```

메소드 위에 `@log` 데코레이터를 설정하면 해당 메소드가 호출될 때 마다 로그가 출력됩니다. 다음 예제를 보시면 어떻게 기능을 추가할 수 있는지 힌트를 얻게 됩니다.

```TypeScript
(function() {
  function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    // 타겟 객체의 메소드를 포장한 새 함수를 설치한다.
    descriptor.value = function() {
      // arguments: 타겟객체의 메소드가 받아야 할 파라미터를 대신 받는다.
      console.log(`${propertyKey}() was called. arguments:`, arguments);
      // 타겟 객체의 메소드에게 파라미터를 전달하면서 호출한다.
      var result = method.apply(this, arguments);
      // 타겟 객체의 메소드가 리턴 값을 받아서 재 리턴한다.
      return result;
    };
  }

  class P {
    @log
    foo(a: string, b: string) {
      console.log(`Do something`);
    }
  }

  const p = new P();
  p.foo('Hello', 'World');
  // foo() was called. arguments: { '0': 'Hello', '1': 'World' }
  // Do something
})();
```

데코레이터는 프로퍼티나 파라미터에도 적용할 수 있습니다. 이에 대한 부분은 생략하오니 관심이 있는 분은 다음 사이트를 참고하시기 바랍니다.

`https://www.typescriptlang.org/docs/handbook/decorators.html`
