import { Component, OnInit } from '@angular/core';

export class Book {
  id: number;
  title: string;
  price: number;
  date: string;
  img: string;
}

// 전역 상수 객체를 제공하는 서비스를 통해 이용하는 것을 권장합니다.
const IMG_HOLDER_URL = 'https://via.placeholder.com/286x100';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  selectedBooks: Array<Book> = [];
  books: Array<Book> = [
    { id: 1, title: '타샤의 정원', price: 15800, date: '20170831', img: IMG_HOLDER_URL + '?text=A' },
    { id: 2, title: '언어의 온도', price: 13800, date: '20160801', img: IMG_HOLDER_URL + '?text=B' },
    { id: 3, title: '보노보노처럼 살다니 다행이야', price: 16000, date: '20170401', img: IMG_HOLDER_URL + '?text=C' },
    { id: 4, title: '청춘의 독서', price: 14800, date: '20170701', img: IMG_HOLDER_URL + '?text=D' },
    { id: 5, title: '나는 나로 살기로 했다', price: 13800, date: '20161101', img: IMG_HOLDER_URL + '?text=E' }
  ];

  constructor() { }

  ngOnInit() { }

  display(signal: any) {
    if (signal.direction === 'Up') {
      this.selectedBooks.push(this.books.find(book => book.id === signal.id));
      this.books.splice(this.books.findIndex(book => book.id === signal.id), 1);
    } else { // down
      this.books.push(this.selectedBooks.find(book => book.id === signal.id));
      this.selectedBooks.splice(this.selectedBooks.findIndex(book => book.id === signal.id), 1);
    }
  }

}
