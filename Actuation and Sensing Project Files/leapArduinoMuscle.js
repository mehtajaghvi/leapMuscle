//http://xseignard.github.io/2013/06/25/interfacing-leap-motion-with-arduino-thanks-to-nodejs/
//start with installing node js and npm
//https://nodejs.org/en/download/package-manager/
//npm install arduino-firmata
//npm install leap
//Leapmotion controller
//sudo leapd
//sudo service stop leapd
//code for leap motion 
//using node for leap motion
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    ledThumb,ledIndex,ledMiddle,ledRing,ledPinky,frame;
//using node for arduino
var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata().connect();
//connecting to the arduino
//starting arduino loop
arduino.on('connect', function(){
  console.log("connect!! "+arduino.serialport_name);
  console.log("board version: "+arduino.boardVersion);
       
////////////////////////////////////////////////////
//starting leap loop
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 
	//console.log(frame);
	//check if hand is present
        if (frame.hands && frame.hands.length > 0) {
	
		var fingers = frame.pointables.length;
        	console.log(fingers);
       		if (fingers==0 ){
	    		arduino.analogWrite(3, 255);	
	   	        arduino.analogWrite(11, 0);			
}		else if (fingers <= 5){
	    		arduino.analogWrite(3, 0);	
	    		arduino.analogWrite(11, 155);					  
}
        }

    });
});
