import { Component, OnInit, Input } from '@angular/core';
import {
  OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss']
})
export class ChildAComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {

  constructor() {
    console.log("    A0. ChildAComponent()");
  }

  @Input('key') key: number;

  name: string;

  @Input('name')
  set $name(name: string) {
    console.log("    @Input('name')")
    console.log("    name =", name);
    this.name = name;
  }

  // 조건 기동: 외부로부터 파라미터를 받을 때만 기동한다.
  ngOnChanges(changes: SimpleChanges) {
    console.log("    A1. ngOnChanges");

    for (let propName in changes) {
      let change = changes[propName];
      let currentValue = JSON.stringify(change.currentValue);
      let previousValue = JSON.stringify(change.previousValue);
      console.log(`    ${propName}: currentValue = ${currentValue}, previousValue = ${previousValue}`);
    }
  }

  // 한 번만 기동한다.
  ngOnInit() {
    console.log("    A2. ngOnInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngDoCheck() {
    console.log("    A3. ngDoCheck");
  }

  // 한 번만 기동한다.
  ngAfterContentInit() {
    console.log("    A4. ngAfterContentInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterContentChecked() {
    console.log("    A5. ngAfterContentChecked");
  }

  // 한 번만 기동한다.
  ngAfterViewInit() {
    console.log("    A6. ngAfterViewInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngAfterViewChecked() {
    console.log("    A7. ngAfterViewChecked");
  }

  // 한 번만 기동한다.
  ngOnDestroy() {
    console.log("    A8. ngOnDestroy");
  }

}
