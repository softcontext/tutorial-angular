import { Component, OnInit, Input } from '@angular/core';
// import { DatePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
  // common 모듈의 파이프를 컴포넌트에게 주입하려면 명시적으로 providers 설정을 해야 한다.
  // providers: [DatePipe, UpperCasePipe, TitleCasePipe]
})
export class MemoComponent implements OnInit {
  @Input('data') data: any[]; // 바디 데이터
  @Input('titles') titles: any[]; // 제목, 넓이, 사용 객체 속성이름, 정렬지원 칼럼여부

  col: number = 0; // 정렬 기준 칼럼
  order: number = 1; // 정렬 방향
  path: string[]; // 정렬 데이터의 접근 경로

  constructor(
    // private datePipe: DatePipe,
    // private upperCasePipe: UpperCasePipe,
    // private titleCasePipe: TitleCasePipe
  ) {

  }

  ngOnInit() {
    // 바디 로우의 칼럼에 표시하는 데이터마다 적용하는 파이프 정보를
    // 사용자로부터 받아서 적용하기 위해서 장황한 코드가 필요하다.
    // 빌트인 파이프는 어떻게든 처리할 수 있으나
    // 사용자가 추가한 커스텀 파이프를 처리할 적절한 방법이 없다.
    // this.data.forEach(row => { // row
    //   this.titles.forEach(title => { // column
    //     if (title.pipes) {
    //       title.pipes.forEach(pipe => {
    //         if (pipe.includes('date')) {
    //           const params = pipe.split(':');
    //           row[title.path] = this.datePipe.transform(row[title.path], params[1]);
    //         } else if (pipe.includes('uppercase')) {
    //           row[title.path] = this.upperCasePipe.transform(row[title.path]);
    //         } else if (pipe.includes('titlecase')) {
    //           row[title.path] = this.titleCasePipe.transform(row[title.path]);
    //         }
    //       });
    //     }
    //   });
    // });

    this.path = this.titles[this.col].path.split('.');
  }

  changeSortStandard(idx: number) {
    this.col = idx;
    this.path = this.titles[this.col].path.split('.');
    this.order = this.order * (-1);
  }

}
