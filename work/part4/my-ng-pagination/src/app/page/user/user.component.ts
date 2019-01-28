import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserHttpService, User } from 'src/app/http/user-http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  errorMessage = undefined;
  paths: Array<{ active, link, query, text }>;
  selectedRow: number = 3;
  rows: number[] = [3, 5, 10, 20, 30];

  constructor(
    private userHttpService: UserHttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.router.url.split('?')[0])
    /**
     * 초기값
     */
    let page = 1;
    let size = this.selectedRow;
    let bsize = 2;

    if (this.route.snapshot.queryParams.page) {
      page = +this.route.snapshot.queryParams.page;
    }
    if (this.route.snapshot.queryParamMap.get('size')) {
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    if (this.route.snapshot.queryParamMap.get('bsize')) {
      bsize = +this.route.snapshot.queryParamMap.get('bsize');
    }
    this.findAll(page, size, bsize);
  }

  findAll(page, size, bsize) {
    this.userHttpService.findAll(page, size, bsize)
      .then(data => {
        this.users = data.users;
        this.paths = data.pager.paths;
        console.log(this.paths);
      }).catch(error => {
        console.log(error);
        this.errorMessage = error;
      });
  }

  changePage(query) {
    if (this.selectedRow !== query.size) {
      query.size = this.selectedRow;
    }
    this.findAll(query.page, query.size, query.bsize);
    return false;
  }

  changeSize() {
    const path = this.paths.find((item) => item.active ? true : false);
    this.findAll(path.query.page, this.selectedRow, path.query.bsize);
    return false;
  }
}
