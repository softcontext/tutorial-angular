// import { add } from "./lodash";
// console.log('consumer result: ' + add(2, 3))

// 실행결과: 사용하지 않는 substract.ts 코드도 실행된다.
// add.ts
// substract.ts
// consumer result: 5

import { add } from "./lodash/add";
console.log('consumer result: ' + add(2, 3))

// 실행결과: 사용하지 않는 substract.ts 코드는 실행되지 않는다.
// add.ts
// consumer result: 5

/**
 * 결론:
 * 사용하지 않는 코드를 실행할 필요가 없으므로 임포트 시 사용하는 것만 실행되도록
 * from 다음 구문을 길게 작성하는 것이 좋다.
 */

// import { map } from 'rxjs/operators'; 코드 보다는
// import { map } from 'rxjs/operators/map'; 코드가 더 낫다.
// RxJS가 이 번거로움을 해결해 주던가 웹팩이 구분해서 번들링을 하던가 하지 않는 한 말이다.