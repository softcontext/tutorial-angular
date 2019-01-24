import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation3',
  templateUrl: './animation3.component.html',
  styleUrls: ['./animation3.component.scss'],
  animations: [
    trigger('circleEffect', [
      state('initial', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('final', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('final=>initial', [animate('1000ms')]),
      transition('initial=>final', [animate('1500ms')])
    ])
  ]
})
export class Animation3Component implements OnInit {
  currentState = 'initial';
  circleStyle = {
    backgroundColor: 'green', // background-color
    borderRadius: '50%', // border-radius
    width: '100px',
    height: '100px',
    margin: '1em',
  };

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  constructor() { }

  ngOnInit() { }

}
