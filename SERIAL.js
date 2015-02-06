var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0",{
	baudrate:9600,
	dataBits: 8,
	parity: 'none',
	flowControl: false
});

serialPort.on("open",function(){
	console.log("open");
	serialPort.on('data',function(data){
		console.log(data.toString());
	});
	serialPort.write("R\n",function(err,result){
		console.log('err ' + err);
		console.log('results '+ results);
	});
})