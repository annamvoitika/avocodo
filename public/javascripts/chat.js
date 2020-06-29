$(document).ready(function() {
  var socket = io.connect('http://localhost:4000')
  var username = $("#username");
  var change_username = $("#change_username");
  var feedback = $("#feedback");
  var status = $("#status");
  var message = $("#message");
  var change_message = $("#change_message");
  var $users=$('#users');
  var $chat=$('#chat');

  change_username.click(function(){
    socket.emit('change_username', {username:username.val()})
  })

  change_message.click(function(e){
				e.preventDefault();
				socket.emit('new_message',{message:message.val()},function(data){
					feedback.append('<span class="error"><b>'+data+"</span><Br>");
				});
				message.val("");
			});

			socket.on('new_message',function(data){
				feedback.append('<span class="normal"><b>'+data.username+': </b>'+data.message+"</span><Br>");
			});

			socket.on('usernames',function(data){
				var str=' ';
				for(var i=0;i<data.length;i++)
				{
					str+=data[i]+'<br/>';
				}
				$users.html(str);
			});

			socket.on('whisper',function(data){
				feedback.append('<span class="whisper"><b>'+ "Private message from " + data.username+': </b>'+data.message+"</span><Br>");
			})
})
