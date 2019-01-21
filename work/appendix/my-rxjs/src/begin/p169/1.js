const { timer, range, interval } = require('rxjs');
const { map, mergeMap, take, switchMap } = require('rxjs/operators');

interval(500).pipe(
  take(5),
  switchMap(i => {
    return interval(200).pipe(
      map(j => {
        return {i, j}
      }),
      take(3)
    )
  })
)
.subscribe(result => {
  console.log(result);
})
// { i: 0, j: 0 }
// { i: 0, j: 1 }
// { i: 1, j: 0 }
// { i: 1, j: 1 }
// { i: 2, j: 0 }
// { i: 2, j: 1 }
// { i: 3, j: 0 }
// { i: 3, j: 1 }
// { i: 4, j: 0 }
// { i: 4, j: 1 }
// { i: 4, j: 2 }

// 123456789012345678901234567890
//     0    1    2    3    4
//       0 1  0 1  0 1  0 1  0 1 2







