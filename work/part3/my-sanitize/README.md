# MySanitize

```bash
$ ng new my-sanitize

? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-sanitize
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
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
$ ng g c layout/nav
$ ng g c page/home
$ ng g c page/sanitize1
$ ng g c page/sanitize2
$ ng g p pipe/sanitizeHtml
$ ng g p pipe/sanitizeResourceUrl
```
