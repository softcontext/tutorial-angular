var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const flash = require('connect-flash');
const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var usersTodosRouter = require('./routes/users.todos');
var pagerUsersRouter = require('./routes/pager.users');

var app = express();

// app.get('env') returns 'development' 
// if process.env.NODE_ENV is not defined.
console.log('----------------------');
console.log('MODE: ' + app.get('env'));
console.log('----------------------');

/*
 * connect to DB
 */
if (app.get('env') === 'development') {
  // If force is true, each Model will run DROP TABLE IF EXISTS, 
  // before it tries to create its own table
  sequelize.sync({
    force: true,
  }).then(() => {
    // Insert Dummy Data for Test
    require('./sql/dummy')();
  });
} else {
  sequelize.sync({
    // default value
    force: false,
  });
}

// 1. view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 2. middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());

// 3. routes
// CORS
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/deep/users', usersTodosRouter);
app.use('/', pagerUsersRouter);

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
