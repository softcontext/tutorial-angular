import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input('book') book: Book;
  @Input('btnText') btnText: string;
  @Output('selectedBookId') eventEmitter = new EventEmitter<any>();

  constructor() {
    console.log('ChildComponent()');
  }

  ngOnInit() { }

  select(id: number) {
    this.eventEmitter.emit({ id, direction: this.btnText });
  }
}
