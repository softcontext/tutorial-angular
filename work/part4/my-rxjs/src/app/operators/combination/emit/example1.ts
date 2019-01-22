// RxJS v6+
import { mapTo } from 'rxjs/operators';
import { interval, race } from 'rxjs';

//take the first observable to emit
const example = race<any>(
  //emit every 1.5s
  interval(1500),
  //emit every 1s
  interval(1000).pipe(mapTo('1s won!')),
  //emit every 2s
  interval(2000),
  //emit every 2.5s
  interval(2500)
);

const subscription = example.subscribe(val => console.log(val));
//output: "1s won!"..."1s won!"...etc

setTimeout(() => {
  subscription.unsubscribe()
}, 5000)