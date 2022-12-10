// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const socket = new Server(httpServer, {
// 	cors: {
// 		origins: ['http://dev.adaiya.in','http://localhost:4200','http://localhost:9002'],
// 		'transports': ['websocket', 'pollings']
// 	  },
// });

// const users = {};

// socket.on('connection', (socket) => {
// 	console.log("Connected----");
// 	socket.on('join', function(data){
// 		console.log("Connected Join----",data);
// 	  socket.join(data.questionId);
// 	  users[socket.id] = data.user;
// 	  var  JoinRes = {
// 		message: data.user+' has joined '+data.qName+" question",
// 		users:users,
// 	};
// 	  socket.broadcast.to(data.questionId).emit('new user joined', JoinRes);
// 	});
//   	socket.on('disconnect', function(){
// 		var  JoinRes = {
// 			message: "data.user"+' has joined '+"data.qName"+" question",
// 			users:users,
// 		};
// 		socket.broadcast.to(data.questionId).emit('new user joined', JoinRes);
// 			  delete users[socket.id];
// 			});
// 		  });
// httpServer.listen(3001, () => {
// 	console.log("=======================");
// });

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const socket = new Server(httpServer, {
    cors: {
        origins: ['http://dev.adaiya.in', 'http://localhost:4200', 'http://localhost:9002'],
        'transports': ['websocket', 'pollings']
    }
});
var users = {};
socket.on('connection', (socket) => {
    console.log("Connected...");
	socket.on('join', function(data){
		console.log("Connected Join----",data);
	  socket.join(data.room);
	  users[socket.id] = data.user;
	  var  JoinRes = {
		message: data.user+' has joined '+data.room+" room",
		users:users,
	};
	  socket.broadcast.to(data.room).emit('connent ho gya', JoinRes);
	});
});
// var users = {};
//  var allUsers = [];
//  var roomAll  = [];
// socket.on('connection', (socket) => {
//     console.log("Connected...",users);
// 	socket.on('join', (data) => {
// 		allUsers.push(data.user)
// 		let allUsersFinal = [...new Set(allUsers)];
// 		roomAll[data.room] = allUsersFinal;

// 		if(roomAll[data.room].length <= 2){
// 	  socket.join(data.room);
// 	  users[socket.id] = data.user;
// 	  var  JoinRes = {
// 		message: data.user+' has joined '+data.room+" room",
// 		users:users,
// 	};
// 	  socket.broadcast.to(data.room).emit('connent ho gya', JoinRes);
// 	}else{
// 		socket.emit('join', 'Room is full');
// 	}
// 	});
// });





httpServer.listen(3000, () => {
    console.log("server connect=======");
});