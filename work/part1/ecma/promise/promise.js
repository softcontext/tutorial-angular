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