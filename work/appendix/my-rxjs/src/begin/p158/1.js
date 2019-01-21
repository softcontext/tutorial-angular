const { timer, range } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');

// timer(대기시간, 인터벌)
// - 대기시간 후 최초 방출한다.
// - 인터벌이 설정되었다면 인터벌 시간 후 반복 방출한다. 
//   interval 함수와 동일한 부분이다.
const requests = [
  timer(Math.floor(Math.random() * 3000)).pipe(map(_ => 'Req1')),
  timer(Math.floor(Math.random() * 1000)).pipe(map(_ => 'Req2')),
  timer(Math.floor(Math.random() * 2000)).pipe(map(_ => 'Req3')),
]

range(0, 3)
.subscribe(idx => {
  // subscribe 함수가 중첩되어 나타난다.
  // 구독자가 처리하는 모습이다.
  requests[idx].subscribe(str => {
    console.log('A >> ' + str);
  })
})

range(0, 3).pipe(
  // 두 개의 옵저버블을 합병하고 사상된 결과를 방출한다.
  mergeMap(idx => requests[idx])
)
.subscribe(str => {
  console.log('B >> ' + str);
})








