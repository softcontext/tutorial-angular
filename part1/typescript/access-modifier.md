# Access Modifier

타입스크립트는 3가지 종류의 접근제어자를 제공합니다. 접근제어자를 명시하지 않으면 모두 `public`으로 간주합니다.

* **public**  
누구나 접근할 수 있습니다. class 내부/외부에서 자유롭게 접근이 가능합니다.
* **protected**  
class 내부와 상속받은 하위 class 내부에서 접근이 가능합니다.
* **private**  
class 내부에서만 접근이 가능합니다.

constructor에 파라미터를 명시할 때, 접근제어자를 같이 명시하면 클래스 밑에 멤버변수가 선언된 것으로 간주합니다. readonly 키워드도 비슷한 역할을 수행합니다.

## Readonly Properties

`readonly` 키워드를 이용해 객체가 처음 생성되는 시점에만 프로퍼티들을 수정가능하도록 설정할 수 있습니다. 한번 값이 세팅되면 그 후에는 수정할 수 없게됩니다.

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
