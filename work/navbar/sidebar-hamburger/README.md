# SidebarHamburger

`from: https://bootsnipp.com/ravi7284007`

```bash
$ ng --version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 7.1.1
Node: 10.14.1
OS: win32 x64
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.11.1
@angular-devkit/core         7.1.1
@angular-devkit/schematics   7.1.1
@schematics/angular          7.1.1
@schematics/update           0.11.1
rxjs                         6.3.3
typescript                   3.1.6
```

```bash
$ ng new sidebar-hamburger --minimal=true --skipTests=true
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd sidebar-hamburger
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

**package.json**

```json
{
  "name": "sidebar-hamburger",
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
    "@types/jquery": "^3.3.25",
    "@types/node": "~8.9.4",
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

`$ ng g c layout/header --module=app`

`$ ng g c layout/sidebar --module=app`

**app.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    
    <app-sidebar>
      <div class="outlet">
        <router-outlet></router-outlet>
      </div>
    </app-sidebar>
  `,
  styles: []
})
export class AppComponent {

}
```

**header.component.scss**

```scss
.hamburger .hamburger-inner,
.hamburger .hamburger-inner::after,
.hamburger .hamburger-inner::before {
  background-color: #ffffff;
}
```

**header.component.html**

```html
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">

  <button class="hamburger hamburger--arrow side-menu-toggle" type="button">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>

  <a href="#menu-toggle" class="navbar-brand" routerLink="home" routerLinkActive="active">Angular Wave</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarResponsive">
    <ul class="navbar-nav mr-auto">

      <li class="nav-item">
        <a class="nav-link" routerLink="home" routerLinkActive="active">Home
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="about" routerLinkActive="active">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Services</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Actions
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" [routerLink]="'/accounts'"> Accounts </a>
          <a class="dropdown-item" [routerLink]="'/create-account'"> Create Account </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/contacts'"> Contacts </a>
          <a class="dropdown-item" [routerLink]="'/create-contact'"> Create Contact </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/leads'"> Leads </a>
          <a class="dropdown-item" [routerLink]="'/create-lead'"> Create Lead </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/opportunities'"> Opportunities </a>
          <a class="dropdown-item" [routerLink]="'/create-opportunity'"> Create Opportunity </a>
        </div>
      </li>

    </ul>

    <ul class="navbar-nav ml-auto">

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Actions
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" [routerLink]="'/accounts'"> Accounts </a>
          <a class="dropdown-item" [routerLink]="'/create-account'"> Create Account </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/contacts'"> Contacts </a>
          <a class="dropdown-item" [routerLink]="'/create-contact'"> Create Contact </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/leads'"> Leads </a>
          <a class="dropdown-item" [routerLink]="'/create-lead'"> Create Lead </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" [routerLink]="'/opportunities'"> Opportunities </a>
          <a class="dropdown-item" [routerLink]="'/create-opportunity'"> Create Opportunity </a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Contact</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
          <a class="dropdown-item" href="#">Settings</a>
          <a class="dropdown-item" href="#">Activity Log</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
        </div>
      </li>

    </ul>
  </div>

</nav>
```

**sidebar.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.hamburger').click(function() {
        $('.hamburger').toggleClass('is-active');
      });
      
      $(".side-menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    });
  }

}
```

**sidebar.component.scss**

```scss
.profile-sidebar {
  width: 250px;
  padding: 20px 0 10px;
  background: #000000;
}

.profile-userpic img {
  float: none;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0;
}

/*!
 * Start Bootstrap - Simple Sidebar 
 * (https://startbootstrap.com/template-overviews/simple-sidebar)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT 
 * (https://github.com/BlackrockDigital/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */

#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled {
  padding-left: 250px;
}

#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 250px;
  width: 0;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  background: #000;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
  width: 250px;
}

#page-content-wrapper {
  width: 100%;
  position: absolute;
  padding: 15px;
}

#wrapper.toggled #page-content-wrapper {
  position: absolute;
  margin-right: -250px;
}

.sidebar-nav {
  position: absolute;
  // top: 0;
  width: 250px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav li {
  text-indent: 10px;
  line-height: 40px;
  position: relative;
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #999999;
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}

.sidebar-nav li:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: 3px;
  background-color: #1c1c1c;
  -webkit-transition: width 0.2s ease-in;
  -moz-transition: width 0.2s ease-in;
  -ms-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
}

.sidebar-nav li:nth-child(1):before {
  background-color: #222222;
}

.sidebar-nav li:nth-child(2):before {
  background-color: #ec1b5a;
}

.sidebar-nav li:nth-child(3):before {
  background-color: #79aefe;
}

.sidebar-nav li:nth-child(4):before {
  background-color: #314190;
}

.sidebar-nav li:nth-child(5):before {
  background-color: #279636;
}

.sidebar-nav li:nth-child(6):before {
  background-color: #7d5d81;
}

.sidebar-nav li:nth-child(7):before {
  background-color: #ead24c;
}

.sidebar-nav li:nth-child(8):before {
  background-color: #2d2366;
}

.sidebar-nav li:nth-child(9):before {
  background-color: #35acdf;
}

.sidebar-nav li.open:hover:before,
.sidebar-nav li:hover:before {
  width: 100%;
  -webkit-transition: width 0.2s ease-in;
  -moz-transition: width 0.2s ease-in;
  -ms-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus,
.sidebar-nav li a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus,
.sidebar-nav li.open a:hover {
  color: #fff;
  text-decoration: none;
  background-color: transparent;
}

@media(min-width:768px) {
  #wrapper {
    padding-left: 0;
  }

  #wrapper.toggled {
    padding-left: 250px;
  }

  #sidebar-wrapper {
    width: 0;
  }

  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  #page-content-wrapper {
    padding: 20px;
    position: relative;
  }

  #wrapper.toggled #page-content-wrapper {
    position: relative;
  }
}
```

**sidebar.component.html**

```html
<div id="wrapper">

  <div id="sidebar-wrapper">
    
    <div class="profile-sidebar">
      <div class="profile-userpic">
        <img src="https://avatars0.githubusercontent.com/u/18523869?s=460&v=4" 
          class="mx-auto d-block img-fluid" alt="user picture">
      </div>
      <div class="profile-usertitle">
        <div class="profile-usertitle-name">
          Marcus Doe
        </div>
        <div class="profile-usertitle-job">
          Developer
        </div>
      </div>
      <div class="profile-userbuttons">
        <button type="button" class="btn btn-success btn-sm">Follow</button>
        <button type="button" class="btn btn-danger btn-sm">Message</button>
      </div>
    </div>
    
    <ul class="sidebar-nav">
      <li>
        <a routerLink="home" routerLinkActive="active">
          <i class="fa fa-home fa-fw" aria-hidden="true"></i>Home</a>
      </li>
      <li>
        <a routerLink="about" routerLinkActive="active">
          <i class="fa fa-book fa-fw" aria-hidden="true"></i>About</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-pencil fa-fw" aria-hidden="true"></i>Dashboard</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-camera-retro fa-fw" aria-hidden="true"></i>Shortcuts</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-clipboard fa-fw" aria-hidden="true"></i>Overview</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-paper-plane fa-fw" aria-hidden="true"></i>Events</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-paperclip fa-fw" aria-hidden="true"></i>About</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-trash fa-fw" aria-hidden="true"></i>Services</a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-cog fa-fw" aria-hidden="true"></i>Contact</a>
      </li>
    </ul>
  </div>

  <div id="page-content-wrapper">
    <div class="container-fluid">

      <button class="hamburger hamburger--arrow side-menu-toggle" type="button">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <button class="hamburger hamburger--arrow-r is-active side-menu-toggle" type="button">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <ng-content></ng-content>

    </div>
  </div>

</div>
```

`$ ng g c root/home --module=app`

`$ ng g c root/about --module=app`

**app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './root/home/home.component';
import { AboutComponent } from './root/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

`$ ng serve -o`
