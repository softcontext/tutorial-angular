// RxJS v6+
import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 1s, take 2
const source = interval(1000).pipe(take(2));
// source.subscribe(data => console.log(data))
// 0
// 1

//map each emitted value from source to interval observable that takes 5 values
const example = source.pipe(
  map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
);
// example.subscribe(observable => {
//   observable.subscribe(data => console.log(data))
// })
// Result (0): 0
// Result (0): 1
// Result (1): 0
// Result (0): 2
// Result (1): 1
// Result (0): 3
// Result (1): 2
// Result (0): 4
// Result (1): 3
// Result (1): 4


/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
const combined = example.pipe(combineAll());
const subscribe = combined.subscribe(val => console.log(val));
/*
  output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
