var Greeting = /** @class */ (function () {
    function Greeting(message) {
        this.greeting = message;
    }
    Greeting.prototype.sayHello = function () {
        var a = false;
        var b = new Boolean(true);
        console.log(a.valueOf());
        console.log(b.valueOf());
        var x = ['1', "2", "3"];
        var y = [1, 2, 3, 4];
        var myTuple;
        myTuple = ["Hello", 100];
        // myTuple = ["Hello", "World"]; // number 값을 할당해야 한다.
        console.log(myTuple[0]); // Hello
        console.log(myTuple[1]); // 100
        // console.log(myTuple[2]);  // out-of-bounds
        // myTuple[2] = "World"; // out-of-bounds
        // myTuple[2] = 200;     // out-of-bounds
        // myTuple[2] = true;    // string 또는 number 값을 할당해야 한다. out-of-bounds
        return "Hello " + this.greeting;
    };
    return Greeting;
}());
var tmp = new Greeting("World!!");
console.log(tmp.sayHello());
