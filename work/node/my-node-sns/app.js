/**
 * Create New Express Project
 * 
 * $ npm i -g express-generator
 * $ express my-node-sns --view=hbs --css=sass
 */

/*
  Dependency
 */

const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

/*
  # 1. 환경변수 설정파일
  약속된 대로 .env 파일을 로드하고 `Key=Value` 형태의 정보를 파싱하여 process.env에 추가한다.
 */

require('dotenv').config();

/*
  # 2. Session
 */

const session = require('express-session');

/*
  # 3. Flash Attribute
 */

const flash = require('connect-flash');

/*
  # 4. Sequelize: ORM 
 */

const { sequelize } = require('./models');

/*
  # 5. Passport: Authentication, OAuth
 */

const passport = require('passport');
require('./passport')(passport);

/*
  CORS
  
  브라우저가 데이터를 전달하는 경우, 브라우저는 항상 쿠키(정확히 connect.sid)를 보내기 때문에 문제가 없지만
  JSON 연동기술을 사용하여 데이터를 전달하는 경우 쿠키를 보내지 않는 경우도 있으며
  이 경우 패스포트의 passport.session() 미들웨어가 작동하지 않으므로 주의해야 한다.
 */
const cors = require('cors');
app.use(cors({
  // "credentials": true // enable set cookie
}));

// cors 패키지를 사용하는 대신 직접 코딩할 수도 있다.
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

/*
  Profile: Mode
 */

console.log('=======================');
// app.get('env') returns 'development' if process.env.NODE_ENV is not defined.
console.log('MODE: ' + app.get('env'));
console.log('=======================');

/*
  View Engine Setup
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// define default layout
app.set('view options', { layout: 'layouts/layout' });

/*
  Handlebars Setup
  
  hbs.handlebars is the handlebars module
  hbs.handlebars === require('handlebars');
  
  URL 핸들러에서 뷰에게 데이터를 전달하는 방법 3가지
  1. req.app.locals: 
    전역변수 등록, 익스프레스가 필요한 자원을 설정하기 때문에 덮어쓰면 안되고 프로퍼티를 추가한다.
    모든 사용자가 공유하는 전역자원이다.
  2. res.locals: 
    라우팅 매핑 시 전달하고 싶은 자원을 등록한다. 
    어떤 URI에 매핑하는 냐에 따라서 여러 뷰에 공통적으로 전달하는 변수를 등록할 수 있다.
    요청응답을 처리하는 과정에서만 공유되는 자원이다.
  3. res.render('view name', { key: 'value'}): 
    해당 뷰만 사용하는 자원은 render() 함수에 파라미터로 전달한다.
 */

const hbs = require('hbs');

// 뷰에서 locals 자원을 사용하도록 활성화
hbs.localsAsTemplateData(app);

/*
  req.app.locals
 */

// console.log(app.locals); // 이미 익스프레스가 설정한 변수를 갖고 있는 상태다.
app.locals.x = "value of req.app.locals";

/*
  res.locals
 */

app.all('/*', function(req, res, next) {
  // - 하나의 라우팅 매핑 시 사용하는 공유자원을 등록한다.
  // - res.locals는 존재하지 않는 상태이기 때문에 덮어써도 괜찮다.
  res.locals = {
      y: 'value of res.locals',
      pets: ['cat', 'dog'],
  };
  next();
});

/*
  Handlebars Helpers Setup
 */

hbs.registerHelper('breaklines', function(text) {
  text = hbs.handlebars.Utils.escapeExpression(text);
  text = text.replace(/\r\n|\n|\r/gm, '<br>');
  return new hbs.handlebars.SafeString(text);
});

/*
  Handlebars Partials Setup
 */

hbs.registerPartials(__dirname + '/views/partials');


/*
  Logging
 */

app.use(logger('dev'));

/*
  Static Resource Folder
 */

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

/*
  JSON Parsing
 */

app.use(express.json());

/*
  x-www-form-urlencoded Parsing
 */
app.use(express.urlencoded({ extended: false }));

/*
  CSS Precompiling
  
  요청 받을 때 .css 파일을 만든다.
 */

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));

/*
  Cookie Parsing
  
  #1 처리로 인해서 process.env.COOKIE_SECRET 값을 사용할 수 있다.
 */

app.use(cookieParser(process.env.COOKIE_SECRET));
// 쿠키를 출력해서 확인해 보기
app.all('/*', function(req, res, next) {
  console.log('Cookies: ', req.cookies);
  next();
});

/*
  Session Setup
  
  세션에서는 set-cookie에 connect.sid라는 식별자를 사용한다. 
 */

app.use(session({
  resave: false, // 세션 아이디를 접속할 때마다 새롭게 발급한다.
  saveUninitialized: false, // 세션 아이디를 실제 사용하기 전에는 발급하지 않는다.
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // HTTP 통신 중에만 사용하고 프론트엔드에서 자바스크립트가 사용하지 못하게 한다.
    secure: false, // https를 사용할 때는 true로 설정한다.
  },
}));

// #3: flash 활성화
app.use(flash());

// #4: 데이터베이스 연결
if (app.get('env') === 'development') {
  // If force is true, each Model will run DROP TABLE IF EXISTS, before it tries to create its own table
  sequelize.sync({
    force: true,
    // logging: false
  }).then(() => {
    // Insert Dummy Data for Test
    require('./sql/dummy')();
  });
} else {
  sequelize.sync();
}

// #5: 패스포트 활성화
app.use(passport.initialize());
app.use(passport.session());

/*
  Headers 정보 출력
 */

const printHeaders = function(req, res, next) {
  console.log('=======================');
  for (let key in req.headers) {
    console.log(key + ':' + req.headers[key]);
  }
  console.log('=======================');
  next();
}

app.all('/*', printHeaders);

/*
  라우팅을 설정하는 방법은 여러가지가 있다.

  1. app.route('URI').get(cb)
  2. app.get('URI', cb)
  3. app.use('URI', router)
 */

app.route('/fortune-cookie').get((req, res, next) => {
  const fortuneCookies = [
    "buy lotto today",
    "awesome",
    "very good",
    "good",
    "not bad"
  ];
  
  res.render('fortune-cookie', {
    note: fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)]
  });
});


/*
  라우팅
 */

app.all('/*', (req, res, next) => {
  // 로그인을 했다면 패스포트에 의해서 req.user 정보가 존재한다.
  // navbar는 화면에서 항상 상단에 표시된다.
  // navbar가 로그인 정보를 사용해야 하므로 모든 URL에 대해서
  // 로그인 했을 때 req.user 정보를 전달한다. 
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/menu'));

/*
  404 Not Found 에러 핸들러
 */

app.use(function(req, res, next) {
  next(createError(404));
});

/*
  Fall-back 에러 핸들러
 */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
