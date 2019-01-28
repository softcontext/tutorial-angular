# Angular with Node + Express + sequelize

## Express CLI

```bash
$ npm i -g express-generator
```

# 노드 서버 프로젝트

hbs(Handlebars)를 HTML Eninge 기술로 사용하도록 설정합니다. 하지만, 프론트 엔드 UI는 앵귤러를 사용하여 구축합니다. Express로 구축하는 노드 서버 프로젝트는 API로써의 역할을 수행합니다.

```bash
$ express my-express --view=hbs --css=sass

   create : my-express\
   create : my-express\public\
   create : my-express\public\javascripts\
   create : my-express\public\images\
   create : my-express\public\stylesheets\
   create : my-express\public\stylesheets\style.sass
   create : my-express\routes\
   create : my-express\routes\index.js
   create : my-express\routes\users.js
   create : my-express\views\
   create : my-express\views\error.hbs
   create : my-express\views\index.hbs
   create : my-express\views\layout.hbs
   create : my-express\app.js
   create : my-express\package.json
   create : my-express\bin\
   create : my-express\bin\www

   change directory:
     > cd my-express

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=my-express:* & npm start
```

**package.json**

```json
{
  "name": "my-express",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "hbs": "~4.0.1",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "node-sass-middleware": "0.11.0"
  }
}
```

## Session

```bash
$ npm i express-session
```

**app.js**

```js
const session = require('express-session');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
```

## Flash Message

connect-flash 모듈은 POST-REDIRECT-GET 패턴을 적용할 때 사용합니다. 다음 링크에서 자세한 정보를 확인하세요.  
`https://en.wikipedia.org/wiki/Post/Redirect/Get`

**connect-flash**

```bash
$ npm i connect-flash
```

**app.js**

```js
const flash = require('connect-flash');

app.use(flash());
```

**routes\users.js**

```js
// TRY: http://localhost:3000/users/flash
router.get('/flash', function (req, res) {
  req.session.message = 'Session Message';
  req.flash('message', 'Flash Message');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function (req, res) {
  res.send(`req.session.message=${req.session.message}, req.flash('message')=${req.flash('message')}`);
});
```

## Sequelize

ORM 기술입니다. JS 코드로 디비, 테이블을 제어할 수 있습니다. 가장 강력한 기능은 개발자가 직접 쿼리작성을 하는 대신 엔티티의 관계를 설정하면 Sequelize가 SQL 쿼리를 자동으로 생성하기 때문에 매우 편리합니다.

```bash
$ npm i sequelize mysql2
```

**sequelize-cli**

```bash
$ npm i -g sequelize-cli
$ sequelize init

Sequelize CLI [Node: 10.14.1, CLI: 5.4.0, ORM: 4.42.0]

Created "config\config.json"
Successfully created models folder at "C:\...\my-express\models".
Successfully created migrations folder at "C:\...\my-express\migrations".
Successfully created seeders folder at "C:\...\my-express\seeders".
```

sequelize-cli가 생성한 파일의 내용을 다음처럼 변경합니다.

**models\index.js**

```js
// 'use strict';

// const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

준비된 MySQL 또는 MariaDB의 연결정보를 config.json 파일에 설정합니다.

**config\config.json**

```json
{
  "development": {
    "username": "root",
    "password": "1111",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

**sql\dummy.js**

```js
const { User, Todo } = require('../models');

// Insert Dummy Data for Test
module.exports = async () => {
  try {
    await User.create({ name: 'oliver', age: 20, married: false, comment: 'programmer' });
    await User.create({ name: 'jack', age: 21, married: false, comment: 'designer' });
    await User.create({ name: 'harry', age: 30, married: true, comment: 'programmer' });
    await User.create({ name: 'jacob', age: 25, married: false, comment: 'designer' });
    await User.create({ name: 'charlie', age: 34, married: false, comment: 'programmer' });
    await User.create({ name: 'thomas', age: 33, married: false, comment: 'designer' });
    await User.create({ name: 'george', age: 40, married: true, comment: 'teacher' });
    await User.create({ name: 'oscar', age: 49, married: true, comment: 'salesman' });
    await User.create({ name: 'james', age: 55, married: false, comment: 'salesman' });
    await User.create({ name: 'william', age: 66, married: true, comment: 'none' });
    await User.create({ name: 'jake', age: 18, married: false, comment: 'teacher' });
    console.log('▶ 11 users inserted.');
    
    await Todo.create({ owner: 1, task: 'to learn node 1', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 2', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 3', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 4', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 5', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 6', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 7', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 8', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 9', done: false });
    await Todo.create({ owner: 1, task: 'to learn node 10', done: true });
    await Todo.create({ owner: 1, task: 'to learn node 11', done: false });
    console.log('▶ 11 todos inserted.');
  } catch (err) {
    console.error(err);
    throw err;
  }
}
```

**app.js**

```js
const { sequelize } = require('./models');

// app.get('env') returns 'development' 
// if process.env.NODE_ENV is not defined.
console.log('----------------------');
console.log('MODE: ' + app.get('env'));
console.log('----------------------');

/*
 * connect to DB
 */
if (app.get('env') === 'development') {
  // If force is true, each Model will run DROP TABLE IF EXISTS, 
  // before it tries to create its own table
  sequelize.sync({
    force: true,
  }).then(() => {
    // Insert Dummy Data for Test
    require('./sql/dummy')();
  });
} else {
  sequelize.sync({
    // default value
    force: false,
  });
}
```

**models\user.js**

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
  }, {
    timestamps: false,
  });
};
```

**models\todo.js**

```js
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('todo', {
    task: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: false,
    },
    done: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
  });
}
```

index.js 파일의 내용을 다음처럼 수정합니다.

**models\index.js**

```js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Todo = require('./todo')(sequelize, Sequelize);

// One User has Many Todos.
// Users 테이블의 id를 Todos 테이블의 owner 칼럼에 넣는다.
db.User.hasMany(db.Todo, {
  foreignKey: 'owner', 
  sourceKey: 'id',
});
// One Todo belongs to One User.
// Users 테이블의 id를 Todos 테이블의 owner 칼럼에 넣는다.
db.Todo.belongsTo(db.User, {
  foreignKey: 'owner', 
  targetKey: 'id',
});

module.exports = db;
```

## DB 생성

```bash
$ sequelize db:create

Sequelize CLI [Node: 10.14.1, CLI: 5.4.0, ORM: 4.42.0]

Loaded configuration file "config\config.json".
Using environment "development".
sequelize deprecated String based operators are now deprecated. 
Please use Symbol based operators for better security, 
read more at http://docs.sequelizejs.com/manual/tutorial/querying.html#operators 
node_modules\sequelize\lib\sequelize.js:242:13

Database database_development created.
```

## 테이블 생성

```bash
$ npm start

> my-express@0.0.0 start C:\...\my-express
> node ./bin/www

sequelize deprecated String based operators are now deprecated. 
Please use Symbol based operators for better security, 
read more at http://docs.sequelizejs.com/manual/tutorial/querying.html#operators 
node_modules\sequelize\lib\sequelize.js:242:13

Server listening on port 3000

Executing (default): 
  CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(20) NOT NULL UNIQUE, 
    `age` INTEGER UNSIGNED NOT NULL, 
    `married` TINYINT(1) NOT NULL, 
    `comment` TEXT, 
    `created_at` DATETIME NOT NULL DEFAULT now(), 
    PRIMARY KEY (`id`)) ENGINE=InnoDB;
    
Executing (default): 
  SHOW INDEX FROM `users` FROM `database_development`
  
Executing (default): 
  CREATE TABLE IF NOT EXISTS `todos` (
    `id` INTEGER NOT NULL auto_increment , 
    `task` VARCHAR(100) NOT NULL, 
    `done` TINYINT(1) NOT NULL DEFAULT false, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    `deleted_at` DATETIME, 
    `owner` INTEGER, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`owner`) REFERENCES `users` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
  
Executing (default): 
  SHOW INDEX FROM `todos` FROM `database_development`
```

`IF NOT EXISTS` 옵션을 사용하므로 없는 경우에만 테이블을 생성합니다.

## Restful API Service Routing

**routes\users.js**

```js
var express = require('express');
var router = express.Router();
const { User, Todo } = require('../models');

// ---------------------------------------
// TEST
// TRY: http://localhost:3000/users/flash
router.get('/flash', function(req, res) {
  req.session.message = 'Session Message';
  req.flash('message', 'Flash Message');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req, res) {
  res.send(`req.session.message=${req.session.message}, req.flash('message')=${req.flash('message')}`);
});
// ---------------------------------------

// req.params : Path Variable(URL Segment)값을 갖고 있다.
// req.body : Body 영역에 할당되어 전달되는 값을 갖고 있다.
// req.query : 물음표(?) 뒤에 설정되는 Search(Query Params) 값을 갖고 있다.

router.get('/', function(req, res, next) {
  User.findAll({}).then((users) => {
    // 반환결과는 다음과 같다.
    // [
    //   {
    //       "id": 1,
    //       "name": "john",
    //       "age": 24,
    //       "married": false,
    //       "comment": "programmer",
    //       "created_at": "2019-01-25T18:10:32.000Z"
    //   },
    //   {
    //       "id": 2,
    //       "name": "tom",
    //       "age": 32,
    //       "married": true,
    //       "comment": "actor",
    //       "created_at": "2019-01-25T18:10:32.000Z"
    //   }
    // ]
    res.json(users);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

router.get('/:id', function(req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then((user) => {
    // 반환결과는 다음과 같다.
    // {
    //   "id": 1,
    //   "name": "john",
    //   "age": 24,
    //   "married": false,
    //   "comment": "programmer",
    //   "created_at": "2019-01-25T18:10:32.000Z"
    // }
    res.json(user);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

router.post('/', function(req, res, next) {
  // 예상쿼리는 다음과 같다.
  // INSERT INTO users(name, age, married, comment) VALUES('john', 24, 0, 'programmer');

  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
    comment: req.body.comment,
  }).then((user) => {
    console.log(user); 
    // 반환결과는 다음과 같다.
    // {
    //   created_at: '2019-01-26T08:53:56.491Z',
    //   id: 7,
    //   name: '11',
    //   age: 22,
    //   married: false,
    //   comment: '33'
    // }
    res.json(user);
  }).catch((err) => {
    console.error(err);
    next(err);
  })
  // 실제로 사용된 쿼리는 다음과 같다.
  // INSERT INTO `users` (`id`,`name`,`age`,`married`,`comment`,`created_at`) 
  // VALUES (DEFAULT,'11',22,false,'33',now());
});

router.put('/:id', function(req, res, next) {
  User.update({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
    comment: req.body.comment,
  }, {
    where: {
      id: req.params.id,
    }
  }).then((affectedRowsArray) => {
    console.log(affectedRowsArray);
    // [ 1 ]
    res.json(affectedRowsArray);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

router.delete('/:id', function(req, res, next) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then((affectedRows) => {
    console.log(affectedRows);
    // 1
    res.json(affectedRows);
  }).catch((err) => {
    console.error(err);
    next(err);
  })
});

module.exports = router;
```

**routes\todos.js**

```js
var express = require('express');
var router = express.Router();
const { User, Todo, Sequelize: { Op, where, fn, col } } = require('../models');

// 주목: fn('date', col('created_at')) 함수로 처리하면 아래 둘다 가능하다.
// http://localhost:3000/todos?created_at=20190126
// http://localhost:3000/todos?created_at=2019-01-26
router.get('/', async function(req, res, next) {
  const filter = {};
  
  if (req.query.created_at) {
    console.log(req.query.created_at);
    filter.created_at = where(fn('date', col('created_at')), '=', req.query.created_at);
  }
  
  // 명시하지 않으면 [Op.and] 연산이 적용된다. and 연산일 때는 굳이 아래처럼 할 필요가 없다.
  // const filter = {
  //   [Op.and]: [
  //     {
  //       id: req.params.id,
  //     },
  //   ]
  // };
  // 
  // if (req.query.created_at) {
  //   filter[Op.and].push(where(fn('date', col('created_at')), '=', req.query.created_at));
  // }
  
  try {
    const todos = await Todo.findAll({
      where: filter
    });
    console.log(todos);
    // 반환결과는 다음과 같다.
    // [
    //   {
    //     id: 1,
    //     task: "to learn node 1",
    //     done: false,
    //     created_at: "2019-01-26T12:16:18.000Z",
    //     updated_at: "2019-01-26T12:16:18.000Z",
    //     deleted_at: null,
    //     owner: 1
    //   },
    //   ...
    //   {
    //     id: 11,
    //     task: "to learn node 11",
    //     done: false,
    //     created_at: "2019-01-26T12:16:18.000Z",
    //     updated_at: "2019-01-26T12:16:18.000Z",
    //     deleted_at: null,
    //     owner: 1
    //   }
    // ]
    res.json(todos);
  } catch (e) {
    console.error(err);
    next(err);
  }
  // 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  //   `id`, `task`, `done`, `created_at`, `updated_at`, `deleted_at`, `owner` 
  // FROM `todos` AS `todo` 
  // WHERE (
  //   (`todo`.`deleted_at` > '2019-01-26 12:23:12' OR `todo`.`deleted_at` IS NULL) 
  //   AND 
  //   date(`created_at`) = '20190126'
  // );
});

router.get('/:id', async function(req, res, next) {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(todo);
    // 반환결과는 다음과 같다.
    // {
    //   "id": 1,
    //   "task": "go shpping",
    //   "done": true,
    //   "created_at": "2019-01-25T17:52:51.000Z",
    //   "updated_at": "2019-01-25T17:52:51.000Z",
    //   "deleted_at": null,
    //   "owner": 1
    // }
    res.json(todo);
  } catch (e) {
    console.error(err);
    next(err);
  }
  // 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  //   `id`, `task`, `done`, `created_at`, `updated_at`, `deleted_at`, `owner` 
  // FROM `todos` AS `todo` 
  // WHERE (
  //   (`todo`.`deleted_at` > '2019-01-26 12:16:25' OR `todo`.`deleted_at` IS NULL) 
  //   AND 
  //   `todo`.`id` = '1'
  // );
});

router.post('/', async function(req, res, next) {
  // 예상쿼리는 다음과 같다.
  // INSERT INTO todos(owner, task, done) VALUES(1, 'go shpping', 1);
  try {
    const todo = await Todo.create({
      owner: req.body.owner,
      task: req.body.task,
      done: req.body.done,
    });
    console.log(todo);
    // 반환결과는 다음과 같다.
    // {
    //   "id": 3,
    //   "owner": 1,
    //   "task": "to study",
    //   "done": false,
    //   "updated_at": "2019-01-26T07:54:47.651Z",
    //   "created_at": "2019-01-26T07:54:47.651Z"
    // }
    res.json(todo);
  } catch (e) {
    console.error(err);
    next(err);
  }
  // 실제로 사용된 쿼리는 다음과 같다.
  // INSERT INTO `todos` (`id`,`task`,`done`,`created_at`,`updated_at`,`owner`) 
  // VALUES (DEFAULT,'to study',false,'2019-01-26 07:54:47','2019-01-26 07:54:47',1);
});

router.put('/:id', async function(req, res, next) {
  try {
    const affectedRowsArray = await Todo.update({
      owner: req.body.owner,
      task: req.body.task,
      done: req.body.done,
    }, {
      where: {
        id: req.params.id,
      }
    });
    console.log(affectedRowsArray);
    // 반환결과는 다음과 같다.
    // [ 1 ]
    res.json(affectedRowsArray);
  } catch (e) {
    console.error(err);
    next(err);
  }
  // 주목: updated_at 칼럼의 정보는 자동으로 갱신된다.
});

router.delete('/:id', async function(req, res, next) {
  try {
    const affectedRows = await Todo.destroy({
      where: {
        id: req.params.id,
      }
    });
    console.log(affectedRows);
    // 반환결과는 다음과 같다.
    // 1
    res.json(affectedRows);
  } catch (e) {
    console.error(err);
    next(err);
  }
  // 주목: 로우가 삭제되는 대신 deleted_at 칼럼에 삭제시각 정보가 입력된다.
});

module.exports = router;
```

**routes\users.todos.js**

```js
var express = require('express');
var router = express.Router();
const { User, Todo, Sequelize: { Op, where, fn, col } } = require('../models');

function seekOffset(page, size) {
	if (page > 0) {
		return (page - 1) * size;
	}
	return 0;
}

// http://localhost:3000/deep/users?page=1&size=3
router.get('/', function(req, res, next) {
  let page = 1;
  let size = 10;
  
  if (req.query.page) {
    page = +req.query.page;
  }
  if (req.query.size) {
    size = +req.query.size;
  }
  
  const limit = size;
  const offset = seekOffset(page, size);
  
  User.findAll({
    limit,
    offset,
    include: {
      model: Todo,
    },
  }).then((users) => {
    // 반환결과는 다음과 같다.
    // [
    //   {
    //     id: 1,
    //     name: "chris",
    //     age: 20,
    //     married: false,
    //     comment: "programmer",
    //     created_at: "2019-01-26T10:34:13.000Z",
    //     todos: [
    //       {
    //         id: 1,
    //         task: "to learn node",
    //         done: false,
    //         created_at: "2019-01-26T10:34:13.000Z",
    //         updated_at: "2019-01-26T10:34:13.000Z",
    //         deleted_at: null,
    //         owner: 1
    //       }
    //       ...
    //     ]
    //   }
    //   ...
    // ]
    res.json(users);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
  // 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  //   `user`.`id`, `user`.`name`, `user`.`age`, 
  //   `user`.`married`, `user`.`comment`, `user`.`created_at`, 
  //   `todos`.`id` AS `todos.id`, `todos`.`task` AS `todos.task`, 
  //   `todos`.`done` AS `todos.done`, `todos`.`created_at` AS `todos.created_at`, 
  //   `todos`.`updated_at` AS `todos.updated_at`, `todos`.`deleted_at` AS `todos.deleted_at`, 
  //   `todos`.`owner` AS `todos.owner` 
  // FROM `users` AS `user` LEFT OUTER JOIN `todos` AS `todos` 
  // ON `user`.`id` = `todos`.`owner` 
  // AND (`todos`.`deleted_at` > '2019-01-26 10:34:28' OR `todos`.`deleted_at` IS NULL);
  
  // limit, offset을 추가로 설정하면 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  //   `user`.*, 
  //   `todos`.`id` AS `todos.id`, `todos`.`task` AS `todos.task`, 
  //   `todos`.`done` AS `todos.done`, `todos`.`created_at` AS `todos.created_at`, 
  //   `todos`.`updated_at` AS `todos.updated_at`, `todos`.`deleted_at` AS `todos.deleted_at`, 
  //   `todos`.`owner` AS `todos.owner` 
  // FROM (
  //   SELECT `user`.`id`, `user`.`name`, `user`.`age`, `user`.`married`, `user`.`comment`, `user`.`created_at` 
  //   FROM `users` AS `user` LIMIT 0, 3
  // ) AS `user` LEFT OUTER JOIN `todos` AS `todos` 
  // ON `user`.`id` = `todos`.`owner` 
  // AND (`todos`.`deleted_at` > '2019-01-26 12:44:12' OR `todos`.`deleted_at` IS NULL);
});

// http://localhost:3000/deep/users/1?page=1&size=3&sort=id,desc
// http://localhost:3000/deep/users/1?page=1&size=3&sort=id,asc
router.get('/:id', function(req, res, next) {
  let page = 1;
  let size = 10;
  
  if (req.query.page) {
    page = +req.query.page;
  }
  if (req.query.size) {
    size = +req.query.size;
  }
  
  const limit = size;
  const offset = seekOffset(page, size);
  const order = [];
  
  if (req.query.sort) {
    order.push(req.query.sort.split(','));
    console.log(order);
    // [ [ 'id', 'asc' ] ]
  }
  
  User.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Todo,
      limit,
      offset,
      order,
    },
  }).then((user) => {
    // 반환결과는 다음과 같다.
    // {
    //   id: 1,
    //   name: "chris",
    //   age: 20,
    //   married: false,
    //   comment: "programmer",
    //   created_at: "2019-01-26T10:34:13.000Z",
    //   todos: [
    //     {
    //       id: 1,
    //       task: "to learn node",
    //       done: false,
    //       created_at: "2019-01-26T10:34:13.000Z",
    //       updated_at: "2019-01-26T10:34:13.000Z",
    //       deleted_at: null,
    //       owner: 1
    //     }
    //   ]
    // }
    res.json(user);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
  // 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  //   `user`.`id`, `user`.`name`, `user`.`age`, 
  //   `user`.`married`, `user`.`comment`, `user`.`created_at`, 
  //   `todos`.`id` AS `todos.id`, `todos`.`task` AS `todos.task`, 
  //   `todos`.`done` AS `todos.done`, `todos`.`created_at` AS `todos.created_at`, 
  //   `todos`.`updated_at` AS `todos.updated_at`, `todos`.`deleted_at` AS `todos.deleted_at`, 
  //   `todos`.`owner` AS `todos.owner` 
  // FROM `users` AS `user` LEFT OUTER JOIN `todos` AS `todos` 
  // ON `user`.`id` = `todos`.`owner` 
  // AND (`todos`.`deleted_at` > '2019-01-26 10:41:21' OR `todos`.`deleted_at` IS NULL) 
  // WHERE `user`.`id` = '1';
  
  // limit, offset을 추가로 설정하면 실제로 사용된 쿼리는 다음과 같다.
  // SELECT 
  // 	`user`.`id`, `user`.`name`, `user`.`age`, `user`.`married`, `user`.`comment`, `user`.`created_at` 
  // FROM `users` AS `user` 
  // WHERE `user`.`id` = '1';
  // 
  // SELECT 
  // 	`id`, `task`, `done`, `created_at`, `updated_at`, `deleted_at`, `owner` 
  // FROM `todos` AS `todo` 
  // WHERE (
  // 	(`todo`.`deleted_at` > '2019-01-28 00:40:24' OR `todo`.`deleted_at` IS NULL) 
  // 	AND 
  // 	(`todo`.`owner` IN (1) AND (`todo`.`deleted_at` > '2019-01-28 00:40:24' OR `todo`.`deleted_at` IS NULL))
  // ) 
  // ORDER BY `todo`.`id` ASC 
  // LIMIT 0, 3;
});

module.exports = router;
```

## Pagination

클라이언트에게 데이터와 더불어서 페이징 처리를 위한 부가정보를 구해서 전달하는 방법을 살펴봅니다.

**routes\pager.users.js**

```js
const { Router } = require('express');
const { User, Todo, Sequelize: { Op, where, fn, col }, sequelize } = require('../models');
const url = require('url');

const router = Router();

function seekOffset(page, size) {
	if (page > 0) {
		return (page - 1) * size;
	}
	return 0;
}

class Query {
  constructor(page, size, bsize) {
    this.page = page;
    this.size = size;
    this.bsize = bsize;
  }
}

class Path {
  constructor(active, link, query, text) {
    this.active = active;
    this.link = link;
    this.query = query;
    this.text = text;
  }
}
	
class Pager {
	
	constructor(page=1, size=10, bsize=5, rows=0, url){
		if (!url) {
			throw Error('url is required');
		}
		
		this.currentPage; // 현재 페이지(사용자가 보고싶은 페이지)
		this.elementsPerPage; // 페이지당 표시하는 로우의 개수
		this.pagesPerBlock; // 하단에 표시하는 페이징 넘버의 개수
		this.totalElements; // 테이블이 갖고 있는 모든 로우의 개수
		
		this.totalPages; // 전체 페이지 수
		this.totalBlocks; // 전체 블럭 수 
		
		this.currentBlock; // 현재 블럭
		this.currentBlockStartPage; // 현재 블럭의 시작 페이지 번호
		this.currentBlockEndPage; // 현재 블럭의 끝 페이지 번호
		
		this.beforePage; // 이전 페이지
		this.nextPage; // 다음 페이지
		
		this.paths = []; // Path's Array for Pagination
		
		this.currentPage = page; 
		if (this.currentPage <= 0) {
			this.currentPage = 1;
		}
		this.elementsPerPage = size;
		if (this.elementsPerPage <= 0) {
			this.elementsPerPage = 1;
		}
		this.pagesPerBlock = bsize;
		if (this.pagesPerBlock <= 0) {
			this.pagesPerBlock = 1;
		}
		this.totalElements = rows;

		this.totalPages = Math.ceil(this.totalElements / this.elementsPerPage);
		this.totalBlocks = Math.ceil(this.totalPages / this.pagesPerBlock);
		
		this.currentBlock = Math.ceil(this.currentPage / this.pagesPerBlock);
		this.currentBlockEndPage = this.currentBlock * this.pagesPerBlock;
		this.currentBlockStartPage = this.currentBlockEndPage - this.pagesPerBlock + 1;
		
		/*
		 * For Simple Paging with 2 Buttons (Before, Next)
		 */
		this.beforePage = this.currentPage - 1;
		if (this.beforePage < 0) {
			this.beforePage = 0;
		}
		this.nextPage = this.currentPage + 1;
		if (this.nextPage > this.totalPages) {
			this.nextPage = 0;
		}
		
		this.proceedPath(url);
	}
	
	proceedPath(url) {
		if (this.totalElements > 0) { // 로우가 있을 때
			if (this.currentBlockStartPage > this.pagesPerBlock) {
				// Home 버튼
				this.addPath(new Path('', url, 
					new Query(1, this.elementsPerPage, this.pagesPerBlock), 'Home'));
				// 이전 블럭
				this.addPath(new Path('', url, 
					new Query(this.currentBlockStartPage-1, this.elementsPerPage, this.pagesPerBlock), '<<'));
			}
			
			// Paging 버튼
			for (let pno = this.currentBlockStartPage; pno <= this.currentBlockEndPage; pno++) {
				if (pno == this.currentPage) {
					this.addPath(new Path('active', url, 
						new Query(pno, this.elementsPerPage, this.pagesPerBlock), pno.toString(10)));
				} else {
					if (pno <= this.totalPages) {
						this.addPath(new Path('', url, 
							new Query(pno, this.elementsPerPage, this.pagesPerBlock), pno.toString(10)));
					}
				}
			}
			
			if (this.currentBlockEndPage < this.totalPages) {
				// 이후 블럭
				this.addPath(new Path('', url, 
					new Query(this.currentBlockEndPage+1, this.elementsPerPage, this.pagesPerBlock), '>>'));
				// Last 버튼
				this.addPath(new Path('', url, 
					new Query(this.totalPages, this.elementsPerPage, this.pagesPerBlock), 'Last'));
			}
		} else { // 로우가 없을 때
			this.addPath(new Path('', url, 
				new Query(1, this.elementsPerPage, this.pagesPerBlock), '1'));
		}
	}
	
	addPath(path) {
		this.paths.push(path);
	}
	
}

// http://localhost:3000/pager/users?page=1&size=3&bsize=2
router.get('/pager/users', function(req, res, next) {
  let page = 1;
  let size = 10;
  let bsize = 5;
  
  if (req.query.page) {
    page = +req.query.page;
  }
  if (req.query.size) {
    size = +req.query.size;
  }
  if (req.query.bsize) {
    bsize = +req.query.bsize;
  }
  
  const limit = size;
  const offset = seekOffset(page, size);
	
	// query() 함수를 이용하여 로우 쿼리를 사용할 수 있다.
	// 주목: { type: sequelize.QueryTypes.SELECT} 옵션을 설정하지 않으면 
	// 메타정보를 위한 쿼리가 추가로 수행된다.
	sequelize.query('SELECT COUNT(*) as count FROM users', { type: sequelize.QueryTypes.SELECT})
	.then((result) => {
		console.log(url.parse(req.url));
		// 주목: pathname 값은 router.get() 함수에 설정한 문자열을 가져온다.
		// {
		//   ...
		//   search: '?page=1&size=3&bsize=2',
		//   query: 'page=1&size=3&bsize=2',
		//   pathname: '/pager/users',
		//   path: '/pager/users?page=1&size=3&bsize=2',
  	// 	 href: '/pager/users?page=1&size=3&bsize=2'
		// }
		
		console.log('result: ', result);
		// 주목: 결과가 배열에 담겨있다.
		// result:  [ { count: 11 } ]
		const rows = result[0].count;
		
		const pager = new Pager(page, size, bsize, rows, url.parse(req.url).pathname);
		console.log(pager);
		// {
		//   paths: [
		//     {
		//       active: "active",
		//       link: "/pager/users",
		//       query: {
		//         page: 1,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "1"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 2,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "2"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 3,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: ">>"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 4,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "Last"
		//     }
		//   ],
		//   currentPage: 1,
		//   elementsPerPage: 3,
		//   pagesPerBlock: 2,
		//   totalElements: 11,
		//   totalPages: 4,
		//   totalBlocks: 2,
		//   currentBlock: 1,
		//   currentBlockEndPage: 2,
		//   currentBlockStartPage: 1,
		//   beforePage: 0,
		//   nextPage: 2
		// }
		
		return pager;
	}).then((pager) => {
		// 주목: Promise 체이닝을 위해서 return 해야 한다.
		return User.findAll({
	    limit,
	    offset,
	  }).then((users) => {
			// 모두 정상이라면 여기서 작업이 완료된다.
	    res.json({users, pager});
	  });
	}).catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
```

**app.js**

```js
var pagerUsersRouter = require('./routes/pager.users');

app.use('/', pagerUsersRouter);
```

다음 주소로 접속하여 결과를 확인합니다.  
`http://localhost:3000/pager/users?page=1&size=3&bsize=2`

```json
{
  "users": [
    {
      "id": 1,
      "name": "oliver",
      "age": 20,
      "married": false,
      "comment": "programmer",
      "created_at": "2019-01-28T03:38:14.000Z"
    },
    {
      "id": 2,
      "name": "jack",
      "age": 21,
      "married": false,
      "comment": "designer",
      "created_at": "2019-01-28T03:38:14.000Z"
    },
    {
      "id": 3,
      "name": "harry",
      "age": 30,
      "married": true,
      "comment": "programmer",
      "created_at": "2019-01-28T03:38:14.000Z"
    }
  ],
  "pager": {
    "paths": [
      {
        "active": "active",
        "link": "/pager/users",
        "query": {
          "page": 1,
          "size": 3,
          "bsize": 2
        },
        "text": "1"
      },
      {
        "active": "",
        "link": "/pager/users",
        "query": {
          "page": 2,
          "size": 3,
          "bsize": 2
        },
        "text": "2"
      },
      {
        "active": "",
        "link": "/pager/users",
        "query": {
          "page": 3,
          "size": 3,
          "bsize": 2
        },
        "text": ">>"
      },
      {
        "active": "",
        "link": "/pager/users",
        "query": {
          "page": 4,
          "size": 3,
          "bsize": 2
        },
        "text": "Last"
      }
    ],
    "currentPage": 1,
    "elementsPerPage": 3,
    "pagesPerBlock": 2,
    "totalElements": 11,
    "totalPages": 4,
    "totalBlocks": 2,
    "currentBlock": 1,
    "currentBlockEndPage": 2,
    "currentBlockStartPage": 1,
    "beforePage": 0,
    "nextPage": 2
  }
}
```

## CORS

콘텐츠 배포자의 권리를 보호하기 위해서 도메인이 다르면 브라우저가 자바스크립트 코드의 요청을 거부할 수 있습니다. 자세한 사항은 다음 사이트를 참고하세요.  
`https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS`

```bash
$ npm i cors
```

**routes\index.js**

```js
var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());
```

모든 URL은 index.js 파일의 router로 전달되므로 간단하게 router.use(cors())라는 코드로 CORS를 적용할 수 있습니다. 아무러 설정정보 없이 사용하므로 모든 요청에 대해서 응답하는 것이 됩니다. 요청자를 필터링하기 위해서는 추가적으로 설정을 해야한다는 뜻 입니다.

다음 사이트를 참고하세요.  
`https://www.npmjs.com/package/cors`

# 앵귤러 프론트 엔드 프로젝트

앞서서 작업한 Node Express 프로젝트를 기동시켜 놓은 상태에서 추가적으로 앵귤러 프로젝트를 작업하겠습니다.

## 새 프로젝트 생성

```bash
$ ng new my-ng-pagination
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-ng-pagination
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

**angular.json**

```json
"styles": [
  "./node_modules/font-awesome/css/font-awesome.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

**src\styles.scss**

```scss
body,
html {
  width: 100%;
  height: 100%;
}

.container {
  margin-top: 2em;
}
```

## 컴포넌트 및 서비스 생성

```bash
$ ng g c layout/header
$ ng g c page/home
$ ng g s http/userHttp
$ ng g c page/user
```

**src\app\app.component.html**

```html
<app-header></app-header>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

**src\app\app-routing.module.ts**

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**src\app\layout\header\header.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" routerLink="/">Angular Love</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/home">
          Home <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/user">User</a>
      </li>
    </ul>
  </div>

</nav>
```

## Axios를 이용한 HTTP 서비스

```bash
$ npm i axios
```

**src\app\http\user-http.service.ts**

```ts
import { Injectable } from '@angular/core';
import axios from 'axios';

export class User {
  id: number;
  name: string;
  age: number;
  married: boolean;
  comment: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  URL: string = 'http://localhost:3000/pager/users';

  constructor() { }

  findAll(page, size, bsize) {
    return axios.get(this.URL + '?page=' + page + '&size=' + size + '&bsize=' + bsize)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  findOne(id: number) {
    return axios.get(this.URL + '/' + id)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  addOne(user: User) {
    return axios.post(this.URL, user)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  updateOne(user: User) {
    return axios.put(this.URL + '/' + user.id, user)
      .then(function(response) {
        // console.log(response);
        return response.data;
      });
  }

  deleteOne(id: number) {
    return axios.delete(this.URL + '/' + id)
      .then(function(response) {
        // console.log(response);
        return true;
      });
  }
}
```

## 데모 컴포넌트 작업

**src\app\page\user\user.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserHttpService, User } from 'src/app/http/user-http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  errorMessage = undefined;
  paths: Array<{ active, link, query, text }>;
  selectedRow: number = 3;
  rows: number[] = [3, 5, 10, 20, 30];

  constructor(
    private userHttpService: UserHttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.router.url.split('?')[0])
    /**
     * 초기값
     */
    let page = 1;
    let size = this.selectedRow;
    let bsize = 2;

    if (this.route.snapshot.queryParams.page) {
      page = +this.route.snapshot.queryParams.page;
    }
    if (this.route.snapshot.queryParamMap.get('size')) {
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    if (this.route.snapshot.queryParamMap.get('bsize')) {
      bsize = +this.route.snapshot.queryParamMap.get('bsize');
    }
    this.findAll(page, size, bsize);
  }

  findAll(page, size, bsize) {
    this.userHttpService.findAll(page, size, bsize)
      .then(data => {
        this.users = data.users;
        this.paths = data.pager.paths;
        console.log(this.paths);
      }).catch(error => {
        console.log(error);
        this.errorMessage = error;
      });
  }

  changePage(query) {
    if (this.selectedRow !== query.size) {
      query.size = this.selectedRow;
    }
    this.findAll(query.page, query.size, query.bsize);
    return false;
  }

  changeSize() {
    const path = this.paths.find((item) => item.active ? true : false);
    this.findAll(path.query.page, this.selectedRow, path.query.bsize);
    return false;
  }
}
```

**src\app\page\user\user.component.html**

```html
<div class="container">
  <div class="alert alert-danger" role="alert" *ngIf="errorMessage">
    {{errorMessage}}
  </div>
  <h3>Users</h3>
  <div class="row my-2">
    <div class="col-2 ml-auto">
      <select class="custom-select custom-select-sm" [(ngModel)]="selectedRow" (change)="changeSize()">
        <option *ngFor="let row of rows" [value]="row">{{row}}</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Married</th>
          <th>Comment</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users; let i=index">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td>{{user.married}}</td>
          <td>{{user.comment}}</td>
          <td>{{user.created_at | ymd}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row">
    <div class="col-10">
      <ul class="pagination">
        <li class="page-item" *ngFor="let path of paths" [ngClass]="path.active">
          <a class="page-link" (click)="changePage(path.query)">{{path.text}}</a>
        </li>
      </ul>
    </div>
    <div class="col-2">
      <span class="float-right">
        <button type="button" class="btn btn-primary">Write</button>
      </span>
    </div>
  </div>
</div>

<!-- <pre>{{paths | json}}</pre> -->
```

## 문자열인 날짜정보 표시를 위한 파이프

```bash
$ ng g p pipe/ymd
```

**src\app\pipe\ymd.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ymd'
})
export class YmdPipe implements PipeTransform {

  transform(date: string, delim?: string): string {
    if (!delim) {
      delim = '.';
    }

    let ymd = date.substring(0, 10);
    ymd = ymd.replace(/-/g, '');

    if (ymd.length !== 8) {
      return date;
    }
    return ymd.substring(0, 4) + delim + ymd.substring(4, 6) + delim + ymd.substring(6);
  }

}
```
