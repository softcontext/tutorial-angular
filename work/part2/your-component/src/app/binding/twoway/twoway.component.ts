import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twoway',
  templateUrl: './twoway.component.html',
  styleUrls: ['./twoway.component.scss']
})
export class TwowayComponent implements OnInit {
  citySelected: string = "seoul";

  cities: Object[] = [
    { kor: "서울", eng: "seoul" },
    { kor: "대전", eng: "daejeon" },
    { kor: "대구", eng: "daegu" },
    { kor: "부산", eng: "pusan" }
  ];

  address: Array<Object> = [
    { kor: "서울", eng: "seoul", checked: false },
    { kor: "대전", eng: "daejeon", checked: false },
    { kor: "대구", eng: "daegu", checked: false },
    { kor: "부산", eng: "pusan", checked: true }
  ];

  constructor() { }

  ngOnInit() { }

  /**
   * 체크박스 클릭 시 배열안에 객체안에 존재하는 checked 값의 변경을
   * (click)="addr.checked=!addr.checked" 설정으로 적용했을 때
   * 화면에서 사용하는 자원은 참조 값이고 그 참조 값은 변하지 않았으므로
   * 앵귤러의 변경감지에서 변경된 대상으로 인식되지 못한다.
   *
   * 하지만, 위 설정 대신 (click)="checkedFilter(addr)" 처럼
   * 클래스 내 함수를 호출하는 방식으로 사용하면
   * 앵귤러의 변경감지에서 변경된 대상으로 인식된다.
   */
  checkedFilter(addr) {
    addr.checked = !addr.checked;
  }

}
