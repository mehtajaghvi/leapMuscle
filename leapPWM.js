var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    ledThumb,ledIndex,ledMiddle,ledRing,ledPinky,frame;
//
var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata().connect();
//
 

arduino.on('connect', function(){
  console.log("connect!! "+arduino.serialport_name);
  console.log("board version: "+arduino.boardVersion);
  
  setInterval(function(){
    var an = Math.random()*255;
    console.log("analog write 9 pin : " + an);
    arduino.analogWrite(9, an);
  }, 100);

			
//////////////////////////////////////////////////////

    ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 
	//console.log(frame);
        if (frame.hands && frame.hands.length > 0) {
///////////////	
	
	var hand = frame.hands[0];
	var fingers = frame.pointables.length;
        console.log(fingers);
       	if (fingers ==5){
	    arduino.digitalWrite(13, stat); 	
	
	    console.log("five");	
}	else if (fingers <= 0){

}
        }
///////////////////////
        else {
            //console.log("False");
        }
    });

});
