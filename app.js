/*
	vlcd.js 1.0.3, (c) Michael Holasek, 27.6.2015
*/

var conf = require('./config.json');
var serialport = require("serialport");				
var SerialPort  = serialport.SerialPort;
var serialData = {};								
var serialDataPrev = {};
var lcdBacklight = false;
var lcdStatus = {};

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');

logMessage("Connecting to serialport: " + conf.serialport + " ...");

/* Open serial interface - Change the name of the port in config.json */ 
// open the serial port. 
var myPort = new SerialPort(conf.serialport, { 
	baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
	parser: serialport.parsers.readline("\r") 
});

logMessage("Serial port connected");
logMessage("Starting webserver on port: " + conf.serverport + " ...");


/* Start the Webserver */
server.listen(conf.serverport);
logMessage("Webserver started. Waiting for web client ...");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/assets/index.html');
});

 /* Provides static files from the /asset directory */
 app.get(/^(.+)$/, function(req, res){ 
     logMessage('static file request : ' + req.params[0]);
     res.sendFile( __dirname + "/assets/"+ req.params[0]); 
 });

/*favicon doesn't work right now - don't know why ??? */
app.use(favicon(__dirname + '/assets/favicon.ico'));


// listen for new socket.io connections:
io.sockets.on('connection', function (socket) {
	var clientIp = socket.request.connection.remoteAddress;
	logMessage("Client connect from: " + clientIp);
	// if there's a socket client, listen for new serial data:
	//myPort.write(["MC@",String.fromCharCode(13)].join(""));  
	myPort.on('data', function (data) {
		// set the value property of scores to the serial string:
		if (data.slice(1,2)!="<") {
			serialData.value = "Connection established.<br>Waiting for data ...";
			myPort.write(["MC@",String.fromCharCode(13)].join(""));
		} else {	
			var dataSend = [data.slice(2,3),data.slice(4,5),data.slice(6,7),data.slice(8,24),"<br>",data.slice(24,40),"<br>",data.slice(40,56)].join("");
			serialData.value = dataSend.replace(/\�/g,"&deg;").replace(/\x04/g,">").replace(/\x06/g,"&plusmn;").replace(/\x05/g,"&radic;").replace(/\x01/g,"|").replace(/\x02/g,"|").replace(/\x03/g,"|").replace(/ /g,"&nbsp;");
		}

		// send a serial event to the web client with the data
		socket.emit('serialEvent', serialData);
	});
	socket.on('navigation', function (navigation) {
		//logMessage(navigation);
		//Send MC#\r to serialport where #=button Code
		myPort.write(String.fromCharCode(77,67,navigation,13));
	});
	
	//Client disconnects
	socket.on('disconnect', function () {
	logMessage("Client disconnect from: " + clientIp);
	});
});

function logMessage(message) {
	var datetime = new Date();
	datetime = datetime.toLocaleString();
	console.log("[" + datetime + "]: " + message);
}
