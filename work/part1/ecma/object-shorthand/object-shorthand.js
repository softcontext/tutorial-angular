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

var obj = {a, b, say};

var obj = {
  show: function() {
    console.log('show');
  },
  print() {
    console.log('print');
  }
};