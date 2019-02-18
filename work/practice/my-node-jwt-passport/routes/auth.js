const router = require('express').Router();
// const User = require('../models/user');
const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middlewares/auth');
const { findAll, findOne, updateOne, deleteOne } = require('../fake-db/data');

const jwt = require('jsonwebtoken');
const passport = require("passport");

router.get('/', (req, res) => {
  res.send('/auth Routing is wokring...');
});

/*
  회원등록(가입)

  POST /auth/signup
  { userid, password }
*/
router.post('/signup', (req, res) => {
  const { userid, password } = req.body;

  // User.findOneByUserid(userid)
  //   .then(user => {
  //     if (user) {
  //       throw new Error(`${userid}는 이미 사용중입니다.`);
  //     } else {
  //       return User.create(userid, password);
  //     }
  //   })
  //   .then(() => res.json({ success: true }))
  //   .catch(err => res.status(409).json({ success: false, message: err.message }));
  
  const user = addOne({ userid, password, admin: false });
  res.json({ success: true, data: user });
});

/*
  회원인증(로그인)

  POST /auth/signin
  { userid, password }
*/
router.post('/signin', (req, res, next) => {
  const { userid, password } = req.body;
  console.log(userid, password);

  // #1. sequelize 사용 시
  // userid에 의한 user 검색
  // User.findOneByUserid(userid)
  //   .then(user => {
  //     // user 미존재: 회원 미가입 사용자
  //     if (!user) { throw new Error('가입하지 않은 아이디입니다.'); }
  // 
  //     // 패스워드 체크
  //     if (!user.verify(password)) { throw new Error('패스워드가 일치하지 않습니다.'); }
  // 
  //     // userid가 존재하고 패스워드가 일치하면 토큰 발행
  //     return createToken({
  //       userid: user.userid,
  //       admin: user.admin
  //     });
  //   })
  //   .then(token => res.json({ sucess: true, token }))
  //   .catch(err => res.status(403).json({ sucess: false, message: err.message }));
  
  // #2. 자바스크립트 객체를 메모리 데이터베이스처럼 사용 시
  // const user = findOne(userid);
  // if (user) {
  //   if (user.password === password) {
  // 
  //     createToken({ userid: user.userid, admin: user.admin })
  //       .then(token => {
  //         res.json({ sucess: true, token });
  //       })
  //       .catch(err => {
  //         res.status(403).json({ sucess: false, message: err.message });
  //       });
  // 
  //   } else {
  //     res.status(403).json({ success: false, message: 'password is not correct' });
  //   }
  // } else {
  //   res.status(403).json({ success: false, message: 'userid is not exist' });
  // }
  
  // #3. passport 인증 전략 사용 시
  // Note, that we pass {session: false} in passport options, so that it wont save the user in the session.
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // 데이터베이스 조회 시 발생하는 에러
    if (err) {
      return next(err);
    }
    
    // email 또는 password가 일치하지 않은 경우 발생하는 에러
    if (!user) {
      // req.flash('error', info.message);
      // console.log('>>> ', info.message);
      return res.status(400).json({ success: false, message: info.message });
    }
    
    // 전달받은 email, password 정보와 일치하는 사용자가 데이터베이스에 있다면 성공이다.
    // 성공 시 데이터베이스로부터 조회하여 얻은 user 객체를 파라미터로 전달하면서 req.login() 메소드를 호출한다.
    // req.login() 메소드 내부에서 passport.serializeUser() 메소드에게 미리 전달 한 콜백함수를 호출한다.
    // passport.serializeUser() 메소드의 콜백함수에서 req.session 객체에 저장할 정보를 결정한다.
    // 잘 처리가 되면 req.session.passport 정보가 할당된다.
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      
      // generate a signed son web token with the contents of user object 
      // and return it in the response
      // const token = jwt.sign(user, 'your_jwt_secret');
      // return res.json({ user, token });
      
      // HTML로 응답한다면 해당 뷰로 리다이렉트하지만
      // 앵귤러와 JSON으로 대화하기 때문에 결과(정상이라면 토큰 포함)를 JSON 포맷으로 응답한다.
      createToken({ userid: user.userid, admin: user.admin })
        .then(token => {
          res.json({ success: true, message: info.message, token });
        })
        .catch(err => {
          res.status(403).json({ success: false, message: err.message });
        });
    });
  })(req, res, next);

});

/*
  토큰 반환
  header의 Authorization에 JWT 값을 설정하여 서버로 전송하면 서버는 token을 검증한 후 현재 계정의 상태를 response한다.

  GET /auth/check
  JWT Token
*/
router.get('/check', isAuthenticated, (req, res) => {
  res.json(req.decodedToken);
});

router.get('/kakao', passport.authenticate('kakao'));

// http://www.passportjs.org/docs/authenticate/
// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/'
// }), (req, res, next) => {
//   res.redirect('/');
// });

// router.get('/kakao/callback', function(req, res, next) {
//   passport.authenticate('kakao', function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
// 
//     if (!user) {
//       // return res.redirect('/login');
//       return res.status(400).json({ success: false, message: 'Something is wrong' });
//     }
// 
//     req.logIn(user, { session: false }, function(err) {
//       if (err) {
//         return next(err);
//       }
// 
//       // return res.redirect('/users/' + user.username);
// 
//       createToken({ userid: user.userid, admin: user.admin })
//         .then(token => {
//           res.json({ success: true, message: 'Success', token });
//         })
//         .catch(err => {
//           res.status(403).json({ success: false, message: err.message });
//         });
//     });
//   })(req, res, next);
// });

router.get('/kakao/callback', function(req, res, next) {
  passport.authenticate('kakao', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      // return res.redirect('/login');
      return res.status(400).json({ success: false, message: 'Something is wrong' });
    }

    req.logIn(user, { session: false }, function(err) {
      if (err) {
        return next(err);
      }

      createToken({ userid: user.userid, admin: user.admin })
        .then(token => {
          // res.json({ success: true, message: 'Success', token });
          
          // https://stackoverflow.com/questions/49887018/angular-express-passport-authenticating-with-google-no-access-control-allow
          // 위 코드를 안쓰고 아래 코드를 사용하는 이유는
          // CORB 에러때문이다. 자세한 설명은 참조링크를 보자.
          // 다음 코드의 메카니즘은 자세히 모르고 조금더 학습이 필요하다.
          var responseHTML = `
            <html>
            <head><title></title></head>
            <body></body>
            <script>
              res=%value%;
              window.opener.postMessage(res, "*");
              window.close();
            </script>
            </html>`;

          responseHTML = responseHTML.replace('%value%', JSON.stringify(
            { success: true, message: 'Success', token }
          ));
          res.status(200).send(responseHTML);
          
        })
        .catch(err => {
          res.status(403).json({ success: false, message: err.message });
        });
    });
  })(req, res, next);
});

module.exports = router;
