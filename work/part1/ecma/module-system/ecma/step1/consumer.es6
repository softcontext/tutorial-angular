import * as provider from './provider';

console.log(provider.a);
provider.say();
console.log(provider.add(2, 3));

import {a, say} from './provider';

console.log(a);
say();