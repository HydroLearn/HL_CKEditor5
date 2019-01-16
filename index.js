const express = require('express');
const socket = require('socket.io');
//const ck5 = require('@ckeditor/ckeditor5-build-classic');
const app = express();

// App setup

// Static Files
app.use(express.static('dist'));
app.use(express.static('public'));

// app.use(express.static('templates'));
// app.use(express.static('node_apps'));

var server = app.listen(4000, function(){
	console.log('Listening to requests on port 4000');
});

// app.get('/', function(req,res){
// 	res.sendFile(__dirname + '/templates/layout/layout.partial')
//
// });


// app.get('/content', function(req, res){
// 	res.render('content_app');
// });

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('+++ socket connected:', socket.id );

	// specify disconnect event
	socket.on('disconnect', function(){
		console.log('	--- socket disconnected:', socket.id );
	});

	// process emitters from client
	// socket.on('message_name', function(data){
	// 	// perform data operations
	// 	io.sockets.emit('message_name', data);
	// })

	// to broadcast
	// socket.on('emit_broadcast', function(data){
	// 	// emit to all connected sockets other than the sender
	// 	// 		notice the different emitted name
	// 	socket.broadcast.emit('broadcast_handler')
	// })

});
