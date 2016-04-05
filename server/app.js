/*
*  Copyright TSL 2016. All rights reserved.
*/


// It runs a Websocket server on top of an HTTP server.
// Messages Recieved via Websocket protocol are simply broadcasted to all active clients.

var http = require('http');
var ws = require('websocket-server');

var httpServer = new http.Server();
var wsserver = ws.createServer({server: httpServer});

// For each Websocket client; connection event will be fired. 
// OnConnection:
// 	1. Great the new client
//	2. Listen for msgs from the client and broadcast them to everyone
wsserver.on('connection', function (socket) {
	socket.send('Welcome to the chat room.');
	socket.on('message', function (msg) {
		wsserver.broadcast(msg);
	});
});

// Run the server on port 8000
wsserver.listen(8000);

// END