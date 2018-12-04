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
        console.log(target);
        // P { foo: [Function] }
        console.log(propertyKey + "() was called!");
        // foo() was called!
        console.log(descriptor);
        // {
        //   value: [Function],
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // }
    }
    var P = /** @class */ (function () {
        function P() {
        }
        P.prototype.foo = function () {
        };
        __decorate([
            log,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], P.prototype, "foo", null);
        return P;
    }());
    var p = new P();
    p.foo();
})();
