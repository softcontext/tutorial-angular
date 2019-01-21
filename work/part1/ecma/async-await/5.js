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
      // console.log('#2: Success: Server OK');
      // resolve('{"message":"Hello World!"}');

      // 실패 테스트 케이스
      console.log('#2: Fail: Server Down');
      reject('>>> #2 server down then try another')
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