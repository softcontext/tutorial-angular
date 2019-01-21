import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// 옵저버블 생성 도구(생성자, 생성함수)
import { Observable, Subject, from, fromEvent, of, interval, BehaviorSubject } from 'rxjs';
// 데이터 스트림 처리도구(연산함수)
import { max, map, filter, flatMap, take } from 'rxjs/operators';

class Producer {
  text: string;
  constructor(text: string = 'Hello') {
    this.text = text;
  }
}

@Component({
  selector: 'app-test',
  template: `
  <section>
    <p #p></p>
    <input type="text" name="" value="" #input>
  </section>
  `,
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @ViewChild('p') p: ElementRef;

  constructor() { }

  ngOnInit() {
    // this.step1()
    // this.step2()
    // this.step3()
    // this.step4()
    // this.step5()
    // this.step6()

    // this.step11()

    // this.step21()
    // this.step22()
    // this.step23()
    // this.step24()
    // this.step25()
    this.step26()
  }

  step1() {
    // 수동으로 데이터를 발행한다.
    var myObservable = Observable.create(function(observer) {
      console.log('START')
      // 옵저버의 next 함수를 사용하여 데이터를 옵저버에게 전달한다.
      observer.next(1);
      // next 함수를 연속해서 사용하면 수동으로 데이터 스트림을 전달하는 것이 된다.
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 2000);
    });

    console.log('----before subscribe');

    // 옵저버 객체를 옵저버블의 subscribe 함수를 통해서 전달한다.
    // 구독하지 않으면 옵저버블은 작동하지 않는다.
    myObservable.subscribe({
      next: x => console.log('success result: ' + x),
      error: err => console.error('fail error: ' + err),
      complete: () => console.log('finally done.'),
    });

    console.log('----after subscribe');
  }

  step2() {
    // 이벤트로부터 이벤트 스트림을 전달할 수 있는 옵저버블 객체를 획득한다.
    // Hot Observable: 이벤트 스트림은 모든 구독자들에게
    // 같은 이벤트 정보가 전달되는 Multicast방식의 옵저버블이다.
    var clicks = fromEvent(document, 'click');
    clicks.subscribe(x => console.log(x));

    // 배열은 이터레이터다.
    // 이터레이터로부터 데이터 스트림을 전달할 수 있는 옵저버블 객체를 획득한다.
    var result = from([10, 20, 30]);
    result.subscribe(x => console.log(x));

    // 타입스크립트가 제공하는 fetch 함수는 프라미스를 리턴한다.
    // 프라미스로부터 데이터 스트림을 전달할 수 있는 옵저버블 객체를 획득한다.
    // work\part3\fake-server\db.json 파일을 json-server로 기동시킨 후 확인할 수 있다.
    var report = from(fetch('http://localhost:3000/employees'));

    // 옵저버 객체는 next, error, complete 메소드를 멤버로 가질 수 있다.
    // - next 함수만 이용하여 구독할 수 있다.
    report.subscribe(
      x => console.log('success result: ' + x)
    );
    // - next 함수와 error 함수만 이용하여 구독할 수 있다.
    report.subscribe(
      x => console.log('success result: ' + x),
      err => console.error('fail error: ' + err)
    );
    // next, error, complete 함수들을 멤버 메소드로 소유한 객체를 이용하여 구독할 수 있다.
    report.subscribe({
      next: x => console.log('success result: ' + x),
      error: err => console.error('fail error: ' + err),
      complete: () => console.log('finally done.')
    });
  }

  step3() {
    // 코드적인 변형 #1
    var observer1 = {
      next: x => console.log('success result: ' + x),
      error: err => console.error('fail error: ' + err),
      complete: () => console.log('finally done.')
    };

    var number$ = Observable.create(function(observer) {
      console.log('START')
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

    let subcription1 = number$.subscribe(observer1);

    // 코드적인 변형 #2
    var observer2 = (x) => {
      x => console.log('success result: ' + x)
    }

    var click$ = fromEvent(document, 'click');

    let subcription2 = click$.subscribe(observer2);

    // 구독객체는 다른 구독객체(주로 자식 구독객체)를 소유할 수 있다.
    subcription2.add(subcription1);
    // 구독객체 자신과 자신이 소유한 다른 구독객체 모두 구독을 취소한다.
    subcription2.unsubscribe();
  }

  step4() {
    // 방법 #1
    // 옵저버블을 인수로 받고 처리결과로 옵저버블을 리턴한다.
    // 이 함수는 옵저버블을 래핑하는 방법을 보여준다.
    function multiplyByTen(input: Observable<number>): Observable<number> {
      // Observable.create 함수대신 new 연산자를 이용할 수 있다.
      return new Observable<number>(function(observer) {
        input.subscribe({
          next: (v) => observer.next(10 * v),
          // error: (err) => observer.error(err),
          // complete: () => observer.complete()
        });
      });
    }

    var input = from([1, 2, 3]);
    var output = multiplyByTen(input);
    output.subscribe(x => console.log(x));

    // 방법 #2
    from([1, 2, 3]).pipe(
      // multiplyByTen 고차함수를 이용하는 것보다
      // 준비된 연산함수를 사용하는 것이 훨신 편하고 가독성도 향상된다.
      map(item => item * 10)
    ).subscribe(x => console.log(x));


    /*
     * Difference of map vs flatMap
     */
    from([1, 2, 3]).pipe(
      // 처리결과는 이차원 배열이다.
      map(function(item) {
        return [item, item + 1, item + 2];
      })
    ).subscribe(x => console.log(x));
    // [1, 2, 3]
    // [2, 3, 4]
    // [3, 4, 5]

    from([1, 2, 3]).pipe(
      // 처리결과는 일차원 배열이다.
      flatMap(function(item) {
        return [item, item + 1, item + 2];
      })
    ).subscribe(x => console.log(x));
    // 1, 2, 3, 2, 3, 4, 3, 4, 5
  }

  step5() {
    // of 함수를 사용하면 바로 낱개 상태인 데이터를 이용해서 옵저버블 객체를 획득할 수 있다.
    of(5, 4, 7, 2, 8).pipe(
      // 흘러가는 데이터 중에서 가장 큰 값을 구해서 그 값만 전달한다.
      max()
    ).subscribe(x => console.log(x));

    // 마우스를 클릭했을 때 x 좌표 값만을 전달한다.
    var clickStream = fromEvent<MouseEvent>(document, 'click');
    var positionStream = clickStream.pipe(
      map(ev => ev.clientX)
    );
    positionStream.subscribe(x => console.log(x));

    // 입력된 글자의 길이가 2 이상일 때만 전달한다.
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'input').pipe(
      map(event => (<HTMLInputElement>event.target).value),
      filter(value => value.length >= 2)
    ).subscribe(value => {
      console.log(value)
    });
  }

  step6() {
    // ------------------------------------------------
    // Unicast: 구독자 우선
    // 앞서서 신청한 구독자에게 먼저 데이터를 모두 전달하고
    // 그 다음 구독자에게 데이터를 전달하는 것을 반복한다.
    var count$ = from([{ num: 1 }, { num: 2 }])
    var X, Y;

    count$.subscribe(x => {
      console.log('구독자 #1 x: ', x)
      X = x;
    })
    count$.subscribe(x => {
      console.log('구독자 #2 x: ', x)
      Y = x;
    })
    // 구독자 #1 x:  {num: 1}
    // 구독자 #1 x:  {num: 2}
    // 구독자 #2 x:  {num: 1}
    // 구독자 #2 x:  {num: 2}

    console.log(X === Y); // true

    // ------------------------------------------------
    // Multicast: 데이터 우선
    // 데이터를 하나씩 차례로 모든 구독자에게 전달하고
    // 그 다음 데이터를 전달하는 것을 반복한다.
    var number$ = from([{ num: 10 }, { num: 20 }])
    // 서브젝트를 이용하면 Multicast 방식을 이용할 수 있다.
    var subject = new Subject()
    var A, B;

    subject.subscribe(v => {
      console.log('구독자 #1 v: ', v)
      A = v;
    })
    subject.subscribe(v => {
      console.log('구독자 #2 v: ', v)
      B = v;
    })
    // 구독자 #1 v:  {num: 10}
    // 구독자 #2 v:  {num: 10}
    // 구독자 #1 v:  {num: 20}
    // 구독자 #2 v:  {num: 20}

    number$.subscribe(subject)

    console.log(A === B); // true

    // ------------------------------------------------
    // 이벤트 스트림은 Unicast 방식이다.
    var clickStream = fromEvent<MouseEvent>(document, 'click');
    var positionStream = clickStream.pipe(
      map(ev => ev.clientX)
    );

    positionStream.subscribe(x => console.log('구독자 #1 x: ', x));
    positionStream.subscribe(x => console.log('구독자 #2 x: ', x));
  }

  step11() {
    // COLD Observable:
    // 옵저버가 구독할 때 마다 새 Producer 객체를 만들어서 구독자들에게 전달하면 춥다고 표현한다.
    var cold = new Observable<Producer>((observer) => {
      var producer = new Producer();
      observer.next(producer);
    });

    cold.subscribe(p => {
      console.log('1: ', p.text); // Hello
      p.text = 'Hi';
    });
    cold.subscribe(p => console.log('2: ', p.text)); // Hello

    // HOT Observable:
    // 외부에서 만들어진 하나의 Producer 객체를 구독자들에게 전달하면 덥다고 표현한다.
    // 옵저버가 받는 데이터는 같은 것을 이용하는 것이므로 옵저버들 사이에서 공유된 자원이 된다.
    // "한 음식을 여럿이 같이 먹으면 따듯한 식사가 되고 음식을 각자 먹으면 추운 식사가 된다."
    var producer = new Producer();
    var hot = new Observable<Producer>((observer) => {
      observer.next(producer);
    });

    hot.subscribe(p => {
      console.log('1: ', p.text); // Hello
      p.text = 'Hi';
    });
    hot.subscribe(p => console.log('2: ', p.text)); // Hi
  }

  step21() {
    const interval$ = interval(1000).pipe(take(5));

    // 구독할 때 마다 새로운 실행 흐름이 생성된다.
    interval$.subscribe(num => console.log('#A: ', num));

    setTimeout(() => {
      interval$.subscribe(num => console.log('#B: ', num));
    }, 2000);

    // #A:  0
    // #A:  1
    // #A:  2
    // #B:  0
    // #A:  3
    // #B:  1
    // #A:  4
    // #B:  2
    // #B:  3
    // #B:  4
  }

  step22() {
    // 앞서서 살펴 본 예제를 클래식(옛스런)한 방법으로 다시 작성해 보았다.
    function interval(caller, second, take) {
      let count = 0;
      let timer = setInterval(() => {
        console.log(caller + ': ', count);
        count++;
        if (count >= take) {
          clearInterval(timer);
        }
      }, second);
    }

    interval('#A', 1000, 5);

    setTimeout(() => {
      interval('#B', 1000, 5);
    }, 2000);

    // 옵저버가 Plain 옵저버블을 구독하면 각각 독립적으로 수행된다는 것을 파악했다.
    // 만약, 두 번째 옵저버가 첫 번째 옵저버가 데이터(또는 이벤트)를 받을 때
    // 바로 같이 받고 싶은 경우 서브젝트를 사용하면 된다.
  }

  step23() {
    const interval$ = interval(1000).pipe(take(5));

    // const subject = new Subject();
    const subject = new BehaviorSubject(null);

    interval$.subscribe(subject);

    subject.subscribe(val => console.log(`First observer ${val}`));

    setTimeout(() => {
      subject.subscribe(val => console.log(`Second observer ${val}`))
    }, 3500);

    // ----------------------
    // Subject 사용결과
    // First observer 0
    // First observer 1
    // First observer 2
    // First observer 3
    // Second observer 3
    // First observer 4
    // Second observer 4

    // ----------------------
    // BehaviorSubject 사용결과
    // 초기 값부터 방출된다.
    // First observer null
    // First observer 0
    // First observer 1
    // First observer 2
    // Second observer 2
    // First observer 3
    // Second observer 3
    // First observer 4
    // Second observer 4
  }

  step24() {
    // 템플릿이 가진 엘리먼트에서 발생하는 이벤트로부터 옵저버블로 연동하는 방법
    const input = this.input.nativeElement;
    const p = this.p.nativeElement;

    const subject = new Subject();

    input.addEventListener('input', event => {
      subject.next(event.target.value);
    });

    subject.subscribe(val => {
      p.textContent = val;
    });
  }

  step25() {
    /*
     * Difference of Subject vs BehaviorSubject
     */
    const subject = new Subject();
    subject.next(1);
    // 발행을 먼저하고 나중에 구독하면 앞서서 발행된 데이터를 받지 못한다.
    subject.subscribe(x => console.log('Subject # x: ', x)); // 출력되지 않는다.

    // BehaviorSubject는 Subject의 확장입니다.
    // 초기 값을 설정할 수 있으며 최신 값을 보존합니다.
    // 이벤트가 방출된 다음 구독해도 값을 전달받을 수 있습니다.
    const behaviorSubject = new BehaviorSubject(null);
    // 초기값으로 null을 할당하면 최신 값은 null인 상태다.
    // 1을 발행하면 최신 값은 1인 상태가 된다.
    behaviorSubject.next(1);
    // 발행을 먼저하고 나중에 구독해도 보존하고 있는 최신 값을 받을 수 있다.
    behaviorSubject.subscribe(x => console.log('BehaviorSubject # x: ', x)); // 출력된다.

    // 값은 보존되며 보존된 값을 얻을 수 있습니다.
    console.log('value: ', behaviorSubject.getValue())
  }

  step26() {
    // BehaviorSubject 서브젝트는 초기 값을 설정할 수 있다.
    var behaviorSubject = new BehaviorSubject<{ num: number }>({ num: 0 });
    // BehaviorSubject 서브젝트가 가진 최신 값(현재는 초기 값)을 구할 수 있다.
    console.log(behaviorSubject.getValue()); // {num: 20}

    behaviorSubject.subscribe(v => {
      console.log('구독자 #A v: ', v.num)
    })

    from([{ num: 10 }, { num: 20 }]).subscribe(behaviorSubject);

    // subscribe 함수가 호출되는 즉시 옵저버블의 데이터가 BehaviorSubject에게 전달된다.
    // 이 순간 구독자는 #A 뿐이으므로 #A 구독자만 데이터를 받는다.
    // 구독자 #A v:  0
    // 구독자 #A v:  10
    // 구독자 #A v:  20

    // BehaviorSubject가 직접 방출하는 것이 아닌 배열로부터 파생된 옵저버블을 구독하게 되면
    // 데이터 스트림이 끝난 후 구독을 신청한 구독자 #B는 아무것도 받지 못한다.
    // 그런데 배열이 아닌 이벤트 스트림을 사용한다면
    // 나중에 사용자에 의해서 이벤트가 발생하게 될 때
    // 구독자 #B도 데이터를 받을 수 있다. (이벤트보다 구독이 앞섰으므로)
    behaviorSubject.subscribe(v => {
      console.log('구독자 #B v: ', v.num)
    })
  }

}
