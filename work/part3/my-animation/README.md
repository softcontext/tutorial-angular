# MyAnimation

```bash
$ ng new my-animation

? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-animation
$ npm i jquery popper.js bootstrap font-awesome
$ npm i @types/jquery --save-dev
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

```bash
$ ng serve -o
```

```bash
$ ng g c layout/nav && ng g c page/home
$ ng g c page/animation1
$ ng g c page/animation2
$ ng g c page/animation3
$ ng g c page/animation4
$ ng g c page/animation5
$ ng g c page/animation5/slidePanel
```

참고  
* https://angular.io/guide/animations
