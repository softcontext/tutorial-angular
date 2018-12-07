import { Component, OnInit } from '@angular/core';

export class Book {
  public id: number;
  public title: string;
  public author: string;
  constructor(id: number, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book> = [];

  constructor() { }

  ngOnInit() {
    this.books.push(new Book(1, 'Google', 'Chris'));
    this.books.push(new Book(2, 'Angular', 'John'));
    this.books.push(new Book(3, 'Ionic', 'Iaan'));
  }
}
