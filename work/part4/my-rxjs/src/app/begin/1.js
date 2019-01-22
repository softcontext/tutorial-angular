"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rxjs");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var x = Rx.of(1, 2, 3);
x.subscribe(function (data) {
    console.log(data);
});
var y = rxjs_1.of(1, 2, 3).pipe(operators_1.map(function (x) { return x * 10; }));
y.subscribe(function (data) {
    console.log(data);
});
