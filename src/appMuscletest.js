var webSocket = require('ws'),
    Leap = require('leapjs'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    leapMotion = require('./lib/leap'),	
    board = new five.Board(),
    ledThumb,ledIndex,ledMiddle,ledRing,ledPinky,frame;



board.on('ready', function() {
    ledThumb =  new five.Led(13); 
    ledIndex =  new five.Led(12);
    ledMiddle = new five.Led(10);
    ledRing =   new five.Led(9); 
    ledPinky =  new five.Led(8);  
    this.pinMode(3, five.Pin.PWM);
    this.pinMode(11, five.Pin.PWM);
   // this.analogWrite(11, 255);			
//////////////////////////////////////////////////////
// Leap motion controller

var controller = new Leap.Controller();
// Main Leap frame loop
controller.on('frame', function(frame) {
   // ws.on('message', function(data, flags) {
     //   frame = JSON.parse(data); 
	//console.log(frame);
        if (frame.hands && frame.hands.length > 0) {
///////////////	
	var pointable = frame.pointables[0];
	var hand = frame.hands[0];
	var fingers = frame.pointables.length;
        console.log(fingers);
	
       	if (fingers ==5){
	    //this.analogWrite(11, 255);	
	    ledThumb.on();
	    ledIndex.on(); 
	    ledMiddle.on(); 
	    ledRing.on();
	    ledPinky.on(); 
}	else if (fingers == 0){
	    ledThumb.off();
	    ledIndex.off(); 
	    ledMiddle.off(); 
	    ledRing.off();
	    ledPinky.off(); 
}
        }
///////////////////////
        else {
            //console.log("False");
        }
    });
});
