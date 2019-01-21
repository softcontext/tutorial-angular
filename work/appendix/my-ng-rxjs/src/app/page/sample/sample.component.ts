import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, from, ReplaySubject, interval, Subject } from 'rxjs';
import {
  map, tap, filter, withLatestFrom, distinct,
  flatMap, switchMap, debounceTime, distinctUntilChanged
} from 'rxjs/operators';
import { Temperature } from 'src/app/page/model/temperature';

const KEY = '234cc7dc798fe309baa195d67ad5dcde';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit, OnDestroy {
  @ViewChild('button') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  // 초기에 사용할 우편번호들
  zipcodes: string[] = ['94102', '99501', '32801'];
  // 화면에 표시하기 위한 데이터
  temperatures: Temperature[] = [];
  replayZipsStream = new ReplaySubject();
  subject = new Subject()

  constructor() { }

  // Just for Test: input Event
  onInput(e) {
    // console.log(e.target.value)
  }

  ngOnInit() {
    /*
     * 이벤트 스트림
     */
    const zipInputStream = fromEvent(this.input.nativeElement, 'input').pipe(
      // tap<any>(e => console.log('input', e)),
      map<any, string>(e => e.target.value),
      filter(zip => zip.length === 5),
      // 1초에 한 번만 전파한다.
      debounceTime(1000),
      // 마지막으로 전파한 데이터와 달라야 전파된다.
      // 중복 메시지를 보여주기 위해서 사용하지 않는다.
      // distinctUntilChanged(),
    )

    // fromEvent 함수는 Hot Observable을 반환한다. 따라서 모든 구독자는 공유된 데이터를 전달받는다.
    // 구독자가 둘(1. HTTP 스트림, 2. 인터벌 스트림)이므로 두번 처리된다.
    const zipcodeStream = fromEvent(this.button.nativeElement, 'click').pipe(
      // tap<any>(e => console.log('click', e)),
      //  click 이벤트로 시작하지만 사용하고 싶은 데이터는 input 엘리먼트가 가진 값이다.
      withLatestFrom(zipInputStream, (_click, zip) => zip),
    )

    /*
     * HTTP 스트림
     */
    zipcodeStream.pipe(
      // 이벤트 스트림을 통하지 않고 화면이 뜰 때 Init Value 작업시 저장된 데이터와에 중복을 체크한다.
      filter(zip => {
        if (this.temperatures.find(item => item.zip === zip)) {
          alert('Already Exist!');
          this.input.nativeElement.focus();
          return false;
        } else {
          this.input.nativeElement.value = '';
          this.input.nativeElement.focus();
          return true;
        }
      }),
      flatMap(this.zipTemperatureStreamFactory.bind(this)),
    ).forEach(({ zip, name, main, weather }) => {
      this.temperatures.push({ zip, name, main, weather })
    });

    /*
     * 인터벌 스트림
     */
    zipcodeStream.pipe(
      filter(zip => {
        if(this.temperatures.find(item => item.zip === zip)){
          return false;
        }
        return true;
      }),
      tap(zip => console.log('zip: ', zip))
    ).subscribe(this.replayZipsStream);

    interval(10000).pipe(
      switchMap(() => this.replayZipsStream),
      flatMap(this.zipTemperatureStreamFactory.bind(this))
    ).forEach(({ zip, main, weather }) => {
      console.log('Updating!', zip, main.temp, main.humidity);

      this.temperatures.forEach(item => {
        if (item.zip === zip) {
          item.main.temp = main.temp;
          item.main.humidity = main.humidity;
          item.weather[0].description = weather[0].description;
        }
      })
    });

    /*
     * Init Value(초기값 설정):
     * 1. 최초 화면이 표시될 때 기본 정보를 이용하여 값을 구하고 화면에 표시한다.
     * 2. 일정주기를 갖고 데이터를 새로 구해서 화면을 갱신한다.
     */

    // 값이 할당되도 input 이벤트는 발생하지 않는다.
    // this.input.nativeElement.value = '94102';
    // click 이벤트는 발생한다.
    // click 이벤트로 시작하지만 이용해야 하는 데이터는 input 엘리먼트가 가진 값이므로
    // click 이벤트 스트림 시 zipInputStream 옵저버블을 통해 데이터를 받아야 한다.
    // zipInputStream는 input 이벤트로 촉발되는데 값을 코드적으로 직접 할당하면
    // input 이벤트가 발생하지 않아서 결국 아무것도 화면에 표시되지 않는다.
    // (<HTMLElement>this.button.nativeElement).click();

    // #1 해결책
    // - 다음 코드로 최초 화면이 표시될 때 기본 정보를 이용하여 값을 구하고 화면에 표시할 수 있다.
    // 그런데 ReplaySubject는 이 정보를 알지 못하므로 인터벌 시간 후 갱신되지 못한다.
    // 그러므로 ReplaySubject에게 정보를 전달하는 방법이 필요하다. #2를 참고하세요.
    this.zipcodes.forEach(zip => {
      this.zipTemperatureStreamFactory(zip).subscribe(({ zip, name, main, weather }) => {
        this.temperatures.push({ zip, name, main, weather })
      })
    })

    // #2 해결책
    // - Subject는 Observable이면서 Observer다.
    // Subject는 Observable이므로 ReplaySubject가 이를 구독하도록 조치한다.
    // - Subject는 Observer이므로 다른 Observable, Subject를 구독할 수 있다.
    // Subject는 Observer이므로 next, error, complete 메소드를 갖고 있다.
    // Subject의 next 메소드를 수동으로 호출하여 ReplaySubject에게 값을 전달한다.
    // 이 것이 수동으로 스트림에 데이터를 추가하는 방법이다.
    this.subject.subscribe(this.replayZipsStream)
    this.zipcodes.forEach(zip => {
      this.subject.next(zip)
    })
  }

  async getTemperature(zip: string): Promise<any> {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&appid=${KEY}`);
    return res.json();
  }

  zipTemperatureStreamFactory(zip: string) {
    return from(this.getTemperature(zip)).pipe(
      map(({ weather, main, name }) => {
        return { zip, name, main, weather }
      })
    )
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
    this.replayZipsStream.unsubscribe();
  }

}
