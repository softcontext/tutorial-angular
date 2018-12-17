# Pipe

## Built-in Pipe

**built-in.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-built-in',
  templateUrl: './built-in.component.html',
  styleUrls: ['./built-in.component.scss']
})
export class BuiltInComponent implements OnInit {
  /**
   * https://angular.io/api/common#pipes
   */
  str = "aBcDeFg";
  num = 1234.1234;
  date = new Date();
  a: number = 0.259;
  b: number = 1.3495;
  json = {
    info: { name: 'Tom', age: 20 },
    list: [
      { name: 'John', age: 21 },
      { name: 'Sam', age: 22 }
    ]
  };
  items = ['Apple', 'Banana', 'Candy', 'Donut'];
  dateAsString = '20201225';

  constructor(router: Router) {
    /**
     * 클릭 할 때 일반 해시 태그처럼 페이지 내의 특정 위치로 이동하고 싶습니다.
     * https://code.i-harness.com/ko-kr/q/226de7c
     */
    router.events.subscribe(s => {
      // NavigationEnd 
      // {id: 1, url: "/pipe/built-in#custom", urlAfterRedirects: "/pipe/built-in#custom"}
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        // UrlTree 
        // {root: UrlSegmentGroup, queryParams: {}, fragment: "custom"}
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            element.scrollIntoView(true);
          }
        }
      }
    });
  }

  ngOnInit() { }

}
```

**built-in.component.scss**

```scss
label {
  color: red;
}
```

**built-in.component.html**

```html
<div class="container">
  <p>문자열</p>
  str: <label>{{str}}</label><br>
  str | uppercase: <label>{{str | uppercase}}</label><br>
  str | lowercase: <label>{{str | lowercase}}</label><br>
</div>
<div class="container">
  <p>슬라이스</p>
  str: <label>{{str}}</label><br>
  str | slice:0:3: <label>{{str | slice:0:3}}</label><br>
  str | slice:3:5: <label>{{str | slice:3:5}}</label><br>
</div>
<div class="container">
  <p>숫자</p>
  num: <label>{{num}}</label><br>
  num | number: <label>{{num | number}}</label><br>
  num | number:'.4-4': <label>{{num | number:'.4-4'}}</label><br>
  num | number:'.5-5': <label>{{num | number:'.5-5'}}</label><br>
  num | number:'8.0-3': <label>{{num | number:'8.0-3'}}</label><br>
</div>
<div class="container">
  <p>퍼센트</p>
  num: <label>{{num}}</label><br>
  num | percent: <label>{{num | percent}}</label><br>
  num / 100 | percent:'8.0-5': <label>{{num / 100 | percent:'8.0-5'}}</label><br>
</div>
<div class="container">
  <p>날짜</p>
  date: <label>{{date}}</label><br>
  date | date: <label>{{date | date}}</label><br>
  date | date:'HH:mm': <label>{{date | date:'HH:mm'}}</label><br>
  date | date:'fullDate': <label>{{date | date:'fullDate'}}</label><br>
  date | date:'yyyy.MM.dd HH:mm:ss': <label>{{date | date:'yyyy.MM.dd HH:mm:ss'}}</label><br>
  date | date:'yyyy.MM.dd aa hh:mm:ss': <label>{{date | date:'yyyy.MM.dd aa hh:mm:ss'}}</label><br>
</div>
<div class="container">
  <p>통화</p>
  a: <label>{{a}}</label><br>
  b: <label>{{b}}</label><br>

  a | currency: <label>{{a | currency}}</label><br>
  a | currency:'CAD': <label>{{a | currency:'CAD'}}</label><br>
  a | currency:'CAD':'code': <label>{{a | currency:'CAD':'code'}}</label><br>
  b | currency:'CAD':'symbol':'4.2-2': <label>{{b | currency:'CAD':'symbol':'4.2-2'}}</label><br>
  b | currency:'CAD':'symbol-narrow':'4.2-2': <label>{{b | currency:'CAD':'symbol-narrow':'4.2-2'}}</label><br>

  a | currency:'KRW': <label>{{a | currency:'KRW'}}</label><br>
  a | currency:'KRW':'code': <label>{{a | currency:'KRW':'code'}}</label><br>
  b | currency:'KRW':'symbol':'4.2-2': <label>{{b | currency:'KRW':'symbol':'4.2-2'}}</label><br>
  b | currency:'KRW':'symbol-narrow':'4.2-2': <label>{{b | currency:'KRW':'symbol-narrow':'4.2-2'}}</label><br>
  b | currency:'KRW':'symbol':'5.1': <label>{{b | currency:'KRW':'symbol':'5.1'}}</label><br>
</div>
<div class="container">
  <p>JSON</p>
  json: <label>{{json}}</label><br>
  json: <label>{{json | json}}</label><br>
</div>
<div class="container">
  <p>반복 슬라이스</p>
  <ul>
    <li *ngFor="let item of items">
      {{ item }}
    </li>
  </ul>
  <br>
  <ol>
    <li *ngFor="let item of items | slice:1:3">
      {{ item }}
    </li>
  </ol>
</div>
```

## Custom Pipe

**str-date.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strDate'
})
export class StrDatePipe implements PipeTransform {

  transform(date: string, delim?: string): string {
    if (!delim) {
      delim = '.';
    }
    if (date.length !== 8) {
      return date;
    }
    return date.substring(0, 4) + delim + date.substring(4, 6) + delim + date.substring(6);
  }

}
```

**built-in.component.html**

```html
<div class="container" id="custom">
  <p>커스텀 파이프</p>
  dateAsString: <label>{{dateAsString}}</label><br>
  dateAsString: <label>{{dateAsString | strDate}}</label><br>
  dateAsString: <label>{{dateAsString | strDate:'-'}}</label><br>
</div>
```
