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
