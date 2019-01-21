function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

// 함수 앞에 async를 붙이면 함수내에서 await 연산자를 사용할 수 있다.
async function asyncCall() {
  console.log('calling');
  // Promise를 리턴하는 함수를 await 할 수 있다.
  var result = await resolveAfter2Seconds();
  console.log(result);
  return 'Done';
}

console.log('START');

// async 함수는 Promise를 반환한다.
asyncCall().then(result => {
  console.log(result);
});

console.log('END');

// START
// calling
// END
// <2초 대기>
// resolved
// Done