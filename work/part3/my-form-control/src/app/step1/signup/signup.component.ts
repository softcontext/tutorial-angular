import { Component, OnInit } from '@angular/core';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: any;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup/SignupComponent()');
  }

  ngOnInit() {
    this.signup.question = this.questions[this.questionSelected];
  }

  get questionSelected() {
    return this._questionSelected;
  }

  set questionSelected(index) {
    this._questionSelected = index;
    // this._questionSelected 값이 변경되면 이에 의존하는
    // this.signup.question 값도 변경해야 한다.
    this.signup.question = this.questions[this._questionSelected];
  }
}
