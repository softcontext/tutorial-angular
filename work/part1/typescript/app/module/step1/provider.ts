console.log('provider START')

export var myNumber1 = 10;

export var myObject = {
  myNumber2: 20
};

export function add(a: number = 0, b: number = 0) {
  return a + b;
}

// export default {
//   myNumber1, myObject, add
// }

console.log('provider END')