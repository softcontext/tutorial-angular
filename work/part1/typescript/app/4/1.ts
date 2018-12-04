class Greeting {
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  public sayHello() {
    let a: boolean = false;
    let b: Boolean = new Boolean(true);

    console.log(a.valueOf());
    console.log(b.valueOf());

    let x: string[] = ['1', "2", `3`];
    let y: Array<number> = [1, 2, 3, 4];

    let myTuple: [string, number];
    myTuple = ["Hello", 100];
    // myTuple = ["Hello", "World"]; // number 값을 할당해야 한다.

    console.log(myTuple[0]);  // Hello
    console.log(myTuple[1]);  // 100
    // console.log(myTuple[2]);  // out-of-bounds

    // myTuple[2] = "World"; // out-of-bounds
    // myTuple[2] = 200;     // out-of-bounds
    // myTuple[2] = true;    // string 또는 number 값을 할당해야 한다. out-of-bounds

    return "Hello " + this.greeting;
  }

}

let tmp = new Greeting("World!!");

console.log(tmp.sayHello());
