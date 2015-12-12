var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    ledThumb,ledIndex,ledMiddle,ledRing,ledPinky,frame;

board.on('ready', function() {
   
    this.pinMode(3, five.Pin.PWM);
    this.pinMode(11, five.Pin.PWM);
  			
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
	    board.analogWrite(11, 155);	
	    board.analogWrite(3, 0);	
	    
}	else if (fingers <= 0){
	    board.analogWrite(11, 0);	
	    board.analogWrite(3, 155);	
	   
}
        }
///////////////////////
       
    });
});
