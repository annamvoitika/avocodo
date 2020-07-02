const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const io = require('socket.io')(4000)


const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const imageRouter = require('./routes/image-upload');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({'secret':"hgfdfgh",resave:true,saveUninitialized:true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : 'public/images/ProfilePics',
    safeFileNames: true,
    preserveExtension: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use("/public", express.static('public'))


// route setup
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/image', imageRouter);


//socket.io


var onlineUsers=[]

io.sockets.on('connection',function(socket){
	socket.on('change_username',function(data,callback){
		console.log("New user");
			socket.username=data.username;
			onlineUsers[socket.username]=socket;
      io.sockets.emit('usernames',Object.keys(onlineUsers));
	});

  socket.on('new_message',function(data,callback){
  var message=data.message;
  if(message[0]=='@')
  {
    message=message.substr(1);
    var idx=message.indexOf(' ');
    if(idx!==-1)
    {
      var name=message.substr(0,idx);
      message=message.substr(idx+1);
      if(name in onlineUsers)
      {
        onlineUsers[name].emit('whisper',{message:message,username:socket.username});
        console.log('whispered');
      }
      else
      {
        var result = 'Error! Enter a valid user';
        callback(result);
      }
    }
    else
    {
      callback('Error! Please enter a message for your whisper');
    }
  }
  else{
    io.sockets.emit('new_message',{message:message,username:socket.username});
  }

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
