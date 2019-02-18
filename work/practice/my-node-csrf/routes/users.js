const express = require('express');
const router = express.Router();



// 뷰 요청 시 CSRF 쿠키를 발급한다.
router.get('/write', function(req, res) {
  res.render('users/create', {
    product: ""
  });
});

// 입력, 수정, 삭제 요청 시 발급된 쿠키 값을 확인한다.
// 적합한 쿠키 값을 신고하지 않으면 403: invalid csrf token 에러를 반환한다.
router.post('/write', function(req, res) {
  let { product } = req.body;
  console.log('product : ' + product);
  
  res.send('product : ' + product);
});



module.exports = router;
