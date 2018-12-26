import {
  Directive, Input,
  OnChanges, OnInit, DoCheck, OnDestroy,
  SimpleChanges
} from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges, OnInit, DoCheck, OnDestroy {
  @Input('highlight') color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    console.log("Directive 0. HighlightDirective()");
  }

  // 조건 기동: 외부로부터 파라미터를 받을 때만 기동한다.
  ngOnChanges(changes: SimpleChanges) {
    console.log("Directive 1. ngOnChanges");

    for (let propName in changes) {
      let change = changes[propName];
      let currentValue = JSON.stringify(change.currentValue);
      let previousValue = JSON.stringify(change.previousValue);
      console.log(`${propName}: currentValue = ${currentValue}, previousValue = ${previousValue}`);
    }
  }

  // 한 번만 기동한다.
  ngOnInit() {
    console.log("Directive 2. ngOnInit");
  }

  // 변화가 있을 때마다 기동한다.
  ngDoCheck() {
    console.log("Directive 3. ngDoCheck");
  }

  // 한 번만 기동한다.
  ngOnDestroy() {
    console.log("Directive 4. ngOnDestroy");
  }

  @HostListener('mouseenter')
  set() {
    this.highlight(this.color || 'yellow');
  }

  @HostListener('mouseleave')
  reset() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', color);
  }

}
