var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// =====================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// =====================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// =====================================
// Routing
const cors = require('cors');
app.use(cors())

// app.route('/api/cats').get((req, res, next) => {
//   res.send({
//     cats: [
//       { name: 'lilly' }, 
//       { name: 'lucy' }
//     ]
//   })
// })
// app.route('/api/cats/:name').get((req, res, next) => {
//   res.send({
//     name: req.params.name
//   })
// })
// app.route('/api/cats').post((req, res) => {
//   res.send(201, req.body);
// });
// app.route('/api/cats/:name').put((req, res) => {
//   res.send(200, req.body);
// });
// app.route('/api/cats/:name').delete((req, res) => {
//   // 204 No Content: the request was successful but we are not sending back any payload.
//   res.sendStatus(204);
// });

var catsRouter = require('./routes/cats');
app.use('/', catsRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// =====================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
