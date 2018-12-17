import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styleUrls: ['./ng-class.component.scss']
})
export class NgClassComponent implements OnInit {
  isActive: boolean = false;
  strClassName: string = "active";
  strClassRed: string = 'red';
  strClassBlue: string = 'blue';
  methods: Array<object> = [
    { id: 1, text: 'Walking', klass: 'active', message: 'Walking is good for your health!' },
    { id: 2, text: 'Car', klass: 'red', message: 'It is fast by Car!' },
    { id: 3, text: 'Bus', klass: 'blue', message: 'You save the earth as using Bus!' },
    { id: 4, text: 'Train', klass: 'orange', message: 'Train is always fun!' }
  ];

  constructor() { }

  ngOnInit() { }

  changeMethod() {
    let holder = this.methods.shift();
    this.methods.push(holder);
  }

}
