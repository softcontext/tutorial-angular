# 1 Page Website by Angular 7 and Bootstrap 4

부트스트랩 템플릿은 다음 사이트를 참고했습니다.

`from: https://medium.freecodecamp.org/learn-bootstrap-4-in-30-minute-by-building-a-landing-page-website-guide-for-beginners-f64e03833f33`

```bash
$ ng new company-template
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd company-template
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

**package.json**

```json
{
  "name": "company-template",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~7.1.0",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/router": "~7.1.0",
    "bootstrap": "^4.1.3",
    "core-js": "^2.5.4",
    "font-awesome": "^4.7.0",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.6",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "zone.js": "~0.8.26"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.11.0",
    "@angular/cli": "~7.1.1",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
    "@types/jasmine": "~2.8.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/jquery": "^3.3.27",
    "@types/node": "~8.9.4",
    "codelyzer": "~4.5.0",
    "jasmine-core": "~2.99.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~3.1.1",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~1.1.2",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.11.0",
    "typescript": "~3.1.6"
  }
}
```

**angular.json**

```json
"styles": [
  "./node_modules/font-awesome/css/font-awesome.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

**styles.scss**

```scss
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css?family=Raleway');
@import url('https://fonts.googleapis.com/css?family=Exo+2');

body {
  padding: 0;
  margin: 0;
  background: #f4f4f4;
}

h1 {
  font-family: "Raleway";
}

h2, h3, h4, h5, h6, html {
  font-family: "Roboto", "Raleway", "Exo+2";
}

a {
  font-family: "Exo+2";
}
```

컴포넌트를 생성합니다.

```bash
$ ng g c layout/navbar --module=app
$ ng g c layout/header --module=app
$ ng g c layout/about --module=app
$ ng g c layout/portfolio --module=app
$ ng g c layout/post --module=app
$ ng g c layout/team --module=app
$ ng g c layout/contact --module=app
```

**app.component.html**

```html
<app-navbar></app-navbar>
<app-header></app-header>
<app-about></app-about>
<app-portfolio></app-portfolio>
<app-post></app-post>
<app-team></app-team>
<app-contact></app-contact>
```

1 페이지 웹으로 `<router-outlet></router-outlet>`은 사용하지 않습니다.

`assets/images` 폴더 밑에 이미지 리소스를 배치합니다.

**navbar.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function() {
      // .header 클래스의 높이를 화면 높이로 지정합니다.
      $('.header').height($(window).height());

      // 네비바 앵커태그를 클릭하면 id로 대상을 찾아서 스크롤합니다.
      $(".navbar a").click(function() {
        var x = $("#" + $(this).data('value'));

        if (x.length) {
          $("body, html").animate({
            scrollTop: $("#" + $(this).data('value')).offset().top
          }, 1000)
        }
      })
    });
  }

}
```

**navbar.component.scss**

```scss
.navbar {
  background: #F97300;
}

.nav-link, .navbar-brand {
  color: #f4f4f4;
  cursor: pointer;
}

.nav-link {
  margin-right: 1em !important;
}

.nav-link:hover {
  background: #f4f4f4;
  color: #f97300;
  border-bottom: 3px solid #f4f4f4;
}

.navbar-collapse {
  justify-content: flex-end;
}

.nav-link.active {
  border-bottom: 3px solid #f4f4f4;
}
```

**navbar.component.html**

```html
<nav class="navbar navbar-expand-lg fixed-top" id="navbar">
  <a class="navbar-brand ml-4" href="#">Home</a>

  <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" 
  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
  aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav mr-4">
      <li class="nav-item">
        <a class="nav-link" data-value="home" href="#home" routerLinkActive="active">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-value="about" href="#about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " data-value="portfolio" href="#portfolio">Portfolio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " data-value="blog" href="#blog">Blog</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " data-value="team" href="#team">Team</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " data-value="contact" href="#contact">Contact</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Section
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" data-value="about" href="#about">About</a>
          <a class="dropdown-item" data-value="blog" href="#blog">Blog</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
```

**header.component.scss**

```scss
.header {
  position: relative;
  background-image: url("/assets/images/headerback.jpg");
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  left: 0;
  top: 0;
  background: rgba(244, 244, 244, 0.5);
}

.description {
  position: absolute;
  top: 30%;
  margin: auto;
  padding: 2em;
}

.description h1 {
  color: #F97300;
}

.description p {
  color: #666;
  font-size: 20px;
  width: 50%;
  line-height: 1.5;
}

.description button {
  border: 1px solid #F97300;
  background: #F97300;
  color: #fff;
}

.description button:hover {
  background: #fff;
  color: #F97300;
}
```

**header.component.html**

```html
<header class="header" id="home">
  <div class="overlay"></div>
  <div class="container">
    <div class="description ">
      <h1>
        Hello ,Welcome To My official Website
        <p>
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button class="btn btn-outline-secondary">See more</button>
      </h1>
    </div>
  </div>
</header>
```

**about.component.scss**

```scss
.about {
  margin: 4em 0;
  padding: 1em;
  position: relative;
}

.about h1 {
  color: #F97300;
  margin: 2em;
}

.about img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.about span {
  display: block;
  color: #888;
  position: absolute;
  left: 115px;
}

.about .desc {
  padding: 2em;
  border-left: 4px solid #10828C;
}

.about .desc h3 {
  color: #10828C;
}

.about .desc p {
  line-height: 2;
  color: #888;
}
```

**about.component.html**

```html
<div class="about" id="about">
  <div class="container">
    <h1 class="text-center">About Me</h1>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/team-3.jpg" class="img-fluid">
        <span class="text-justify">S.Web Developer</span>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 desc">
        <h3>Tzuyu</h3>
        <p>
          ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </div>
</div>
```

**portfolio.component.scss**

```scss
.portfolio {
  margin: 4em 0;
  position: relative;
}

.portfolio h1 {
  color: #F97300;
  margin: 2em;
}

.portfolio img {
  height: 15rem;
  width: 100%;
  margin: 1em;
}
```

**portfolio.component.html**

```html
<div class="portfolio" id="portfolio">
  <div class="container">
    <h1 class="text-center">Portfolio</h1>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/1.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/2.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/3.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/4.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/5.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/6.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/7.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/8.jpg" class="img-fluid">
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <img src="assets/images/portfolio/9.jpg" class="img-fluid">
      </div>
    </div>
  </div>
</div>
```

**post.component.scss**

```scss
.blog {
  margin: 4em 0;
  position: relative;
}

.blog h1 {
  color: #F97300;
  margin: 2em;
}

.blog .card {
  box-shadow: 0 0 20px #ccc;
}

.blog .card img {
  width: 100%;
  height: 12em;
}

.blog .card-title {
  color: #F97300;
}

.blog .card-body {
  padding: 1em;
}
```

**post.component.html**

```html
<div class="blog" id="blog">
  <div class="container">
    <h1 class="text-center">Blog</h1>
    <div class="row">
      <div class="col-md-4 col-lg-4 col-sm-12">
        <div class="card">
          <div class="card-img">
            <img src="assets/images/posts/polit.jpg" class="img-fluid">
          </div>
          <div class="card-body">
            <h4 class="card-title">Post Title</h4>
            <p class="card-text">
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="card-footer">
            <a href="" class="card-link">Read more</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-sm-12">
        <div class="card">
          <div class="card-img">
            <img src="assets/images/posts/images.jpg" class="img-fluid">
          </div>
          <div class="card-body">
            <h4 class="card-title">Post Title</h4>
            <p class="card-text">
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="card-footer">
            <a href="" class="card-link">Read more</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-sm-12">
        <div class="card">
          <div class="card-img">
            <img src="assets/images/posts/imag2.jpg" class="img-fluid">
          </div>
          <div class="card-body">
            <h4 class="card-title">Post Title</h4>
            <p class="card-text">
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="card-footer">
            <a href="" class="card-link">Read more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**team.component.scss**

```scss
@media (max-width: 768px) {
  .team .item img {
    width: 100%;
  }
}

.team {
  margin: 4em 0;
  position: relative;
}

.team h1 {
  color: #F97300;
  margin: 2em;
}

.team .item {
  position: relative;
  overflow: hidden;
}

.team .des {
  background: #F97300;
  color: #fff;
  text-align: center;
  border-top-right-radius: 93%;
  transition: 0.3s ease-in-out;
  position: absolute;
  width: 88%;
  bottom: 24px;
}

.team .item:hover .des {
  height: 100%;
  background: #f973007d;
  position: absolute;
  width: 89%;
  padding: 5em;
  top: 0;
  border-top-right-radius: 0;
}
```

**team.component.html**

```html
<div class="team" id="team">
  <div class="container">
    <h1 class="text-center">Our Team</h1>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-2.jpg" class="img-fluid" alt="team">
        <div class="des">
          Tzuyu
        </div>
        <span class="text-muted">Manager</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-3.jpg" class="img-fluid" alt="team">
        <div class="des">
          Chou
        </div>
        <span class="text-muted">S.enginner</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-2.jpg" class="img-fluid" alt="team">
        <div class="des">
          Tzuyu
        </div>
        <span class="text-muted">Front End Developer</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-3.jpg" class="img-fluid" alt="team">
        <div class="des">
          Chou
        </div>
        <span class="text-muted">Team Manger</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-2.jpg" class="img-fluid" alt="team">
        <div class="des">
          Chou
        </div>
        <span class="text-muted">Manager</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-3.jpg" class="img-fluid" alt="team">
        <div class="des">
          Tzuyu
        </div>
        <span class="text-muted">S.enginner</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-2.jpg" class="img-fluid" alt="team">
        <div class="des">
          Chou
        </div>
        <span class="text-muted">Front End Developer</span>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 item">
        <img src="assets/images/team-3.jpg" class="img-fluid" alt="team">
        <div class="des">
          Tzuyu
        </div>
        <span class="text-muted">Team Manger</span>
      </div>
    </div>
  </div>
</div>
```

**contact.component.scss**

```scss
.contact-form {
  margin: 6em 0;
  position: relative;
}

.contact-form h1 {
  padding: 2em 1px;
  color: #F97300;
}

.contact-form .right {
  max-width: 600px;
}

.contact-form .right .btn-secondary {
  background: #F97300;
  color: #fff;
  border: 0;
}

.contact-form .right .form-control::placeholder {
  color: #888;
  font-size: 16px;
}

.contact-form button:hover {
  background: #fff;
  color: #F97300;
}

.contact-form button {
  border: 1px solid #F97300;
  background: #F97300;
  color: #fff;
}
```

**contact.component.html**

```html
<div class="contact-form" id="contact">
  <div class="container">
    <form>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <h1>Get in Touch</h1>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 right">
          <div class="form-group">
            <input type="text" class="form-control form-control-lg" placeholder="Your Name" name="">
          </div>
          <div class="form-group">
            <input type="email" class="form-control form-control-lg" placeholder="YourEmail@email.com" name="email">
          </div>
          <div class="form-group">
            <textarea class="form-control form-control-lg"></textarea>
          </div>
          <button type="submit" class="btn btn-outline-secondary float-right">
            <i class="fa fa-paper-plane fa-fw" aria-hidden="true"></i> Send</button>
        </div>
      </div>
    </form>
  </div>
</div>
```

`$ ng serve -o`
