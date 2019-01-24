import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation4',
  templateUrl: './animation4.component.html',
  styleUrls: ['./animation4.component.scss'],
  /*
    void: state when the HTML element isn't attached to a view
    *: matches any animation state
   */
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('flyInOut', [
      // state('in', style({
      //   transform: 'translateX(0)'
      // })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    /*
      :enter is aliases for the void => *
      :leave is aliases for the * => void transitions

      - `animate(500)` : Duration is 500 milliseconds.
      - `animate("1s")` : Duration is 1000 milliseconds.
      - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
      - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
      - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10

      Easing functions >> https://easings.net/ko
     */
    trigger('enterLeave', [
      // state('in', style({
      //   transform: 'translateX(0)'
      // })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class Animation4Component implements OnInit {
  list = [];

  addItem() {
    this.list.push('Item ' + (this.list.length + 1));
  }

  removeItem() {
    if (this.list.length > 0) {
      this.list.pop();
    }
  }

  constructor() { }

  ngOnInit() { }

}
