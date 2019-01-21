// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

async function resolveAfter2Seconds() {
  var result = await new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
  return result;
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  return 'Done';
}

console.log('START');

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