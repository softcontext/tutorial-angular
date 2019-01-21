# Async Await

**참고**  
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function

async 함수는 비동기 함수로써 이벤트 루프를 통해 비동기적으로 작동합니다. 암묵적으로 Promise를 사용하여 결과를 반환합니다. await 연산자는 async 함수의 실행을 일시 중지하고 전달 된 Promise의 해결을 기다린 다음 async 함수의 실행을 다시 시작합니다. async 함수는 복잡한 비동기 함수를 이해하기 쉬운 동기방식의 코드처럼 작성할 수 있도록 도와주는 문법입니다.

```js
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
```

async 함수에 이해를 돕기위해서 일반 함수로 변경해 보겠습니다.

```js
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
```

주석처리한 함수와 새로 작성한 함수는 결과적으로 같습니다. 이를 바탕으로 다음과 같은 사실을 파악할 수 있습니다.

* await 앞에 할당된 변수는 then 함수에게 전달되는 콜백함수의 파라미터와 같다.
* await 밑에 배치된 코드는 then 함수에게 전달되는 콜백함수 내 로직이다.
* async 함수는 암묵적으로 Promise를 반환한다.
* async 함수의 return 구문은 즉시 반환되지 않는다. async 함수의 return 구문은 Promise의 resolve 함수를 호출하는 것과 같다.
* async 함수는 Promise를 이용한 비동기 처리 로직을 await 연산자를 이용해 동기방식처럼 취급하여 작성할 수 있도록 도와주는 함수다.

따라서 원한다면 일반 함수 resolveAfter2Seconds()도 async 함수로 바꿀 수 있습니다.

```js
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
```

## 에러처리

```js
/**
 * HTTP Service
 */
function downloadData(url) {
  return new Promise((resolve, reject) => {
    console.log(`#1: try download from ${url} on port 80`);
    setTimeout(() => {
      console.log('#1: Fail: Server Down');
      reject('>>> #1 server down then try another')
    }, 2000);
  })
}

function downloadFallbackData(url) {
  return new Promise((resolve, reject) => {
    console.log(`#2: try download from ${url} on port 8080`);
    setTimeout(() => {
      // 성공 테스트 케이스
      console.log('#2: Success: Server OK');
      resolve('{"message":"Hello World!"}');
      
      // 실패 테스트 케이스
      // console.log('#2: Fail: Server Down');
      // reject('>>> #2 server down then try another')
    }, 2000);
  })
}

/**
 * Util Service
 */
function processDataInWorker(v) {
  return new Promise((resolve, reject) => {
    console.log(`#3: transform JSON to Object`);
    setTimeout(() => {
      console.log(`#3: transform completed`);
      resolve(JSON.parse(v));
    }, 2000);
  })
}

/**
 * Facade Service Provider
 */
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      console.log(e);
      return downloadFallbackData(url) // returns a promise
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    })
    .catch(e => {
      console.log(e);
      throw Error('All Server Down') // returns a error
    });
}

/**
 * Consumer
 */
getProcessedData('https://www.google.com').then(result => {
  console.log(`<p>RESULT: ${result.message}</p>`);
})
.catch(e => {
  console.log(e.message + ' then proceed fall-back handler');
  console.log(`<p>ERROR: ${e.message}</p>`);
});
```

**성공 테스트 케이스**

```bash
#1: try download from https://www.google.com on port 80
#1: Fail: Server Down
>>> #1 server down then try another
#2: try download from https://www.google.com on port 8080
#2: Success: Server OK
#3: transform JSON to Object
#3: transform completed
<p>RESULT: Hello World!</p>
```

**실패 테스트 케이스**

```bash
#1: try download from https://www.google.com on port 80
#1: Fail: Server Down
>>> #1 server down then try another
#2: try download from https://www.google.com on port 8080
#2: Fail: Server Down
>>> #2 server down then try another
All Server Down then proceed fall-back handler
<p>ERROR: All Server Down</p>
```

getProcessedData() 일반함수를 async 함수로 변경합니다.

```js
// function getProcessedData(url) {
//   return downloadData(url) // returns a promise
//     .catch(e => {
//       console.log(e);
//       return downloadFallbackData(url) // returns a promise
//     })
//     .then(v => {
//       return processDataInWorker(v); // returns a promise
//     })
//     .catch(e => {
//       console.log(e);
//       throw Error('All Server Down') // returns a error
//     });
// }

async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    console.log(e);
    try {
      v = await downloadFallbackData(url);
    } catch (e) {
      console.log(e);
      throw Error('All Server Down')
    }
  }
  return processDataInWorker(v);
}
```

async 함수는 동기방식의 로직처럼 try-catch 구문으로 비동기 함수에서 발생하는 예외를 잡아서 처리할 수 있습니다.
