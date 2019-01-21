const { timer, range } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');

range(0, 3).pipe(
  mergeMap(idx => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Req${idx + 1}`)
      }, Math.floor(Math.random() * 2000))
    })
  })
)
.subscribe(str => {
  console.log(str);
})













