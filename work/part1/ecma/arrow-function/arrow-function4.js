// foo 함수안에 존재하는 지역함수도 그 함수의 this는
// 함수가 호출될 때 결정됩니다.
// 따라서, foo의 this와 콜백함수의 this는 같지 않습니다.
// 콜백함수의 this를 foo 함수의 this와 같게 하려면
// 추가적인 조치가 필요합니다.
function foo() {
  console.log(this === foo); // true

  setTimeout(function() {
    console.log(this === foo); // false
    console.log(this.a); // undefined
  }, 1000);
}

foo.a = 'a in foo';

foo.call(foo);

///////////////////////////////////

function foo() {
  console.log(this === foo); // true

  setTimeout((function() {
    console.log(this === foo); // true
    console.log(this.a); // func
  }).bind(this), 100);
}

foo.a = 'a in foo';

foo.call(foo);