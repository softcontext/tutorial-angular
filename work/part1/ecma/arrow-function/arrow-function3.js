global.a = 'a in global';

function foo() {
  console.log(this.a);
}

foo.a = 'a in foo';

foo(); 
// a in global

//
foo.call(foo); 
// a in foo