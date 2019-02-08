# Node CLI 프로그래밍

## Step 1

### package.json 생성

```bash
$ npm init -y
```

**package.json**

```bash
{
  "name": "my-node-cli",
  "version": "1.0.0",
  "description": "node cli demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bin": {
    "cli": "./index.js"
  }
}
```

bin 설정을 추가한다.

### 글로벌하게 설치

```bash
$ npm i -g
C:\Users\Seokwon\AppData\Roaming\npm\cli -> C:\Users\Seokwon\AppData\Roaming\npm\node_modules\my-node-cli\index.js
+ my-node-cli@1.0.0
added 1 package in 0.464s
```

* `npm i -g`  
명령어로 bin 객체를 글로벌하게 설치한다. 

* `cli -> index.js`  
콘솔에서 cli 명령어로 index.js 파일을 실행한다.


**C:\Users\Seokwon\AppData\Roaming\npm\cli**

```bash
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/node_modules/my-node-cli/index.js" "$@"
  ret=$?
else 
  node  "$basedir/node_modules/my-node-cli/index.js" "$@"
  ret=$?
fi
exit $ret
```

### 실행코드 작성

**index.js**

```bash
#!/usr/bin/env node

// POSIX 계열의 OS의 /usr/bin/env에 등록된 node 명령어로 이 파일을 실행하라는 뜻이다.

console.log('Hello CLI');
console.log(process.argv);
```

```bash
$ cli one 2 three
Hello CLI
[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Seokwon\\AppData\\Roaming\\npm\\node_modules\\my-node-cli\\index.js',
  'one',
  '2',
  'three' ]
```

## Step 2

**index.js**

```js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';

const htmlTemplate = `<html>
<head>
  <title>Title</title>
</head>
<body>
  <h3>Title</h3>
  <p>CLI</p>
</body>
</html>
`;

const routerTemplate = `const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path.relative('.', path.normalize(dir)).split(path.sep).filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => {
  mkdirp(directory);
  
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } else if (type === 'router'){
    const pathToFile = path.join(directory, `${name}.js`);
    
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } else {
    console.error('Useage: cli html|router filename [path]');
  }
};

const program = () => {
  if (!type || !name) {
    console.error('Useage: cli html|router filename [path]');
  } else {
    makeTemplate();
  }
};

program();
```


## Step 3. 제거

```bash
$ npm rm -g my-node-cli
```
