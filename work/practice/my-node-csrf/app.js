const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');



/**
 * view engine setup
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



/**
 * Middleware
 */

// 1: 접속 로깅
app.use(logger('dev'));

// 2: 정적리소스 제공
app.use(express.static(path.join(__dirname, 'public')));

// 3: .scss ==프리 컴파일==> .css 파일 전송
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));

// 4: JSON 파싱, HTML Body 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5: 쿠키 파싱 
app.use(cookieParser());
// CSRF 미들웨어로 설정하면 모든 URL에 대해서 동작한다.
// app.use(csrf({ cookie: true }))



/**
 * Routing
 */

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/example', require('./routes/example'));



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
