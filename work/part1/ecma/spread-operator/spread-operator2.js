let arr1 = [2, 3, 4];

// arr1 배열을 낱개로 펼친 다음 새 배열에 넣는다.
let arr2 = [1, ...arr1, 5];

console.log(arr2);
// [ 1, 2, 3, 4, 5 ]

arr1 = [10, 20, 30];
arr2 = [40, 50];

/**
 * Function.prototype.concat : 
 * 두 배열을 붙여서 새 배열을 만든다.
 */
let arr3 = arr1.concat(arr2);
console.log(arr3);
// [ 10, 20, 30, 40, 50 ]

/**
 * Function.prototype.put : 
 * 배열의 끝에 요소를 추가한다.
 */
let index = arr1.push(arr2);
console.log(index);
// 4
console.log(arr1);
// [ 10, 20, 30, [ 40, 50 ] ]
// arr2가 가리키는 배열이 통째로 들어간다.

arr1 = [10, 20, 30];
arr2 = [40, 50];

arr1.push(...arr2);
console.log(arr1);
// [ 10, 20, 30, 40, 50 ]
// arr2 배열의 아이템들을 낱개로 펼친 다음 
// arr1 배열에 추가한다.