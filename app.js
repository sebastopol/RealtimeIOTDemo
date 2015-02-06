var express = require('express');
var app = express();
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
var io = require('socket.io')(server);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0",{
	baudrate:9600,
	dataBits: 8,
	parity: 'none',
	flowControl: false,
	parser: serialport.parsers.readline("\n")
});


app.use("/", express.static(__dirname));

app.get('/', function (req, res) {
  res.render('index.html')
});

serialPort.on('open', function(){
  // Now server is connected to Arduino
  console.log('Serial Port Opend');

  var lastValue;
  io.sockets.on('connection', function (socket) {
      //Connecting to client 
      console.log('Socket connected');
      socket.emit('connected');
      var lastValue;

      serialPort.on('data', function(data){
          if(lastValue !== data.toString()){
              socket.emit('news', data.toString());
              console.log(data.toString());
          }
          lastValue = data.toString();
      });
  });
});
