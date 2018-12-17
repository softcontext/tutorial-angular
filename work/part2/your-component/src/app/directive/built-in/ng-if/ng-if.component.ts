import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.scss']
})
export class NgIfComponent implements OnInit {
  genderSelected = 2;
  gender = [
    { code: 1, text: 'Male' },
    { code: 2, text: 'Female' },
  ];
  methods: Array<{ code, text, checked }> = [
    { code: 10, text: 'Walking', checked: false },
    { code: 11, text: 'Car', checked: false },
    { code: 12, text: 'Bus', checked: false },
    { code: 13, text: 'Train', checked: false }
  ];

  constructor() { }

  ngOnInit() { }

  get getCheckedMethods() {
    return this.methods.filter(item => item.checked).map(item => item.text).join(',');
  }

  get isMethodChecked() {
    return this.methods.findIndex(item => item.checked) >= 0;
  }

}
