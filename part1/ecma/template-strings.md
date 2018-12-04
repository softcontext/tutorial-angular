# Template Strings

`` Backtick(`) `` 기호로 감싸서 작성한 문자열은 들여쓰기, 줄바꾸기 등이 그대로 유지됩니다. HTML `<pre></pre>` 태그와 비슷합니다.

```JavaScript
var a = 'John Doe';
var b = "Killer";
var c = `
  <div>
    <h1>${a}</h1>
    <p>${b}</p>
  </div>
`;

console.log(c);
```

`${변수}` 표현식을 사용하면 백틱 문자열 가운데에 변수 값을 추가할 수 있습니다.