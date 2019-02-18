/**
 * .env 파일의 내용을 process.env에 추가한다.
 */

require('dotenv').config();



/**
 * 패스포트
 * Passport allows an option to store the user object in request instead of the session.
 */

const passport = require('passport');
require('./passport')(passport);



/**
 * 디펜던시
 */

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

const expressHandlebars = require('express-handlebars');
const cors = require('cors');
const { isAuthenticated } = require('./middlewares/auth');



/**
 * view engine setup
 */

// 기존 설정 삭제
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// express-handlebars 설정을 추가
var hbs = expressHandlebars.create({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    foo: function() {
      return 'FOO!';
    },
    link: function(object) {
      let url = hbs.handlebars.escapeExpression(object.url);
      let text = hbs.handlebars.escapeExpression(object.text);

      return new hbs.handlebars.SafeString(
        "<a href='" + url + "'>" + text + "</a>"
      );
    }
  }
});
// console.log(Object.keys(hbs));
// [ 
//   'handlebars',
//   'extname',
//   'layoutsDir',
//   'partialsDir',
//   'defaultLayout',
//   'helpers',
//   'compilerOptions',
//   'engine',
//   'compiled',
//   'precompiled',
//   '_fsCache' 
// ]

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(cors()); // CORS 설정
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.all('/*', function(req, res, next) {
  // 헤더 정보 출력하기, req.get(headerName)
  console.log('Headers:', req.headers);
  // 쿠키 정보 출력하기
  console.log('Cookies:', req.cookies);
  next();
});

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));




/**
 * 라우팅
 */

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

// 메인 페이지
app.use('/', nocache, require('./routes/index'));

// 회원등록, 로그인
app.use('/auth', require('./routes/auth'));

// 인증된 사용자만(isAuthenticated 결과가 next()) 접근할 수 있다.
// app.use('/users', isAuthenticated, require('./routes/users'));
// isAuthenticated 미들웨어 대신 passport-jwt가 제공하는 전략을 사용할 수 있다.
app.use('/users', passport.authenticate('jwt', { session: false }), require('./routes/users'));



/**
 * catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
  next(createError(404));
});



/**
 * error handler
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
