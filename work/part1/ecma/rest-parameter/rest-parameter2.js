const [first, ...arr] = [10, 20, 30, 40];
// 배열을 낱개로 펼치므로 스프레드 연산자이면서
// 낱개들을 하나의 배열로 모으므로 나머지 파라미터다.
console.log(first);
// 10
console.log(arr);
// [ 20, 30, 40 ]