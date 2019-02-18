import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: string;
  TOKEN_NAME = 'jwt_token';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // FormBuilder를 사용하여 FormControl들을 가진 FormGroup을 만든다.
    this.signinForm = this.fb.group({
      userid: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z0-9]/),
        Validators.minLength(4),
        Validators.maxLength(10)
      ]]
    });
  }

  signin() {
    console.log('[payload]', this.signinForm.value);

    this.auth.signin(this.signinForm.value)
      .subscribe(
        () => this.router.navigate(['dashboard']),
        (res) => {
          console.log('ERROR:', res);
          this.message = res.error.message;
        }
      );
  }

  // 템플릿에서 데이터 작성 안내 메시지를 보여주어야 하는 경우, 짧게 코드를 작성하기 위해서 게터를 사용한다.
  get userid() {
    return this.signinForm.get('userid').touched ? this.signinForm.get('userid') : false;
  }

  get password() {
    return this.signinForm.get('password').touched ? this.signinForm.get('password') : false;
  }

  kakaoLogin() {
    // https://stackoverflow.com/questions/49887018/angular-express-passport-authenticating-with-google-no-access-control-allow
    window.open('http://localhost:3000/auth/kakao', "mywindow", "location=1,status=1,scrollbars=1,width=800,height=600");
    window.addEventListener('message', (message) => {
      console.log(message);

      localStorage.setItem(this.TOKEN_NAME, message.data.token);
      const userid = this.auth.getUserid();

      console.log('userid =', userid);
      const token = this.auth.getToken();

      console.log('token =',token)
      console.log('this.auth.isTokenExpired =', this.auth.isTokenExpired(token))

      this.router.navigate(['dashboard']);
    }, { once : true });


    // XXX: not use
    // this.auth.kakaoLogin()
    //   .subscribe(
    //     () => this.router.navigate(['dashboard']),
    //     (res) => {
    //       console.log('ERROR:', res);
    //       this.message = res.error.message;
    //     }
    //   );
  }

}
