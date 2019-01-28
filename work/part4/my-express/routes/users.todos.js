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
		if (req.query.sort.includes(',')) {
			order.push(req.query.sort.split(','));
	    console.log(order);
	    // [ [ 'id', 'asc' ] ]
		}
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
