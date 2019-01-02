import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// NG_VALIDATORS:
// InjectionToken을 사용하여 앵귤러의 밸리데이터 콜렉션에 커스텀 밸리데이터를 추가합니다.
@Directive({
  selector: '[passwordRule]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordRuleDirective, multi: true }]
})
export class PasswordRuleDirective implements Validator {
  constructor() {
    console.log('PasswordRuleDirective()');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.notContainSpecialCharacter(control);
  }

  notContainSpecialCharacter(control: AbstractControl) {
    if (control.value) {
      let isContainSpecialCharacter = /\W+/.test(control.value);
      console.log('isContainSpecialCharacter = ' + isContainSpecialCharacter);
      if (!isContainSpecialCharacter) {
        // 작성규칙에 위반되면 위반정보를 담은 객체를 리턴한다.
        return {
          notContainSpecialCharacter: {
            custom: true,
            regex: '/\W+/'
          }
        };
      }
    }

    // 규칙에 맞게 작성되었다면 null을 리턴한다.
    return null;
  }
}
