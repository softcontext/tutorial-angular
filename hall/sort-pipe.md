# Pipe Sort

주석으로 설명을 대신합니다. 코드를 흐름대로 따라가면서 살펴보시기 바랍니다.

# 예제 프로젝트

```bash
$ ng new my-pipe-sort
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? SCSS
```

## Sort Pipe

```bash
$ cd my-pipe-sort
$ ng g c page/company
$ ng g class model/company
$ ng g class model/country
$ ng g p pipe/sort
```

**country.ts**

```ts
export class Country {
  country: string;
  cash: number;

  constructor(country: string, cash: number) {
    this.country = country;
    this.cash = cash;
  }
}
```

**company.ts**

```ts
import { Country } from './country'

export class Company {
  company: string;
  domain: string;
  info: Country;

  constructor(company: string, domain: string, info: Country) {
    this.company = company;
    this.domain = domain;
    this.info = info;
  }
}
```

**sort.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../model/company';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(companies: Company[], path: string[], order: number): Company[] {
    // 로직처리를 위한 제어 값이 하나라도 없다면 처리할 수 없으므로 받은 것 그대로 반환한다.
    if (!companies || !path || !order) {
      return companies;
    }

    // 배열의 sort 함수에게 건네주는 콜백함수는
    // 오름차순이라면 1을 리턴하고
    // 내림차순이라면 -1을 리턴하고
    // 두 값이 같다면 0을 리턴해야 한다.
    return companies.sort((a: Company, b: Company) => {
      // 정렬기준이 되는 객체의 프로퍼티명(들)을 보관하는 배열(path)의 값을
      // 사용하여 객체안으로 진입해 들어간다. 멋진 처리방법이다.
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // 두 값이 같은 경우, 순서를 바꿀 필요가 없다.
      if (a === b) {
        return 0;
      }
      // 앞 값이 큰 경우,
      //    order가 1이라면 오름차순을 의미하고 순서를 바꿔야 하므로 1을 리턴한다.
      //    order가 -1이라면 내림차순을 의미하고 그대로 유지해야 하므로 -1을 리턴한다.
      // 앞 값이 작은 경우,
      //    order가 1이라면 오름차순을 의미하고 그대로 유지해야 하므로 -1을 리턴한다.
      //    order가 -1이라면 내림차순을 의미하고 순서를 바꿔야 하므로 1을 리턴한다.
      return a > b ? order : order * (- 1);
    })
  }

}
```

**company.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Country } from '../../model/country';
import { Company } from '../../model/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  // 테이블 바디에 표시하는 실제 데이터를 취급하는 배열이다.
  // 객체가 멤버로써 객체를 갖는 중첩형태로써 실무에서 많이 사용하는 자료구조의 형태를 보여주고 있다.
  companies: Company[] = [
    new Company('Tencent Holdings', 'tencent.com', new Country('China', 491.3)),
    new Company('Johnson & Johnson', 'jnj.com', new Country('USA', 341.3)),
    new Company('Samsung Electronics', 'samsung.com', new Country('Korea', 325.9)),
    new Company('Apple', 'apple.com', new Country('USA', 926.9)),
  ];

  // 타이틀 부분을 클릭할때 정렬을 수행하고 다시 보여주고 싶을 때
  // 필요한 사전작업으로 titles, col 변수가 필요하다.
  // 테이블 타이틀 정보를 취급하는 배열이다. 추가로 정렬기준 정보를 갖는다.
  titles = [
    { title: 'Company', key: 'company' },
    { title: 'Domain', key: 'domain' },
    { title: 'Country', key: 'info.country' },
    { title: 'Cash', key: 'info.cash' },
  ];
  // 정렬칼럼: 화살표 아이콘을 표시하기 위한 칼럼위치를 결정할 때 사용한다.
  col: number = 0;
  // 1: asc, -1: desc; 화살표 아이콘의 종류를 결정할 때 사용한다.
  order: number = 1;
  // 정렬기준이 되는 객체의 프로퍼티명(들)을 보관하는 배열: 정렬 파이프에서 사용한다.
  path: string[] = this.titles[this.col].key.split('.');

  constructor() { }

  ngOnInit() {
    // 최초 타이틀들 중에서 마지막 항목을 정렬기준으로 선택한다.
    // 이는 테이블마다 다르게 선택해서 적용할 수 있다.
    // 제어 변수 선언 시 초기 값을 할당했다면 다음 줄 코드는 생략할 수 있다.
    this.changeSortStandard(this.titles.length - 1);
  }

  changeSortStandard(idx: number) {
    this.col = idx;
    // 정렬기준 문자열을 잘라서 배열을 얻는다. 이는 정렬 파이프에서 쉽게 처리하기 위한 사전작업이다.
    this.path = this.titles[this.col].key.split('.');
    // 정렬 방향을 바꾼다.
    this.order = this.order * (-1);
    console.log(this.path, this.order);
    // a 태그의 href 속성을 사용하는 경우 화면이 갱신이 되는 것을 막을 수 있다.
    return false;
  }

}
```

**company.component.scss**

```scss
table.outline {
  border: 1px solid silver;

  thead.thead-dark {
    border: 1px solid black;
  }
}
```

SASS 문법을 써보니 보기에 좋군요.

**company.component.html**

```html
<table class="table table-striped table-hover outline">
  <colgroup>
    <col style="width: 30%" />
    <col style="width: 30%" />
    <col style="width: 20%" />
    <col style="width: 20%" />
  </colgroup>
  <thead class="thead-dark">
    <tr>
      <th *ngFor="let item of titles; let i=index" (click)="changeSortStandard(i)">
        {{item.title}}
        <ng-container *ngIf="this.col == i">
          <i class="fas" [ngClass]="this.order == 1 ? 'fa-arrow-up' : 'fa-arrow-down'"></i>
        </ng-container>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let company of companies | sort:path:order">
      <td>{{ company.company }}</td>
      <td>{{ company.domain }}</td>
      <td>{{ company.info.country }}</td>
      <td>{{ company.info.cash }}</td>
    </tr>
  </tbody>
</table>

<h3>path</h3>
<pre>{{path | json}}</pre>

<h3>order</h3>
<pre>{{order | json}}</pre>
```

`<ng-template>` 대신 `<ng-container>`를 사용하면 친숙한 문법으로 코드를 작성할 수 있어서 좋습니다.

## 파이프의 재사용성 확보

```bash
$ ng g m share --module=app
$ ng g p share/pipe/orderBy --module=share --export=true
```

```bash
$ ng g c page/memo
$ ng g class model/memo
```
