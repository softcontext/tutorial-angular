function foo() {
  setTimeout(() => {
    console.log(this.a); // a in foo
  }, 100);
}

foo.a = 'a in foo';

foo.call(foo);

////////////////////

function foo() {
  var that = this; 
  // 애로우 함수의 this는 바로 가장 가까운 스코프의 this입니다.
  setTimeout(() => {
    console.log(that.a); // a in foo
  }, 100);
}

foo.a = 'a in foo';

foo.call(foo);