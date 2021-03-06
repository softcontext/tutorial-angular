import { Component } from '@angular/core';
import { FooLibService } from 'foo-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foo-tester';
  desc;

  constructor(private fooLibService: FooLibService) {
    this.desc = this.fooLibService.getData();
  }
}
