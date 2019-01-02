import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string = '';
  isProceeding: boolean = false;
  signup: Signup = new Signup();
  _questionSelected: number = 0;
  questions: string[] = [
    'What was the name of your elementary school?',
    'What is the first name of the person you first kissed?'
  ];

  constructor() {
    console.log('signup2/SignupComponent()');
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

  submit(f: NgForm) {
    this.errorMessage = '';
    this.isProceeding = true;

    console.log(f.value);
    // {email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    console.log(f.controls)
    // {email: FormControl, password: FormControl, password2: FormControl,
    // answer: FormControl, readTerms: FormControl}

    if (f.invalid) {
      if (f.controls.email.errors && f.controls.email.errors.required) {
        this.errorMessage += '<small class="text-primary">Email Required.</small><br>';
      }
      if (f.controls.password.errors && f.controls.password.errors.required) {
        this.errorMessage += '<small class="text-success">Passowrd Required.</small><br>';
      }
      if (f.controls.password2.errors && f.controls.password2.errors.required) {
        this.errorMessage += '<small class="text-info">Confirm Passowrd Required.</small><br>';
      }
      if (this.isNotPasswordMatch()) {
        this.errorMessage += '<small class="text-danger">Password is not match</small><br>';
      }
      if (f.controls.answer.errors && f.controls.answer.errors.required) {
        this.errorMessage += '<small class="text-dark">Security Answer Required.</small><br>';
      }
      if (f.controls.readTerms.errors && f.controls.readTerms.errors.required) {
        this.errorMessage += '<small class="text-muted">You must agree to the terms.</small><br>';
      }
      setTimeout(() => this.isProceeding = false, 1500);
      return false;
    }

    console.log(this.signup);
    // {question: "What was the name of your elementary school?",
    // email: "softcontext@gmail.com",
    // password: "11111", password2: "22222",
    // answer: "some", readTerms: true}

    this.isProceeding = false;
    alert('All green!');
  }

  isNotPasswordMatch() {
    return !(this.signup.password === this.signup.password2);
  }

}
