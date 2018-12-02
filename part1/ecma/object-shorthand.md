# Object Shorthand

프로퍼티 키는 언제나 문자열로 취급된다. 프로퍼티 키와 값이 같은 경우 프로퍼티 키는 문자열이고 값은 변수로 취급된다. 이 경우, 짧게 줄여서 작성할 수 있다.

```JavaScript
var a = 10;
var b = 20;

function say() {
  console.log('Hello');
}

var obj = {
  "a": a,
  'b': b,
  say: say
};
```

위 코드는 다음처럼 줄여서 작성할 수 있다.

```JavaScript
var a = 10;
var b = 20;

function say() {
  console.log('Hello');
}

var obj = {a, b, say};
```

객체가 직접 가진 함수를 메소드라고 부른다. 메소드 작성 시 코드를 다음처럼 줄여서 작성할 수 있다.

```JavaScript
var obj = {
  show: function() {
    console.log('show');
  },
  print() {
    console.log('print');
  }
};
```
