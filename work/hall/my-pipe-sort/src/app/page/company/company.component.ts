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
