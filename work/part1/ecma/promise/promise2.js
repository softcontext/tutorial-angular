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