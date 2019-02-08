var express = require('express');
var router = express.Router();

router.get(['/', '/home'], function(req, res, next) {
  let data = {
    title: 'What is locals?',
    z: 'value of cach'
  };
  
  // 로그인을 했다면 패스포트에 의해서 req.user 정보가 존재한다.
  // app.js 의 app.all('/*', ..) 부분에서 처리한 locals를 대신 사용해도 된다.
  if (req.user) {
    data.user = req.user;
  }
  
  // 라우팅 시 middlewares.js 파일에 있는 isLoggedIn, isNotLoggedIn 미들웨어로 인해서
  // '/' 인 URL로 리다이렉트 된 경우의 에러정보를 뷰에서 출력할 수 있도록 조치한다.
  if (req.flash) {
    const error = req.flash('error');
    if (error) {
      res.locals.error = error;
    }
  }
  
  res.render('index', data);
});

module.exports = router;
