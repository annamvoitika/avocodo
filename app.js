const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const hbs = require('express-handlebars');
const io = require('socket.io')(4000)

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static('public'))

// route setup
app.use('/', homeRouter);
app.use('/user', userRouter);

app.get('/user/chat/:_id', (req, res) => {
  const User = require('./models/user');

  User.find({_id: req.params._id}, function(err, user) {
    if (err) {
      throw err;
    }
    res.render('chat.hbs', { user: user});
  });
});
//socket.io


io.on('connection', (socket) => {
  console.log("New client connected")


  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message',{
      message: data.message,
      username: socket.username
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', {username:socket.username});
    });
  });


});



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
