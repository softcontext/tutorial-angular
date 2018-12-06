import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[menuDropdown]'
})
export class MenuDropdownDirective {
  private isOpen = false;

  @HostBinding('class.show')
  get opened() {
    return this.isOpen;
  }

  @HostListener('click')
  open() {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  close() {
    this.isOpen = false;
  }
}
