import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

interface Header {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  header: Header;
  userid: string;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    console.log('DashboardComponent # ngOnInit():', localStorage.getItem('jwt_token'));

    // 라우팅 설정에서 할당한 정적 데이터를 취득
    this.header = this.route.snapshot.data as Header;

    // 토큰에서 사용자 아이디를 취득
    this.userid = this.authService.getUserid();

    // 토큰을 서버에 보내면서 사용자 정보를 받아온다.
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  signout() {
    this.authService.signout();
    this.router.navigate(['signin']);
  }

}
