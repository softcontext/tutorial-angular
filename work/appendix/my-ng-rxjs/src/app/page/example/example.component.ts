import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Rx from 'rxjs';
import { fromEvent, from, ReplaySubject, interval } from 'rxjs';
import { map, tap, filter, withLatestFrom, distinct, flatMap, switchMap } from 'rxjs/operators';

const KEY = '234cc7dc798fe309baa195d67ad5dcde';

class Weather {
  "id": number;
  "main": string;
  "description": string;
  "icon": string;
}

class Main {
  "temp": number;
  "pressure": number;
  "humidity": number;
  "temp_min": number;
  "temp_max": number;
}

class Temperature {
  "zip": string;
  "name": string;
  "main": Main;
  "weather": Weather[];
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @ViewChild('button') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  temperatures: Temperature[] = [];

  constructor() { }

  ngOnInit() {
    // this.existResource()
    // this.step1()
    // this.step2()
    // this.step3()
    // this.step4()
    // this.step5()
    this.step6()
  }

  existResource() {
    // rxjs 라이브러를 임포트할 수 있는지 확인한다.
    console.log('RxJS included?', !!Rx)
    // @ViewChild('button') 설정이 잘 처리되었는지 확인한다.
    console.log(this.button)
  }

  step1() {
    // pipe 함수는 공급된 데이터를 파이프에 등록한 첫 함수에 파라미터로 전달한다.
    // 각 함수가 받는 파라미터는 앞 함수가 반환한 값이다.
    // pipe 함수는 마지막 연산함수의 반환 값을 옵저버블로 포장하여 반환한다.
    const btnClickStream = fromEvent(this.button.nativeElement, 'click').pipe(
      tap(val => console.log('val: ', val)),
      map(() => true),
      tap(val => console.log('val: ', val)),
    )

    // Difference of subscribe vs forEach
    // - subscribe 또는 forEach 함수를 호출하여 구독을 신청해야 옵저버블이 작동을 시작한다.
    // - subscribe 함수는 Subscription 객체를 리턴한다. Subscription 객체로 구독을 취소할 수 있다.
    // 이벤트 발생주기를 모를 때 주로 사용한다.
    // - forEach 함수는 Promise 객체를 리턴한다. 프라미스 객체로는 구독을 취소할 수 없다.
    // - 일정기간이나 정해진 횟수 안에서 데이터를 모으거나 출력하고자 할 때 주로 사용한다.

    // let subscription = btnClickStream.subscribe(() => console.log('Clicked!'));
    let promise = btnClickStream.forEach(() => console.log('Clicked!'))
  }

  step2() {
    // input 이벤트를 공급자로 삼는 옵저버블 객체를 획득한다.
    const zipInputStream = fromEvent(this.input.nativeElement, 'input').pipe(
      // input 이벤트로부터 타겟 엘리먼트의 입력된 문자열을 얻는다.
      map<any, string>(e => e.target.value),
      // fiter 함수가 true를 반환할 때에만 입력된 문자열이 구독자에게 전파된다.
      filter(zip => zip.length === 5)
    )
    zipInputStream.forEach(val => console.log('val: ', val))
  }

  step3() {
    // click 이벤트를 공급자로 삼는 옵저버블 객체를 획득한다.
    const btnClickStream = fromEvent(this.button.nativeElement, 'click')

    const zipInputStream = fromEvent(this.input.nativeElement, 'input').pipe(
      map<any, string>(e => e.target.value),
      filter(zip => zip.length === 5)
    )

    const zipcodeStream = btnClickStream.pipe(
      // 버튼 click 이벤트로 생성된 데이터(MouseEvent)에
      // zipInputStream 처리결과로 획득한 길이가 5인 문자열 데이터(zip)를 합친다.
      // 필요한 것은 zip 문자열뿐이므로 zip 문자열만 반환한다.
      withLatestFrom(zipInputStream, (click, zip) => zip),
      // 이미 전파한 데이터라면 전파하지 않고 한 번도 보내지 않은 데이터만 전파한다.
      distinct()
    )
    zipcodeStream.forEach(val => console.log('val: ', val))
  }

  step4() {
    // fetch: TS가 제공하는 HTTP 함수
    const getTemperature = zip =>
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=${KEY}`)
        .then(res => res.json());

    // 프라미스를 반환하는 getTemperature 함수를 from(구 fromPromise) 함수에 전달하여 옵저버블로 변환한다.
    // map 함수에 전달하는 함수 인수 자리에서 해체할당 문법을 중첩하여 사용하면
    // 원하는 정보만을 뽑아서 사용할 수 있다.
    const zipTemperatureStreamFactory = zip => {
      return from(getTemperature(zip)).pipe(
        map(({ main: { temp } }) => ({ temp, zip }))
      )
    }

    // 94102 문자열은 "San Francisco" 지역이다.
    zipTemperatureStreamFactory(94102).forEach(val => console.log('val: ', val))
  }

  step5() {
    const btnClickStream = fromEvent(this.button.nativeElement, 'click')

    const zipInputStream = fromEvent(this.input.nativeElement, 'input').pipe(
      map<any, string>(e => e.target.value),
      filter(zip => zip.length === 5)
    )

    const zipcodeStream = btnClickStream.pipe(
      withLatestFrom(zipInputStream, (click, zip) => zip),
      distinct()
    )

    const getTemperature = zip =>
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=${KEY}`)
        .then(res => res.json());

    const zipTemperatureStreamFactory = zip => {
      return from(getTemperature(zip)).pipe(
        // 우편번호, 지역, 온도, 날씨정보를 새 객체로 포장해서 반환한다.
        map(({ weather, main, name }) => {
          return { zip, name, main, weather }
        })
      )
    }

    const displayStream = zipcodeStream.pipe(
      // 중첩된 옵저버블 객체라는 포장지를 벗기고 실제 데이터만을 획득한다.
      flatMap(zipTemperatureStreamFactory)
    )

    displayStream.forEach(({ zip, name, main, weather }) => {
      // 컴포넌트가 갖고 있는 배열에 정보를 보유한 객체를 추가한다.
      this.temperatures.push({ zip, name, main, weather })
    });
  }

  step6() {
    const btnClickStream = fromEvent(this.button.nativeElement, 'click')

    const zipInputStream = fromEvent(this.input.nativeElement, 'input').pipe(
      map<any, string>(e => e.target.value),
      filter(zip => zip.length === 5)
    )

    const zipcodeStream = btnClickStream.pipe(
      withLatestFrom(zipInputStream, (click, zip) => zip),
      distinct()
    )

    const getTemperature = zip =>
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=${KEY}`)
        .then(res => res.json());

    const zipTemperatureStreamFactory = zip => {
      return from(getTemperature(zip)).pipe(
        map(({ weather, main, name }) => {
          return { zip, name, main, weather }
        })
      )
    }

    const displayStream = zipcodeStream.pipe(
      flatMap(zipTemperatureStreamFactory)
    )

    displayStream.forEach(({ zip, name, main, weather }) => {
      this.temperatures.push({ zip, name, main, weather })
    });

    // 반복적으로 작업을 수행하기 위해서 ReplaySubject 서브젝트를 사용한다.
    const replayZipsStream = new ReplaySubject();
    // 새로운 ReplaySubject를 만들고 zipcodeStream을 구독한다.
    // zipcodeStream이 전달하는 우편번호를 ReplaySubject가 기억한다.
    zipcodeStream.subscribe(replayZipsStream);

    // flatMap 대신에 switchMap(구 flatMapLatest)을 사용하는 이유는
    // replayZipsStream이 단 하나의 구독자만 가지는 것을 보장하고 싶기 때문이다.
    // 그냥 flatMap을 사용했다면 같은 ReplaySubject에 여러 개의 구독자를 추가했을 것이고,
    // 그렇게 되면 날씨 API로 쓸데 없는 여러 개의 요청을 날리게 될 것이다.
    const displayReplayStream = interval(60000).pipe(
      switchMap(() => replayZipsStream),
      flatMap(zipTemperatureStreamFactory)
    )

    // 구독 시작
    displayReplayStream.forEach(({ zip, name, main, weather }) => {
      console.log('Updating!', zip, main.temp, main.humidity);

      this.temperatures.forEach(item => {
        if (item.zip === zip) {
            item.main.temp = main.temp
            item.main.humidity = main.humidity
        }
      })
    });
  }

}
