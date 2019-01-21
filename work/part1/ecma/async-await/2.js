function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

// async function asyncCall() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   return 'Done';
// }

function asyncCall() {
  return new Promise(resolve => {
    console.log('calling');
    resolveAfter2Seconds().then(result => {
      console.log(result);
      resolve('Done');
    })
  });
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