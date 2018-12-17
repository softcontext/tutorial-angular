import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  greeting: string = "Hello";
  message: string = "<em>World</em>!!!";

  constructor() { }

  ngOnInit() { }

}
