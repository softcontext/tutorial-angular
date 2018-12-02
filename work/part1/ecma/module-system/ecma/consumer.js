'use strict';

var _provider = require('./provider');

var provider = _interopRequireWildcard(_provider);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(provider.a);
provider.say();
console.log(provider.add(2, 3));

console.log(_provider.a);
(0, _provider.say)();