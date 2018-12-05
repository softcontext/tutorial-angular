import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../books.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input('book') book: Book;

  constructor() { }

  ngOnInit() { }
}
