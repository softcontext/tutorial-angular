import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

export function validEmail(control: AbstractControl): ValidationErrors | null {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (control.value) {
    if (!regex.test(control.value.toLowerCase())) {
      // 작성규칙에 위반되면 위반정보를 담은 객체를 리턴한다.
      return {
        validEmail: {
          isError: true,
          text: 'Email Syntax Error'
        }
      };
    }
  }

  // 규칙에 맞게 작성되었다면 null을 리턴한다.
  return null;
}

// Validator 인터페이스를 구현한 클래스 문법으로 작성하면
// 'new EmailRule().validate' 코드처럼 사용해야하기 때문에 불편합니다.
// 위 validEmail 함수를 직접 사용하는 것이 더 편리합니다.
export class EmailRule implements Validator {
  constructor() {
    console.log('EmailRule() as Validator');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return validEmail(control);
  }
}
