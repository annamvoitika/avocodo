const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')
const fileUpload = require('express-fileupload')


const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const imageRouter = require('./routes/image-upload');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
// app.engine('handlebars', exhbs());
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({'secret':"hgfdfgh",resave:false,saveUninitialized:true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// route setup
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
