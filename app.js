var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var adminController = require('./controller/adminController');
var orderController = require('./controller/orderController');
var customerController = require('./controller/customerController');
var constantsController = require('./controller/constantController');
var foodItemController = require('./controller/foodItemController');
var authenticationController = require('./controller/authenticationController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/admin', adminController);
app.use('/customer', customerController);
app.use('/authentication', authenticationController);
app.use('/foodItem', foodItemController);
app.use('/order', orderController);
app.use('/constants', constantsController);


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

app.listen(process.env.PORT || 8080);

module.exports = app;
