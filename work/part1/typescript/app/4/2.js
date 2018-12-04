if (true) {
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    console.log(Color.Red); // 0 
    console.log(Color);
    // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
}
if (true) {
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 4] = "Blue";
    })(Color || (Color = {}));
    // Color.Red 다음 원소들은 1부터 1씩 증가합니다.
    console.log(Color.Green); // 2
    console.log(Color.Blue); // 4
}
if (true) {
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
    })(Color || (Color = {}));
    console.log(Color);
    // { '1': 'Red', '2': 'Green', '3': 'Blue', Red: 1, Green: 2, Blue: 3 }
    // let a: string = Color.Green;  // 문자열에 숫자대입 안됨
    var b = Color[3]; // 가능
    console.log(b); // Blue
}
if (true) {
    var a = 100;
    a = "Hello World!!"; // 가능
    a = true; // 가능 
    var b = [1, "Hello", { a: a }];
}
if (true) {
    var a = "Hello World";
    var b = a.length;
    b = a.length;
}
if (true) {
    var point = { x: 10, y: 20 };
    point.x = 100; // 에러
}
if (true) {
    var arr = [1, 2, 3, 4];
    var roArray = arr;
    roArray[0] = 10; // 에러
    roArray.push(10); // 에러
    arr = roArray; // 에러
    arr = roArray; // 가능
}
