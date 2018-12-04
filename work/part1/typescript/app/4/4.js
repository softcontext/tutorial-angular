var PersonFactory = {
    // interface를 이용해 생성자의 signature를 지정합니다.
    getInstance: function (construct, name, age) {
        // Cannot use 'new' with an expression 
        // whose type lacks a call or construct signature
        return new construct(name, age);
    }
};
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.myName = name;
        this.myAge = age;
    }
    Person.prototype.printInfo = function () {
        console.log("이름:" + this.myName + ", 나이:" + this.myAge);
    };
    return Person;
}());
var obj = PersonFactory.getInstance(Person, "홍길동", 30);
obj.printInfo();
