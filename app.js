/*
	vlcd.js Prototype, (c) Michael Holasek, 24.5.2015
*/

var conf = require('./config.json');
var serialport = require("serialport");				// include serial lib
var SerialPort  = serialport.SerialPort;			// make a local instance of serial
var serialData = {};								// object to hold what goes out to the client

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');


/* Start the Webserver */
server.listen(conf.serverport);
console.log("Server started on Port:" +conf.serverport)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/assets/index.html');
});

 /* Provides static files from the /asset directory */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params[0]);
     res.sendFile( __dirname + "/assets/"+ req.params[0]); 
 });

/*favicon doesn't work right now - don't know why ??? */
app.use(favicon(__dirname + '/assets/favicon.ico'));


/* FS for Logging */
fs=require("fs");


/* Open serial interface - Change the name of the port in config.json */ 
// open the serial port. 
var myPort = new SerialPort(conf.serialport, { 
	baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
	parser: serialport.parsers.readline("\r") 
});
  

// listen for new socket.io connections:
io.sockets.on('connection', function (socket) {
	// if there's a socket client, listen for new serial data:
	myPort.write(["MC@",String.fromCharCode(13)].join(""));  
	myPort.on('data', function (data) {

		// set the value property of scores to the serial string:
		data = [data.slice(8,24),"<br>",data.slice(24,40),"<br>",data.slice(40,56)].join("");
		serialData.value = data.replace(/\�/g,"&deg;").replace(/\x04/g,">").replace(/\x06/g,"&plusmn;").replace(/\x05/g,"&radic;").replace(/\x01/g,"|").replace(/\x02/g,"|").replace(/\x03/g,"|").replace(/ /g,"&nbsp;");
	
		
		// debugging to Terminal:
		//console.log(data);
		// send a serial event to the web client with the data:
		socket.emit('serialEvent', serialData);
	});
	socket.on('navigation', function (navigation) {
		//console.log(navigation);
		//Send MC#\r to serialport where #=button Code
		myPort.write(String.fromCharCode(77,67,navigation,13));
		myPort.write(String.fromCharCode(77,67,0,13));
	});
});
