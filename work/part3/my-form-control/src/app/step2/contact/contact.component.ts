import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// index.ts, index.d.ts 파일은 생략이 가능합니다.
import { PersonalData, ContactRequest } from '../model/';
import { cloneDeep } from 'lodash/fp';
import { EmailRule, validEmail } from '../validator/email-rule';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  countries: string[] = ['Korea', 'USA', 'Germany', 'Italy', 'France'];
  requestTypes: string[] = ['Claim', 'Feedback', 'Help Request'];
  contactForm: FormGroup;
  initValue: ContactRequest;

  constructor(private formBuilder: FormBuilder) {
    // this.contactForm = this.createFormGroup();

    // 위 방법보다 아래 방법을 권장합니다.
    this.contactForm = this.createFormGroupWithBuilder();

    // 초기값으로 리셋하기 위해서 저장해 놓는다.
    this.initValue = this.contactForm.value;
  }

  ngOnInit() { }

  createFormGroup() {
    // ContactRequest 구조대로 FormGroup, FormControl을 구성한다.
    // class ContactRequest에 대응하는 FormGroup을 만든다.
    return new FormGroup({
      // class PersonalData에 대응하는 FormGroup을 만든다.
      personalData: new FormGroup({
        // 입력 엘리먼트에 대응하는 FormControl을 만든다.
        // 파라미터 #1 = formState: any = null,
        // 파라미터 #2 = validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          // new EmailRule().validate,
          validEmail
        ])),
        mobile: new FormControl('', Validators.required),
        country: new FormControl('Korea')
      }),
      // 입력 엘리먼트에 대응하는 FormControl을 만든다.
      requestType: new FormControl('Feedback'),
      text: new FormControl("It's very good!", Validators.required)
    });
  }

  createFormGroupWithBuilder() {
    // FormBuilder를 사용하면 FormGroup, FormControl 선언을 생략하고
    // 사용할 수 있어서 편리하다.
    // 객체 리터럴 대신 new PersonalData() 처럼 처리할 수 있으나
    // 그렇게 되면 초기 값은 없는 빈 객체가 된다.
    // 초기 값을 명시적으로 할당하는 것이 좋으므로 객체 리터럴로
    // 작성하는 것을 권장합니다.
    return this.formBuilder
      .group({
        personalData: this.formBuilder
          .group({
            email: ['', Validators.compose([
              Validators.required,
              Validators.minLength(5),
              // new EmailRule().validate,
              validEmail
            ])],
            mobile: ['', Validators.required],
            country: 'Korea'
          }),
        requestType: 'Feedback',
        text: ["It's very good!", Validators.required]
      });
  }

  onSubmit() {
    console.log(this.contactForm);

    // Object.assign() 함수는 Shallow Copy 함수:
    // 열거할 수 있는 Source 객체의 속성들만 Target 객체로 복사 됩니다.
    // 속성의 값을 복사하므로 Source 객체의 속성값이 객체에 대한 참조 값이면 참조를 복사합니다.
    // 따라서 깊은 복사는 다른 방법을 사용해야 합니다.
    // const result: ContactRequest = Object.assign({}, this.contactForm.value);
    // 깊은 복사를 위해서 수동적으로 다음 코드를 추가해야 합니다.
    // result.personalData = Object.assign({}, result.personalData);

    // 대체 방법으로 lodash의 cloneDeep() 함수로 깊은 복사를 할 수 있습니다.
    const result: ContactRequest = cloneDeep(this.contactForm.value);
    console.log(result === this.contactForm.value); // false

    // TODO: 데이터를 원격서버로 전송하는 로직과 연동한다.
    console.log(JSON.stringify(result));
    // 결과 예:
    // {
    //   "personalData":{
    //     "email":"softcontext@gmail.com",
    //     "mobile":"11",
    //     "country":"Korea"
    //   },
    //   "requestType":"Feedback",
    //   "text":"It's very good!"
    // }
  }

  revert() {
    // Reactive Forms 방식을 사용하면
    // reset() 함수를 사용하여 쉽게 초기 상태로 되돌릴 수 있습니다.
    this.contactForm.reset(this.initValue);
  }

  // 폼 컨트롤에 쉽게 접근하기 위한 편의성 메소드
  get C() { return this.contactForm.controls; }

  get P() { return this.contactForm.get('personalData')['controls']; }
}
