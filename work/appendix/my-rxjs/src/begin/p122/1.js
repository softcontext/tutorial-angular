const { of, from, fromEvent, interval } = require('rxjs'); // 생성함수
const { map, filter, takeWhile, takeLast, tap } = require('rxjs/operators'); // 연산함수

interval(300).pipe(
  tap(x => console.log('1: ', x)),
  filter(x => x % 2 === 0), // 짝수만 통과
  tap(x => console.log('2: ', x)),
  takeWhile(x => x <= 10), // 10 이하만 통과
  tap(x => console.log('3: ', x)),
  takeLast(4)
).subscribe(console.log)
// 1:  0
// 2:  0
// 3:  0  ==> [0]
// 1:  1 [홀수는 버림]
// 1:  2
// 2:  2
// 3:  2  ==> [0, 2]
// 1:  3 [홀수는 버림]
// 1:  4
// 2:  4
// 3:  4 ==> [0, 2, 4]
// 1:  5 [홀수는 버림]
// 1:  6
// 2:  6
// 3:  6 ==> [0, 2, 4, 6]
// 1:  7 [홀수는 버림]
// 1:  8
// 2:  8
// 3:  8 ==> [8, 2, 4, 6]
// 1:  9 [홀수는 버림]
// 1:  10
// 2:  10
// 3:  10 ==> [8, 10, 4, 6]
// 1:  11 [홀수는 버림]
// 1:  12
// 2:  12
// [10 초과는 버림]
// ----------END---------
// 링 형태로 저장된 요소를 먼저 등록된 순서대로 발행한다.
// 4
// 6
// 8
// 10













