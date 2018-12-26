import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy
} from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {

  constructor() {
    console.log("P0. ParentComponent()");
  }

  childA: ChildAComponent;

  @ViewChild(ChildAComponent)
  set childAComponent(childAComponent: ChildAComponent) {
    console.log("@ViewChild(ChildAComponent)");
    console.log('childAComponent.key:', childAComponent.key); // undefined, 사용 불가
    this.childA = childAComponent;
    // 화면이 초기화되고 나서야 자식 컴포넌트의 자원을 사용할 수 있기 때문에
    // setTimeout() 함수를 사용하여 코드수행을 늦출 필요가 있다.
    // 또는 ngAfterViewInit() 함수에 로직을 배치하면 된다.
    setTimeout(() => { console.log('setTimeout > childAComponent.key:', childAComponent.key); }, 0);
  }

  h4: ElementRef;

  @ViewChild('title')
  set h4ElementRef(elementRef: ElementRef) {
    console.log("@ViewChild('title')");
    console.log('elementRef:', elementRef.nativeElement.innerText); // 사용 가능
    this.h4 = elementRef;
    // 컴포넌트 자료형으로 획득한 대상은 바로 사용할 수 없으나
    // 화면참조로 획득한 대상은 바로 이용할 수 있다.
  }

  // 조건 기동: 외부로부터 파라미터를 받을 때만 기동한다.
  ngOnChanges(changes: SimpleChanges) {
    console.log("P1. ngOnChanges");

    for (let propName in changes) {
      let change = changes[propName];
      let currentValue = JSON.stringify(change.currentValue);
      let previousValue = JSON.stringify(change.previousValue);
      console.log(`${propName}: currentValue = ${currentValue}, previousValue = ${previousValue}`);
    }
  }

  // 한 번만 기동한다.
  ngOnInit() {
    console.log("P2. ngOnInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngDoCheck() {
    console.log("P3. ngDoCheck");
  }

  // 한 번만 기동한다.
  ngAfterContentInit() {
    console.log("P4. ngAfterContentInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterContentChecked() {
    console.log("P5. ngAfterContentChecked");
  }

  // 한 번만 기동한다.
  ngAfterViewInit() {
    console.log("P6. ngAfterViewInit");
    console.log('childAComponent.key:', this.childA.key); // 10, 사용 가능
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterViewChecked() {
    console.log("P7. ngAfterViewChecked");
  }

  // 한 번만 기동한다.
  ngOnDestroy() {
    console.log("P8. ngOnDestroy");
  }

}
