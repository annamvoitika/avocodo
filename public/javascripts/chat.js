$(document).ready(function() {
  var socket = io.connect('http://localhost:4000')
  var username = $("#username");
  var change_username = $("#change_username");
  var feedback = $("#feedback");
  var status = $("#status");
  var message = $("#message");
  var change_message = $("#change_message");

  change_username.click(function(){
    socket.emit('change_username', {username:username.val()})
  })

  change_message.click(function(){
    socket.emit('new_message', {message:message.val()})
  })

socket.on('new_message', (data) => {
  message.val('');

  feedback.append('<p>' + data.username + ":" + ' ' + data.message + '</p>')
})

message.bind('keypress', ()=> {
  socket.emit('typing')
})

socket.on('typing', (data) => {
  status.html('<p><i>' + data.username + " is typing..." + '</i></p>')
})

})
