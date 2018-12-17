import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  set() {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'orange');
    if (this.el.nativeElement.nodeName === 'P') {
      this.renderer.addClass(this.el.nativeElement, 'big');
    }
  }

  @HostListener('mouseleave')
  reset() {
    this.renderer.removeStyle(this.el.nativeElement, 'background');
    if (this.el.nativeElement.nodeName === 'P') {
      this.renderer.removeClass(this.el.nativeElement, 'big');
    }
  }

}
