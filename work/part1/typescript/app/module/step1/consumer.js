"use strict";
// 1. export default 선언이 되어 있어야만 가능한 문법이다.
// import P from "./provider";
Object.defineProperty(exports, "__esModule", { value: true });
// 2. export default 선언이 없으면 import 하면서 별칭을 붙여서 사용할 수도 있다.
// import * as P from "./provider";
// console.log(P)
// 3. 해체할당 문법을 이용할 수 있다.
// import { add, myNumber1, myObject } from "./provider";
// console.log(add(myNumber1, myObject.myNumber2))
// 4. 해당 파일의 코드를 실행할 수 있다.
require("./provider");
console.log('consumer DONE');
