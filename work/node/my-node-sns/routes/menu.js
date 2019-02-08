const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post, Hashtag } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.get('/join', function(req, res, next) {
  let data = {};
  if (req.flash) {
    data.error = req.flash('error');
  }
  
  res.render('join', data);
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  
  try {
    const exUser = await User.findOne({
      where: {
        email
      }
    });
    
    // 이미 존재하는 이메일로 신규 회원가입을 할 수 없다.
    if (exUser) {
      req.flash('error', 'Email is duplicated.');
      return res.redirect('/join');
    }
    
    // 패스워드는 암호화한 후 신규 회원정보를 디비에 등록한다.
    const cryptedPassword = await bcrypt.hash(password, 12);
    const dbUser = await User.create({
      email,
      nick,
      password: cryptedPassword
    });
    console.log('dbUser: ', dbUser);
    
    // 신규 회원등록 후 사용자에게 보여줄 곳으로 리다이렉트 한다.
    req.flash('message', '회원가입성공');
    return res.redirect('/join-report');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get('/join-report', function(req, res, next) {
  let data = {};
  if (req.flash) {
    data.message = req.flash('message');
    console.log(Array.isArray(data.message));
  }
  
  res.render('join-report', data);
});

router.get('/login', function(req, res, next) {
  let data = {};
  if (req.flash) {
    data.error = req.flash('error');
  }
  
  res.render('login', data);
});

router.post('/login', isNotLoggedIn, function(req, res, next) {
  passport.authenticate('local', (authError, user, info) => {
    // 데이터베이스 조회 시 발생하는 에러
    if (authError) {
      return next(authError);
    }
    
    // email 또는 password가 일치하지 않은 경우 발생하는 에러
    if (!user) {
      req.flash('error', info.message);
      console.log('>>> ', info.message);
      return res.redirect('/login');
    }
    
    // 전달받은 email, password 정보와 일치하는 사용자가 데이터베이스에 있다면 성공이다.
    // 성공 시 데이터베이스로부터 조회하여 얻은 user 객체를 파라미터로 전달하면서 req.login() 메소드를 호출한다.
    // req.login() 메소드 내부에서 passport.serializeUser() 메소드에게 미리 전달 한 콜백함수를 호출한다.
    // passport.serializeUser() 메소드의 콜백함수에서 req.session 객체에 저장할 정보를 결정한다.
    // 잘 처리가 되면 req.session.passport 정보가 할당된다.
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      
      // 로그인 성공 후 사용자에게 보여주고 싶은 곳으로 리다이렉트 한다.
      return res.redirect('/');
      
      // 패스포트 미들웨어 passport.session()은 req.session.passport 정보가 있다면
      // passport.deserializeUser()에게 전달 한 콜백함수를 호출하여 
      // 필요한 사용자 정보를 구한다. 그런 다음 구한 정보를 뷰에서 사용할 수 있게 제공한다.
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  // passport가 추가한 req.logout() 메소드는 req.user 객체를 제거한다.
  req.logout();
  
  // req.session.passport.user 객체를 제거한다.
  req.session.destroy();
  
  // 로그아웃 작업 후 사용자에게 보여줄 곳으로 리다이렉트 한다.
  res.redirect('/');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {
    title: '회원정보',
    user: req.user,
  });
});

function ymd(date) {
  if (!(date instanceof Date)) {
    return date;
  }
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

router.get('/sns', function(req, res, next) {
  Post.findAll({}).then((posts) => {
    posts = posts.map((item) => item.dataValues);
    console.log('posts: ', posts);
    
    posts.forEach((item) => {
      item.createdAt = ymd(item.createdAt);
      item.updatedAt = ymd(item.updatedAt);
      if (item.img) {
        item.img = '/' + item.img;
      }
    });
    console.log('posts: ', posts);
    
    res.render('sns', {
      posts
    });
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

fs.readdir('uploads', (err) => {
  if (err) {
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/sns', isLoggedIn, upload.single('img'), function(req, res, next) {
  console.log(req.file);
  // {
  //   fieldname: 'img',
  //   originalname: 'a.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'uploads/',
  //   filename: 'a1549525649931.jpg',
  //   path: 'uploads\\a1549525649931.jpg',
  //   size: 132763
  // } 
  console.log(req.body);
  // {
  //   content: '111\r\n222'
  // }
  
  const { content } = req.body;
  
  Post.create({
      content: content,
      img: req.file.filename,
      userId: req.user.id
    })
    .then((posts) => {
      res.redirect('/sns')
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/'
}), (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
