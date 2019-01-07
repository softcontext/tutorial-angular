# MegaMenuSlideDown

`from: https://bootsnipp.com/maridlcrmn`

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
$ ng new mega-menu-slide-down --minimal=true --skipTests=true
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd mega-menu-slide-down
$ npm i jquery bootstrap@3.3.0
$ npm i @types/jquery --save-dev
```

**package.json**

```json
{
  "name": "mega-menu-slide-down",
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
    "bootstrap": "^3.3.0",
    "core-js": "^2.5.4",
    "jquery": "^3.3.1",
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
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js",
]
```

`$ ng g c layout/header --module=app`

**app.component.ts**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
```

**header.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $(".dropdown").hover(
        function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown("400");
          $(this).toggleClass('open');
        },
        function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideUp("400");
          $(this).toggleClass('open');
        }
      );
    });
  }

}
```

**header.component.scss**

```scss
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700);

body {
  font-family: 'Open Sans', 'sans-serif';
}

.mega-dropdown {
  position: static !important;
}

.mega-dropdown-menu {
  padding: 20px 0;
  width: 100%;
  box-shadow: none;
  -webkit-box-shadow: none;
}

.mega-dropdown-menu > li > ul {
  padding: 0;
  margin: 0;
}

.mega-dropdown-menu > li > ul > li {
  list-style: none;
}

.mega-dropdown-menu > li > ul > li > a {
  display: block;
  color: #222;
  padding: 3px 5px;
}

.mega-dropdown-menu > li ul > li > a:focus,
.mega-dropdown-menu > li ul > li > a:hover {
  text-decoration: none;
}

.mega-dropdown-menu .dropdown-header {
  font-size: 18px;
  color: #ff3546;
  padding: 5px 60px 5px 5px;
  line-height: 30px;
}

.carousel-control {
  width: 30px;
  height: 30px;
  top: -35px;
}

.left.carousel-control {
  right: 30px;
  left: inherit;
}

.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  font-size: 12px;
  background-color: #fff;
  line-height: 30px;
  text-shadow: none;
  color: #333;
  border: 1px solid #ddd;
}
```

**header.component.html**

```html
<div class="container">
  <nav class="navbar navbar-inverse">

    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">My Store</a>
    </div>

    <div class="collapse navbar-collapse js-navbar-collapse">
      <ul class="nav navbar-nav">
        
        <!-- Men : Start -->
        <li class="dropdown mega-dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Men <span class="caret"></span></a>
          <ul class="dropdown-menu mega-dropdown-menu">
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Men Collection</li>
                
                <div id="menCollection" class="carousel slide" data-ride="carousel">
                  
                  <!-- Carousel Inner : Start -->
                  <div class="carousel-inner">
                    <div class="item active">
                      <a href="#"><img src="http://placehold.it/254x150/ff3546/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 1"></a>
                      <h4><small>Summer dress floral prints</small></h4>
                      <button class="btn btn-primary" type="button">49,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                    <div class="item">
                      <a href="#"><img src="http://placehold.it/254x150/3498db/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 2"></a>
                      <h4><small>Gold sandals with shiny touch</small></h4>
                      <button class="btn btn-primary" type="button">9,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                    <div class="item">
                      <a href="#"><img src="http://placehold.it/254x150/2ecc71/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 3"></a>
                      <h4><small>Denin jacket stamped</small></h4>
                      <button class="btn btn-primary" type="button">49,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                  </div>
                  <!-- Carousel Inner : End -->
                  
                  <a class="left carousel-control" href="#menCollection" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="right carousel-control" href="#menCollection" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  
                </div>
                
                <li class="divider"></li>
                <li><a href="#">View all Collection <span class="glyphicon glyphicon-chevron-right pull-right"></span></a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Features</li>
                <li><a href="#">Auto Carousel</a></li>
                <li><a href="#">Carousel Control</a></li>
                <li><a href="#">Left & Right Navigation</a></li>
                <li><a href="#">Four Columns Grid</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Fonts</li>
                <li><a href="#">Glyphicon</a></li>
                <li><a href="#">Google Fonts</a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Plus</li>
                <li><a href="#">Navbar Inverse</a></li>
                <li><a href="#">Pull Right Elements</a></li>
                <li><a href="#">Coloured Headers</a></li>
                <li><a href="#">Primary Buttons & Default</a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Much more</li>
                <li><a href="#">Easy to Customize</a></li>
                <li><a href="#">Calls to action</a></li>
                <li><a href="#">Custom Fonts</a></li>
                <li><a href="#">Slide down on Hover</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- Men : End -->
        
        <!-- Women : Start -->
        <li class="dropdown mega-dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Women <span class="caret"></span></a>
          <ul class="dropdown-menu mega-dropdown-menu">
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Features</li>
                <li><a href="#">Auto Carousel</a></li>
                <li><a href="#">Carousel Control</a></li>
                <li><a href="#">Left & Right Navigation</a></li>
                <li><a href="#">Four Columns Grid</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Fonts</li>
                <li><a href="#">Glyphicon</a></li>
                <li><a href="#">Google Fonts</a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Plus</li>
                <li><a href="#">Navbar Inverse</a></li>
                <li><a href="#">Pull Right Elements</a></li>
                <li><a href="#">Coloured Headers</a></li>
                <li><a href="#">Primary Buttons & Default</a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Much more</li>
                <li><a href="#">Easy to Customize</a></li>
                <li><a href="#">Calls to action</a></li>
                <li><a href="#">Custom Fonts</a></li>
                <li><a href="#">Slide down on Hover</a></li>
              </ul>
            </li>
            <li class="col-sm-3">
              <ul>
                <li class="dropdown-header">Women Collection</li>
                <div id="womenCollection" class="carousel slide" data-ride="carousel">
                  
                  <!-- Carousel Inner : Start -->
                  <div class="carousel-inner">
                    <div class="item active">
                      <a href="#"><img src="http://placehold.it/254x150/3498db/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 1"></a>
                      <h4><small>Summer dress floral prints</small></h4>
                      <button class="btn btn-primary" type="button">49,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                    <div class="item">
                      <a href="#"><img src="http://placehold.it/254x150/ff3546/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 2"></a>
                      <h4><small>Gold sandals with shiny touch</small></h4>
                      <button class="btn btn-primary" type="button">9,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                    <div class="item">
                      <a href="#"><img src="http://placehold.it/254x150/2ecc71/f5f5f5/&text=New+Collection" class="img-responsive" alt="product 3"></a>
                      <h4><small>Denin jacket stamped</small></h4>
                      <button class="btn btn-primary" type="button">49,99 €</button> <button href="#" class="btn btn-default" type="button"><span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                    </div>
                  </div>
                  <!-- Carousel Inner : End -->

                  <a class="left carousel-control" href="#womenCollection" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="right carousel-control" href="#womenCollection" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  
                </div>
                <li class="divider"></li>
                <li><a href="#">View all Collection <span class="glyphicon glyphicon-chevron-right pull-right"></span></a></li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- Women : End -->
        
        <li><a href="#">Store locator</a></li>
      </ul>

      <!-- Right Menu : Start -->
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My account <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
        <li><a href="#">My cart (0) items</a></li>
      </ul>
      <!-- Right Menu : End -->
      
    </div>
  </nav>
</div>
```

`$ ng serve -o`
