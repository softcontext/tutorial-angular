import { Component, OnInit } from '@angular/core';

export interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Array<Contact> = [
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
    { firstName: 'John', lastName: 'Doe', phone: '1234', 
      email: 'john@doe.com', address: 'Seoul' },
  ];

  constructor() { }

  ngOnInit() { }

}
