import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'al-another-lib',
  template: `
    <p>
      another-lib works!
    </p>
  `,
  styles: []
})
export class AnotherLibComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
