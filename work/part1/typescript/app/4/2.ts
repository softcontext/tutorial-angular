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

if (true) {
  let a: any = 100;
  a = "Hello World!!"; // 가능
  a = true; // 가능 

  let b: any[] = [1, "Hello", { a }];
}

if (true) {
  let a: any = "Hello World";
  let b: number = (<string>a).length;
  b = (a as string).length;
}

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

  roArray[0] = 10; // 에러
  roArray.push(10); // 에러

  arr = roArray; // 에러
  arr = roArray as number[]; // 가능
}






