import { Component, OnInit } from '@angular/core';
import {
  OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy
} from '@angular/core';

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
