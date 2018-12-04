/**
 * ES5
 */
function MyArray() {}

MyArray.prototype = Object.create(Array.prototype);

let myArray = new MyArray();
myArray[0] = 10;

console.log(myArray); // Array { '0': 10 }
console.log(myArray instanceof Array); // true
console.log(myArray.length); // 0 : Bad

/**
 * ES6
 */
class NewArray extends Array {}

let arr = new NewArray();
arr[0] = 10;

console.log(arr); // NewArray [ 10 ]
console.log(arr instanceof Array); // true
console.log(arr.length); // 1 : Good
