import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  isShow: boolean = true;

  constructor() { }

  ngOnInit() { }

  signin(email, password) {
    alert(email + ', ' + password);
  }

}
