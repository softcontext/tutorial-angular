# Promise

프라미스는 비동기 조작의 최종 완료나 실패를 표현해주는 객체입니다. 기본적으로 프라미스는 함수에 콜백을 전달하는 대신에, 대기 없이 받은 프라미스 객체에 콜백을 첨부하는 방식입니다.

콜백 함수를 전달해주는 고전적인 방식과는 달리, 프라미스는 아래와 같은 특징들이 보장됩니다.

* 콜백은 자바스크립트 Event Loop가 현재 실행중인 콜 스택을 완료하기 이전에는 절대 호출되지 않습니다.
* 비동기 작업이 성공하거나 실패한 뒤에 then() 을 이용하여 추가한 콜백의 경우에도 위와 같습니다.
* then()을 여러번 사용하여 여러개의 콜백을 추가 할 수 있습니다. 그리고 각각의 콜백은 주어진 순서대로 하나 하나 실행되게 됩니다.

예전에는 여러 비동기 작업을 연속적으로 수행하면 고전적인 콜백 피라미드의 생성으로 이어졌습니다. 일명 `Callback's Hell`이라 불리우죠.

```JavaScript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

doSomething 이라는 비동기 함수의 작업결과를 doSomethingElse 이라고 하는 비동기 함수에게 전달하려다 보면 자연스럽게 콜백함수의 중첩현상이 발생합니다.

프라미스 방식으로 접근한다면, 우리는 콜백 함수들을 반환된 promise에 promise chain을 형성하도록 추가할 수 있습니다.

```JavaScript
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

`doSomething(), doSomethingElse(), doThirdThing(), then(), catch()` 함수 모두 프라미스 객체를 리턴하기 때문에 계속해서 메소드 체이닝을 사용할 수 있습니다. then 함수에서 return 값은 다음 then 함수에 콜백함수의 파라미터로 전달됩니다. return 하지 않으면 파라미터를 주지 않는 것 뿐입니다. 따라서, 다음처럼 catch 함수 다음에 다시 then 함수를 사용할 수 있습니다.

```JavaScript
new Promise((resolve, reject) => {
    console.log('Initial');
    resolve();
})
.then(() => {
    throw new Error('Something failed');
    console.log('Do this'); // Dead code
})
.catch(() => {
    console.log('Do that'); // Resolve error
})
.then(() => {
    console.log('Do this whatever happened before');
});
```

## Error propagation

```JavaScript
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);
```

처리 중간에 에러가 발생하면 다음 then 함수는 작동하지 않고 다음 catch 함수의 콜백함수가 기동합니다. ES8(ECMAScript 2017)에 추가된 async-await 기술을 사용하면 비동기 로직의 콜백함수의 중첩을 동기방식의 코드처럼 작성할 수 있어서 가독성을 향상 시킬 수 있습니다.

```JavaScript
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

## Creating a Promise

```JavaScript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(5000).then(() => saySomething("5 seconds")).catch(failureCallback);
```

참고: `https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises`

## 사용예

```JavaScript
var fs = require('fs');

var promise = new Promise(function(resolve, reject) {
  fs.readFile('data.txt', 'utf-8', function(error, data) {
    if (error) {
      return reject(error);
    }
    resolve(data);
  });
});

promise.then(function(result) {
  console.log(result);
}, function(error) {
  console.log(error.message);
});
```

```JavaScript
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('data.txt')
  .then(function(fileData) {
    return fs.writeFileAsync('message.txt', fileData);
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {
    console.log('Done.');
  });
```
