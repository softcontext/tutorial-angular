(function () {
    var Sedan = /** @class */ (function () {
        function Sedan(color, doors) {
            if (color === void 0) { color = 'Red'; }
            if (doors === void 0) { doors = 4; }
            this.color = color;
            this.doors = doors;
        }
        Sedan.prototype.show = function () {
            console.log(this.color, this.doors);
        };
        return Sedan;
    }());
    var s = new Sedan('Blue', 2);
    console.log(s);
    s.show();
})();
