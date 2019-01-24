"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('provider START');
exports.myNumber1 = 10;
exports.myObject = {
    myNumber2: 20
};
function add(a, b) {
    if (a === void 0) { a = 0; }
    if (b === void 0) { b = 0; }
    return a + b;
}
exports.add = add;
// export default {
//   myNumber1, myObject, add
// }
console.log('provider END');
