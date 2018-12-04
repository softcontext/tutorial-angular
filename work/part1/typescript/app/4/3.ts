if (true) {
  let obj = {
    name: 'Tom',
    address: 'Seoul'
  };

  let keys = Object.keys(obj); // 프로퍼티 키들에 대한 배열 획득
  console.log(keys); // [ 'name', 'address' ]

  for (let i = 0; i < keys.length; i++) {
    console.log(obj[keys[i]]);
  }
}

if (true) {
  interface IObj {
    // Index Signature: Indexable Type 허용
    [idx: string]: string | number; // Union Type 허용
  }

  let obj: IObj = {
    name: 'Tom',
    address: 'Seoul'
  };

  let keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    // Index로 객체의 프로퍼티에 접근
    console.log(obj[keys[i]]);
  }
}