import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('HighlightDirective()');
  }

  @HostListener('mouseenter')
  set() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '1.5rem');
  }

  @HostListener('mouseleave')
  reset() {
    this.renderer.removeStyle(this.el.nativeElement, 'font-size');
  }

}
