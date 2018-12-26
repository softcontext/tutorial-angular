import { Component, OnInit, Input, ContentChild, ElementRef } from '@angular/core';
import {
  OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-child-b',
  templateUrl: './child-b.component.html',
  styleUrls: ['./child-b.component.scss']
})
export class ChildBComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {

  constructor() {
    console.log("    B0. ChildAComponent()");
  }

  num: number;

  @Input('num')
  set $num(num: number) {
    console.log("    @Input('num')")
    console.log("    num =", num);
    this.num = num;
  }

  h4: ElementRef;

  // 부모가 이 컴포넌트의 자식으로 지정한 엘리먼트들 중에서 화면참조 문자열로
  // 참조값을 획득할 수 있으면 대상은 네이티브 엘리먼트를 래핑한 객체다.
  @ContentChild('title')
  set h4ElementRef(elementRef: ElementRef) {
    console.log("    @ContentChild('title')");
    console.log('    elementRef:', elementRef.nativeElement.innerText); // 사용 가능
    this.h4 = elementRef;
  }

  // 조건 기동: 외부로부터 파라미터를 받을 때만 기동한다.
  ngOnChanges(changes: SimpleChanges) {
    console.log("    B1. ngOnChanges");

    for (let propName in changes) {
      let change = changes[propName];
      let currentValue = JSON.stringify(change.currentValue);
      let previousValue = JSON.stringify(change.previousValue);
      console.log(`    ${propName}: currentValue = ${currentValue}, previousValue = ${previousValue}`);
    }
  }

  // 한 번만 기동한다.
  ngOnInit() {
    console.log("    B2. ngOnInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngDoCheck() {
    console.log("    B3. ngDoCheck");
  }

  // 한 번만 기동한다.
  ngAfterContentInit() {
    console.log("    B4. ngAfterContentInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterContentChecked() {
    console.log("    B5. ngAfterContentChecked");
  }

  // 한 번만 기동한다.
  ngAfterViewInit() {
    console.log("    B6. ngAfterViewInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterViewChecked() {
    console.log("    B7. ngAfterViewChecked");
  }

  // 한 번만 기동한다.
  ngOnDestroy() {
    console.log("    B8. ngOnDestroy");
  }

}
