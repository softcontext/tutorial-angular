import * as Rx from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

var x = Rx.of(1, 2, 3)

x.subscribe(data => {
  console.log(data);
})

var y = of(1, 2, 3).pipe(map(x => x * 10));

y.subscribe(data => {
  console.log(data);
})
