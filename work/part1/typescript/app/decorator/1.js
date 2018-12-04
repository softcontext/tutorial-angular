var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function () {
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
    function Hello(construct) {
        construct.prototype.say = function () {
            console.log("Hello " + this.name);
        };
    }
    var Person = /** @class */ (function () {
        function Person(name) {
            if (name === void 0) { name = 'Anonymous'; }
            this.name = name;
            this.name = name;
        }
        Person = __decorate([
            Hello,
            __metadata("design:paramtypes", [String])
        ], Person);
        return Person;
    }());
    var p = new Person('Tom');
    p.say(); // Hello Tom
})();
