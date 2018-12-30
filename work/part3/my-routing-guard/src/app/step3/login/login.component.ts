import { Component, OnInit } from '@angular/core';
import { MemberAuthService } from '../member-auth.service';
import { Router, ActivatedRoute } from '@angular/router';

export class SignIn {
  id: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  returnUrl: string;
  signin: SignIn = {
    id: null,
    password: null
  };

  constructor(
    private memberAuthService: MemberAuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.errorMessage = null;

    let isMember = this.memberAuthService.auth(this.signin.id, this.signin.password);

    this.signin = {
      id: null,
      password: null
    };

    if (isMember) {
      // 로그인 성공 시 작업
      this.router.navigate([this.returnUrl]);
    } else {
      // 로그인 실패 시 작업
      this.errorMessage = 'ID or Password does not match.';
    }
  }
}
