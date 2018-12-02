/**
 * 과제 : 출력 결과를 예상하고 왜 그런지 설명해 보자.
 */

for (var i = 1; i <= 3; i++) {
  console.log('i =', i);
}

for (var j = 1; j <= 3; j++) {
  setTimeout(function () {
    console.log('j =', j);
  }, 2000);
}

for (var k = 1; k <= 3; k++) {
  (function() {
    var count = k;
    setTimeout(function () {
      console.log('count =', count);
    }, 3000);
  }());
}

for (let m = 1; m <= 3; m++) {
  setTimeout(function () {
    console.log('m =', m);
  }, 4000);
}

console.log('Done');

var oldTime = Date.now();

while (Date.now() < oldTime + 1000) {}

console.log('End of Code');