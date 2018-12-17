# YourComponent

## 새 프로젝트

```bash
$ ng new your-component
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

## 디자인 디펜던시

```bash
$ cd your-component
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

## Component

```bash
$ ng g c layout/header --module=app
$ ng g c layout/footer --module=app
$ ng g c layout/layout --module=app --flat=true
$ ng g c root/home --module=app
```

## Binding

```bash
$ ng g c binding/interpolation --spec=false --inlineTemplate=true --inlineStyle=true
$ ng g c binding/property --module=app
$ ng g c binding/event --module=app
$ ng g c binding/twoway --module=app
```

## Directive

```bash
$ ng g c directive/built-in/ng-class
$ ng g c directive/built-in/ng-if
$ ng g c directive/built-in/ng-for
$ ng g c directive/built-in/ng-switch
$ ng g c directive/built-in/ref

$ ng g c directive/custom/highlight
$ ng g d directive/highlight
```

## Service

```bash
$ ng g c service/data-holder
$ ng g s service/data-holder --spec=false
```

## Pipe

```bash
$ ng g c pipe/built-in
$ ng g p pipe/str-date
```
