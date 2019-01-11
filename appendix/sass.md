# SASS

다음 사이트를 참조하였습니다.  

`https://ko.wikipedia.org/wiki/Sass`  
`https://velopert.com/1712`  

## .sass vs .scss

`SASS`: Syntactically Awesome Style Sheets  
`SCSS`: Sassy CSS  

SASS는 2가지 신택스로 구성되어 있습니다. `들여쓰기 문법(Indented Syntax)`라는 이름의 문법은 분리를 위해 들여쓰기를 사용하여 코드 블록과 새 줄 문자를 구분합니다. 보다 새로운 문법 SCSS는 CSS의 문법과 비슷한 블록 형식을 사용합니다. 각각 .sass, .scss 확장자로 사용된 문법을 구분합니다.

SASS와 SCSS는 객체지향 언어와 같은 프로그래밍 언어에서 사용 가능하면서도 CSS3 자체적으로는 이용이 불가능했던 여러 매커니즘을 제공함으로써 CSS를 확장합니다. 스크립트가 해석될 때 SASS 파일에 정의된 여러 셀렉터를 위한 CSS 규칙 블록을 만들어냅니다. SASS 인터프리터는 스크립트를 CSS로 변환합니다. SASS는 CSS를 위한 `Syntactic Sugar`라 할 수 있습니다.

SASS 공식 구현체는 오픈 소스이며 루비로 코딩되어 있었습니다. 그러나 다트, PHP, 또 libSass라는 이름의 C의 고성능 구현체를 포함하여 다른 구현체들이 더 빠른 속도를 보여주어 대체되고 있습니다. 

**SASS 스타일**

```sass
$primary-color: #3bbfce
$margin: 16px

.content-navigation
  border-color: $primary-color
  color: darken($primary-color, 10%)

.border
  padding: $margin/2
  margin:  $margin/2
  border-color: $primary-color
```

`$변수: 값` 형태로 변수를 선언하고 변수를 사용하여 값(문자열)을 재 사용합니다.

**SCSS 스타일**

```scss
$primary-color: #3bbfce;
$margin: 16px;

.content-navigation {
  border-color: $primary-color;
  color: darken($primary-color, 10%);
}

.border {
  padding: $margin / 2;
  margin: $margin / 2;
  border-color: $primary-color;
}
```

`적정 기술`이라는 용어가 있습니다. 주로 선진국이 아닌 국가들에게 필요한 기술적 지원을 할 때, 정말 그 기술이 그들에게 도움이 되는가라는 고민을 바탕으로 나온 용어입니다. 최신 기술, 고급 기술보다는 정말 도움이 되는 적절한 기술이 더 좋다라는 뜻으로 사용됩니다. 개인적으로 구 SASS 스타일 문법은 `지나친 추상화`의 형태로 보입니다. 마치 Pug(구 Jade)의 기술이 훌륭함에도 널리 사용되지 못하고 있는 것처럼 말이죠. 

범위연산자로 사용하는 중괄호는 많은 개발자분들이 싫어합니다. 그래서 대체 방법으로 들여쓰기 문법을 지원하는 언어들이 많이 생겨났습니다. SASS가 딱 거기에 해당합니다. 좋습니다. 훌륭한 기술이라는 것에는 이견이 없습니다. 그런데 쓰고 싶지 않습니다. 현대에 개발자들은 바쁩니다. 적어도 저는 바쁩니다. 2000년 초 개발자분들은 1~2개의 언어만 알아도 충분히 대우받고 괜찮았습니다. 요즘 개발자분들은 그렇지 못합니다. 끊임없이 새로운 기술을 배우고 익혀야만 살아남을 수 있습니다. 구 SASS 스타일 문법을 사용하려면 학습이 많이 필요합니다. 이 부분이 바로 지적하고 싶은 부분입니다. 오해하지 마세요. 개발자분들이 못해서 안하는게 아닙니다. 전략적으로 선택해서 사용하지 않는 것이라고 봅니다. 부족한 시간을 중요하고 정말 필요한 곳에 쏟는 것이 더 낫기때문입니다. 그래서 새로운 SCSS 스타일의 문법을 권장하고 싶습니다.

추신: 그래서 Jade 대신 Hadlebars를 선호했죠. 요즘은 Emmet을 좋아하게 되어서 Pug(구 Jade)를 한 번 사용해볼까 하는 생각도 들지 않게 되었습니다. 새로운 포장지로 덮었다면 전보다 보기 좋아야 하고 새로운 기술적 인터페이스로 덮었다면 전보다 쓰기 편해야 합니다. 마냥 추상화 한다고 언제나 좋은 것은 아니라는 뜻이 되겠습니다. 그래서 중용은 어렵습니다. 중용은 시소처럼 무게의 중심을 찾아서 밸런스를 맞추려고 노력하는 것이 아닙니다. 부지런히 양 극단을 반복하여 무게의 중심을 보정하는 것이라고 합니다. 멈춰 있는 것은 곧 죽어 있다는 뜻이겠지요. 개발 완료된 소프트웨어는 보완하지 않는다면 서서히 죽어간다고 표현합니다. 세상 만물이 모두 그러하듯이 말이죠.

# 컴파일 환경구성

## 1. CLI를 이용한 컴파일

NPM을 사용하여 node-sass 모듈을 글로벌로 설치합니다.

```bash
$ npm i -g node-sass
```

콘솔에서 직접 명령을 입력하여 프리 컴파일링을 수행하는 방식입니다.

```bash
# 현재 디렉토리에 저장
$ node-sass style.scss -o .

# style.scss 파일에 변화가 있을 떄 마다 자동으로 리컴파일
$ node-sass style.scss -w -o .
```

## 2. Atom을 이용한 컴파일

NPM을 통하여 node-sass 모듈을 글로벌로 설치합니다. 아톰 패키지가 node-sass에 의존하기 때문에 설치가 필요합니다.

```bash
$ npm i -g node-sass
```

아톰에서 `sass-autocompile` 패키지를 설치합니다. Settings 메뉴로 이동합니다. `Compile on Save` 항목을 선택합니다. 이제 `.scss` 파일을 저장할 때 자동으로 프리 컴파일링을 수행하여 결과물로 `.css` 파일이 생성됩니다.

작동여부를 체크할 겸 연습을 해보겠습니다. 먼저 style.scss 파일을 작성합니다.

**style.scss**

```scss
$title-font: normal 24px/1.5 'Open Sans', sans-serif;
$cool-red: #F44336;
$box-shadow-bottom-only: 0 2px 1px 0 rgba(0, 0, 0, 0.2);

h1.title {
  font: $title-font;
  color: $cool-red;
}

div.container {
  color: $cool-red;
  background: #fff;
  width: 100%;
  box-shadow: $box-shadow-bottom-only;
}
```

`sass-autocompile` 패키지의 컴파일링 옵션을 살펴보겠습니다. 옵션에 따라서 컴파일된 결과물을 보고 옵션의 의미를 파악합니다.

**1. Compile with 'compressed' output style**

```css
h1.title{font:normal 24px/1.5 "Open Sans",sans-serif;color:#F44336}div.container{ ... 생략 }
```

압축된 형태입니다. 최종적으로 결과물을 배포할 때 사용하는 옵션이 되겠습니다.

**2. Compile with 'compact' output style**

```css
h1.title { font: normal 24px/1.5 "Open Sans", sans-serif; color: #F44336; }

div.container { color: #F44336; background: #fff; width: 100%; box-shadow: ... 생략 }
```

적용단위로 한줄로 나열됩니다.

**3. Compile with 'expanded' output style**

```css
h1.title {
  font: normal 24px/1.5 "Open Sans", sans-serif;
  color: #F44336;
}

div.container {
  color: #F44336;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
}
```

개발자가 직접 작성한 형태와 가깝게 표시됩니다. 학습에서는 이 옵션을 사용하는 것이 좋겠습니다.

**4. Compile with 'nested' output style**

임포트 한 다른 파일도 컴파일하는 옵션은 학습에서 필요없다고 판단됩니다. 파일 하나씩 작성하면서 저장할 때마다 자동으로 컴파일링이 수행되기 때문입니다.

**5. Show node-sass output after compilation**

선택을 해제합니다. 선택하면 컴파일 결과를 표시하는 새로운 탭을 보여줍니다. 매번 닫아야 하는 불편함이 있으니 사용하지 않습니다.

### 자동저장 활성화

편의를 위해서 아톰 설정에서 `autosave` 기능을 활성화 합니다. 그러면 개발자가 직접 저장 단축 키(ctrl+s)를 누를 필요도 없어집니다.

`File > Settings > Packages > Core Packages`

**autosave**  
Autosaves editor when they lose focus, are destroyed, or when the window is closed.

`Settings > Enabled`

# 문법

## 주석

Sass의 주석이 CSS 와 다른점은 한 줄 주석이 추가되었다는 점 입니다. 한 줄 주석은 `//` 로 표기하며, CSS로 컴파일 되었을 때 사라집니다. 여러 줄 주석은 CSS 와 동일하며 CSS 로 컴파일 되었을 때 유지되어 표시됩니다.

## 변수

변수로 사용 가능한 형태는 숫자, 문자열, 폰트, 색상, null, lists, maps가 있습니다. 변수를 사용 할 떄는 `$` 문자를 사용합니다. maps를 정의할 때 소괄호를 사용합니다. 변수는 범위를 갖습니다. 중괄호를 사용하여 안쪽에서 선언한 변수를 외부에서 접근할 수 없습니다. 객체지향 언어와 스코프 개념과 유사합니다.

```scss
$primary-color: #333;
$secondary-color: #777;

body {
  $primary-color: #444 !global; 
  // !global 옵션: 전역적으로 적용된다.
  $secondary-color: #888 !global !default; 
  // !default 옵션: 이미 $secondary-color 변수가 존재하기 때문에 무시된다.
  $title-color: red !global !default; 
  // !default 옵션: $title-color이 없으므로 처리된다. !global 옵션: 전역적으로 적용된다.
  color: $primary-color;
}

p {
  color: $primary-color;
}

small {
  color: $secondary-color;
}

h1 {
  color: $title-color;
}
```

```css
body {
  color: #444;
}

p {
  color: #444;
}

small {
  color: #777;
}

h1 {
  color: red;
}
```

**boolean**

```scss
$bool: false;

@if not $bool {

}
```

**color**

```scss
.foo {
  $color: red;

  border-color: $color;
  color: darken($color, 10%);             // #CC0000
  background-color: lighten($color, 20%); // #FF6666
}
```

**list**

```scss
$list: 'foo', 'bar';
$type: type-of($list); // list
$separator: list-separator($list); // comma
```

**maps**

```scss
// Defining a map
$colors: (
  'brand': hotpink,
  'grey': silver,
  'black': #333,
);

// Accessing specific value
body {
  color: map-get($colors, 'black');
}
```

**null**

```scss
.foo {
  content: type-of(null); // null
  content: type-of(NULL); // string
}

$list: (foo, null, bar, null, baz);

.bar {
  content: type-of($list); // list
  content: inspect($list); // foo, bar, baz
  content: length($list);  // 5
}
```

**numbers**

```scss
$a: 4 + 2 * 2 - 4 / 2;     //  6
$b: (4 + 2) * (2 - 4) / 2; // -6
```

**strings**

```scss
// Any of the two following declarations is okay since
// Sass accepts both unquoted and quoted strings and
// CSS does not require font family names to be quoted.
$font: Helvetica;
$font: 'Helvetica';

.foo {
  font-family: $font;
}

// Okay
$foo: 'I am a string.';

// Nope 
$bar: I am a string.;
```

## 연산자

`+, -, *, /, %, ==, !=`	연산자 등을 사용할 수 있습니다. 

`+, -` 연산자를 사용 할 떄는 단위를 일치시켜야합니다.

예를들어, 다음과 같은 코드는 오류가 발생합니다.  
`$box-width: 100% - 20px`  

이런 작업을 수행해야 한다면 함수를 사용해야 합니다.

다음과 같은 식은 오류 없이 작동합니다.  
`$box-width: 300px / 960px * 100%`  

## 빌트인 함수

`darken()` 함수는 특정 색깔과, 어둡게 할 비율을 인수로 던져주면 색상을 계산해서 반환합니다.

```scss
$buttonColor: #2ecc71;
$buttonDark: darken($buttonColor, 10%);
$buttonDarker: darken($buttonDark, 10%);

button {
  outline: 0;
  border: 0;
  padding: 10px 30px 5px 30px;
  background: $buttonColor;
  box-shadow: 0 5px 0 $buttonDark;
  border-radius: 3px;
  font-size: 1rem;
  color: white;
  display: inline-block;

  &:hover {
    background: $buttonDark;
    box-shadow: 0 5px 0 $buttonDarker;
  }
}
```

부모 선택자를 참조 할떄 `&` 문자를 사용합니다. 

```css
button {
  outline: 0;
  border: 0;
  padding: 10px 30px 5px 30px;
  background: #2ecc71;
  box-shadow: 0 5px 0 #25a25a;
  border-radius: 3px;
  font-size: 1rem;
  color: white;
  display: inline-block;
}

button:hover {
  background: #25a25a;
  box-shadow: 0 5px 0 #1b7943;
}
```

다음 사이트에서 빌트인 함수정보를 얻을 수 있습니다.  
`http://sass-lang.com/documentation/Sass/Script/Functions.html`  

## 네스팅(중첩)

CSS는 논리적인 네스팅을 지원할 뿐 코드적인 네스팅은 지원하지 않습니다. SCSS 문법은 코드적인 네스팅을 지원합니다.

```css
table.klass {
  margin: 2em 0;
}

table.klass td.clazz {
  text-align: right;
}

li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.3em;
}
```

가독성 및 관리성을 향상시키기 위해서 SCSS 문법을 적용하면 아래처럼 작성할 수 있습니다.

```scss
table.klass {
  margin: 2em 0;

  td.clazz {
    text-align: right;
  }
}

li {
  font: {
    family: serif;
    weight: bold;
    size: 1.3em;
  }
}
```

## 임포트

```scss
@import "style.scss";
@import "layout.scss"; // layout 파일명이 하나라면 확장자를 생략할 수 있다.
```

**partial**

만약에 .sass 파일이나 .scss 파일의 파일이름을 Underscore `_` 기호로 시작하면 따로 컴파일되지 않습니다. HTML에서 해당 파일을 직접 임포트하지는 않고 특정 SCSS 파일에서 임포트하는 방식으로만 사용한다면 이를 적용하세요.

## 상속(확장)

```scss
.box {
  border: 1px solid gray;
  padding: 8px;
  display: inline-block;
}

.success-box {
  @extend .box;
  border: 1px solid green;
}
```

```css
.box, .success-box {
  border: 1px solid gray;
  padding: 8px;
  display: inline-block;
}

.success-box {
  border: 1px solid green;
}
```

`.box` 설정을 상속(확장)해서 일부 스타일을 고쳐서 사용하거나 새로 추가해서 사용하는 개념을 적용하면 관리성이 증가됩니다. 문법이 다음과 같았다면 보다 직관적이기 때문에 더 좋을 텐데 조금 아쉽습니다.  
`.success-box @extend .box { ... }`  

**Placeholder**

위치보유 선택자 `%`를 사용하면 상속은 할 수 있지만 해당 선택자는 컴파일되지 않고 제외됩니다.

```scss
%box {
  padding: 0.5em;
}

.success-box {
  @extend %box;
  color: green;
}

.error-box {
  @extend %box;
  color: red;
}
```

```css
.success-box, .error-box {
  padding: 0.5em;
}

.success-box {
  color: green;
}

.error-box {
  color: red;
}
```

box라는 선택자는 사라졌습니다.

## Mixin

**네임스페이스**

```css
#data th {
  text-align: center;
  font-weight: bold;
}

#data td,
#data th {
  padding: 2px;
}
```

테이블의 여러개 있는 상태에서 하나의 테이블의 `#data`라는 id를 부여하여 다른 것과 구별하고자 합니다. `#data`로 구분된 테이블의 th, td 태그들에 스타일을 적용하고자 합니다. 다른 테이블에서도 사용할 수 있으니 스타일을 보관했다가 다시 이용할 수 있는 방법도 필요합니다.

```scss
@mixin table-base {
  th {
    text-align: center;
    font-weight: bold;
  }

  td,
  th {
    padding: 2px;
  }
}

#data {
  @include table-base;
}
```

`@mixin 디렉티브` 형태로 스타일을 보관합니다. `@include 디렉티브` 형태로 필요한 곳(적용영역이 외부와 구분된 대상)에 적용합니다.

**Mixin**

믹스인은 extend와 비슷하지만 추가로 인수를 받을 수 있다는 점이 다른 부분입니다.

```scss
@mixin headline($color, $size) {
  color: $color;
  font-size: $size;
}

h1 {
  @include headline(green, 3rem);
}

p {
  @include headline(gray, 1rem);
}
```

```css
h1 {
  color: green;
  font-size: 3rem;
}

p {
  color: gray;
  font-size: 1rem;
}
```

Mixin을 응용하면 이런식으로도 사용이 가능합니다. 먼저 얻고자 하는 결과를 숙지하시고 이를 어떻게 작성하는지 살펴보는 것이 좋겠습니다.

```css
.container {
  width: 900px;
}

@media (max-width: 767px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 900px) {
  #target {
    color: red;
  }
}
```

`max-width: 767px`  
해상도가 767px 이하일 때 해당 코드가 적용됩니다.  

```scss
@mixin media($queryString) {
  @media #{$queryString} {
    @content;
  }
}

.container {
  width: 900px;
  @include media("(max-width: 767px)") { 
    // 중괄호를 사용하면 처리 후 결과가 밑으로 분리됩니다.
    width: 100%;
  }
}

#target {
  @include media("(max-width: 900px)") {
    color: red;
  }
}
```

`#{}` 표현식은 특정 문자열을 따로 처리하지않고 그대로 출력 할 때 설정합니다. 

`@content` 디렉티브를 사용하면 `@include` 하였을 때, `@include` 선택자 내부의 내용이 `@conent` 부분에 배치됩니다.

## 사용자 함수

함수는 앞서서 살펴본 mixin과 비슷합니다. mixin은 `Style Markup`을 바로 반환하지만 함수는 `@return directive`를 사용해야 값을 반환한다는 차이점이 있습니다. 함수를 선언 할 때는 `@function directive` 문법을 사용합니다.

```scss
@function calc-percent($target, $container) {
  @return ($target / $container) * 100%;
}
@function cp($target, $container) {
  @return calc-percent($target, $container);
}

.my-module {
  width: calc-percent(650px, 1000px);
}

.your-module {
  width: cp(650px, 1000px);
}
```

```css
.my-module {
  width: 65%;
}

.your-module {
  width: 65%;
}
```

꿀 팁: 자주 사용할 것 같은 함수는 위와 같이 단축함수를 만들어 사용하세요. 그런다고 해서 결과물의 용량이 늘어나지는 않으니까요.

## 루프

**`@for`**

다음은 기본 문법입니다.

```scss
@for $i from 1 through 3 {
  // 1
  // 2
  // 3
}
@for $i from 1 to 3 {
  // 1
  // 2
}
```

어떻게 사용하는 것인지 샘플을 보세요.

```scss
$squareCount: 3;
@for $i from 1 through $squareCount {
  #square-#{$i} {
    background-color: red;
    width: 50px * $i;
    height: 120px / $i;
  }
}
```

```css
#square-1 {
  background-color: red;
  width: 50px;
  height: 120px;
}

#square-2 {
  background-color: red;
  width: 100px;
  height: 60px;
}

#square-3 {
  background-color: red;
  width: 150px;
  height: 40px;
}
```

```scss
@for $i from 1 through 5 {
  li:nth-of-type(#{$i}) {
    color: hsl($i * 360 / 5, 75%, 75%);
  }
}
```

```css
li:nth-of-type(1) {
  color: #dcef8f;
}

li:nth-of-type(2) {
  color: #8fefb6;
}

li:nth-of-type(3) {
  color: #8fb6ef;
}

li:nth-of-type(4) {
  color: #dc8fef;
}

li:nth-of-type(5) {
  color: #ef8f8f;
}
```

```scss
$colors: red, orange, yellow, green, blue;
@for $i from 1 through length($colors) {
  li:nth-of-type(#{$i}) {
    color: nth($colors, $i);
  }
}
```

```css
li:nth-of-type(1) {
  color: red;
}

li:nth-of-type(2) {
  color: orange;
}

li:nth-of-type(3) {
  color: yellow;
}

li:nth-of-type(4) {
  color: green;
}

li:nth-of-type(5) {
  color: blue;
}
```

**`@each`**

개발자라면 샘플을 보는 것만으로 어떻게 사용하는 것인지 파악할 수 있다고 생각됩니다. 따로 설명은 필요없어 보입니다.

```scss
$colors: red, orange, yellow, green, blue;
$i: 1;
@each $color in $colors {
  li:nth-of-type(#{$i}) {
    color: $color;
  }
  $i: $i + 1;
}
```

```
li:nth-of-type(1) {
  color: red;
}

li:nth-of-type(2) {
  color: orange;
}

li:nth-of-type(3) {
  color: yellow;
}

li:nth-of-type(4) {
  color: green;
}

li:nth-of-type(5) {
  color: blue;
}
```

```scss
$colors: (
  'strawberry': red,
  'orange': orange,
  'lemon': yellow,
  'letuce': green,
  'blueberry': blue,
);
@each $section, $color in $colors {
  .#{$section} {
    color: $color;
  }
}
```

```css
.strawberry {
  color: red;
}

.orange {
  color: orange;
}

.lemon {
  color: yellow;
}

.letuce {
  color: green;
}

.blueberry {
  color: blue;
}
```

## 조건문

```scss
@if $something {
    // Do something when `$something` is truthy
} @else if $something-else {
    // Do something else when `$something` is falsy
    // but `$something-else` is thruty
} @else {
    // When everything else has failed
}
```

**Ternary function**

```scss
// Returns whether `$value` is truthy
@function is-truthy($value) {
    @return if($value, true, false);
}
```

## 추가적인 학습

추가적인 학습은 다음 사이트를 이용하세요.  
`https://www.sitepoint.com/sass-reference/`  
