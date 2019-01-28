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
