import { Directive, HostListener, HostBinding, ElementRef, Renderer2, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[menuDropdown]'
})
export class MenuDropdownDirective {
  linkGroup = ['about', 'etc'];
  @Input('menuDropdown') here: ElementRef;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {

  }

  @HostListener('click')
  close() {
    console.log('MenuDropdownDirective # click');
    console.log(this.here instanceof ElementRef);

    let url = this.router.url.replace('/', '');
    console.log(this.linkGroup.includes(url));
    if (this.linkGroup.includes(url)) {
        // this.renderer.addClass(this.elementRef.nativeElement, 'show');
        // this.renderer.addClass(this.here.nativeElement, 'show');
    }
  }
}
