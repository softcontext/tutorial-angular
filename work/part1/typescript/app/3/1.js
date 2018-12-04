var Sedan = /** @class */ (function () {
    // doors: number;
    function Sedan(color, doors) {
        if (color === void 0) { color = 'Red'; }
        if (doors === void 0) { doors = 4; }
        this.doors = doors;
        this.color = color;
        // this.doors = doors;
    }
    Sedan.prototype.show = function () {
    };
    Sedan.print = function () {
    };
    return Sedan;
}());
var s = new Sedan('Blue', 2);
console.log(s);
