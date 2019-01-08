import { Component, OnInit } from '@angular/core';
import { Memo } from './model/memo';
import { DatePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe, UpperCasePipe, TitleCasePipe]
})
export class AppComponent implements OnInit {
  memos: Memo[] = [
    new Memo('angular', new Date("12/12/2018")),
    new Memo('dart', new Date("12/13/2018")),
    new Memo('go', new Date("12/11/2018")),
    new Memo('flutter', new Date("12/16/2018")),
  ];

  //  데이터 구조 = {제목, 사용속성 접근경로, 넓이, 정렬 제공여부, 적용할 파이프 배열}
  // titles = [
  //   { title: 'Date', path: 'date', percent: 60, sortable: true, pipes: ['date:"yyy.MM.dd"'] },
  //   { title: 'Memo', path: 'text', percent: 40, sortable: false, pipes: ['uppercase'] },
  // ];

  titles = [
    { title: 'Date', path: 'date', percent: 60, sortable: true },
    { title: 'Memo', path: 'text', percent: 40, sortable: false },
  ];

  constructor(
    private datePipe: DatePipe,
    private upperCasePipe: UpperCasePipe,
    private titleCasePipe: TitleCasePipe
  ) {

  }

  ngOnInit() {
    // 테이블 컴포넌트 재 사용성을 극대화하기 위해서
    // 반복적인 코드를 숨기고 사용자의 설정을 최소화하고 싶다.
    // 그러나 파이프 적용은 현실적으로 불가하다.
    // 빌트인 파이프는 어떻게든 처리할 수 있으나
    // 사용자가 추가한 커스텀 파이프를 처리할 적절한 방법이 없다.
    // 테이블 컴포넌트가 직접 처리하기 어려운 엘리먼트들을
    // 사용자가 투영으로 전달하는 방법도 적절하지 못하다.
    // 결국 데이터의 파이프 적용은 사용자가 수행한 후
    // 데이터를 테이블 컴포넌트에게 넘기는 방법을 선택했다.
    this.memos.forEach(memo => {
      memo.text = this.upperCasePipe.transform(memo.text);
      // Date 형의 프로퍼티에 string 형 값을 할당하는 것이 옳은가?
      // 타입스크립트를 쓰는 한 옳지 않다.
      // 그렇다면 Date 형 칼럼을 string 형으로 보관하는 프로퍼티를
      // 하나 추가해야 하는가? 이는 순수한 자료구조를 깨는 행위라 할 수 있다.
      // 마땅한 방법이 떠오르지 않아서
      // date: Date; 선언을 date: Date | string; 선언으로 변경하여 해결했다.
      memo.date = this.datePipe.transform(memo.date, 'yyy.MM.dd');
    });
  }
}
