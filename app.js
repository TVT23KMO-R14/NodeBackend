require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
require('dotenv').config();


const pool = require('./dbconnection')

//useria ja autentikointia loginia ja rekisteröitymistä varten
const groupRouter = require('./routes/groupRoute');
const user = require('./routes/usersRoute');
const auth = require('./routes/authenticationRoute')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

var indexRouter = require('./routes/index');
var groupMemberRouter = require('./routes/groupMemberRoute');
var searchRouter = require('./routes/searchRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/group', groupRouter);
app.use('/user', user);
app.use('/auth', auth);
app.use('/', indexRouter);
app.use('/groupmember', groupMemberRouter);
app.use('/search', searchRouter);
app.use(upload.none());


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

// Tietokantayhteyden testaus
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Tietokantayhteyden virhe', err);
  } else {
      console.log('Tietokantayhteys muodostettu onnistuneesti'); 
  }
});

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
