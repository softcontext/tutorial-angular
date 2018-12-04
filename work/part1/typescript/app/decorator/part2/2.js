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
    function log(target, propertyKey, descriptor) {
        var method = descriptor.value;
        // 타겟 객체의 메소드를 포장한 새 함수를 설치한다.
        descriptor.value = function () {
            // arguments: 타겟객체의 메소드가 받아야 할 파라미터를 대신 받는다.
            console.log(propertyKey + "() was called. arguments:", arguments);
            // 타겟 객체의 메소드에게 파라미터를 전달하면서 호출한다.
            var result = method.apply(this, arguments);
            // 타겟 객체의 메소드가 리턴 값을 받아서 재 리턴한다.
            return result;
        };
    }
    var P = /** @class */ (function () {
        function P() {
        }
        P.prototype.foo = function (a, b) {
            console.log("Do something");
        };
        __decorate([
            log,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], P.prototype, "foo", null);
        return P;
    }());
    var p = new P();
    p.foo('Hello', 'World');
    // foo() was called. arguments: { '0': 'Hello', '1': 'World' }
    // Do something
})();
