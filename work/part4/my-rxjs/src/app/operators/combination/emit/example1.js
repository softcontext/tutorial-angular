"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RxJS v6+
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
//take the first observable to emit
var example = rxjs_1.race(
//emit every 1.5s
rxjs_1.interval(1500), 
//emit every 1s
rxjs_1.interval(1000).pipe(operators_1.mapTo('1s won!')), 
//emit every 2s
rxjs_1.interval(2000), 
//emit every 2.5s
rxjs_1.interval(2500));
var subscription = example.subscribe(function (val) { return console.log(val); });
//output: "1s won!"..."1s won!"...etc
setTimeout(function () {
    subscription.unsubscribe();
}, 5000);
