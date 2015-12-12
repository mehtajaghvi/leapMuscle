var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),frame,loop;
var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata().connect();
var flag=1;
  arduino.on('connect', function(){
  console.log("connect!! "+arduino.serialport_name);
  console.log("board version: "+arduino.boardVersion);
////////////////////////////////////////////////////
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 
	var fingers = frame.pointables.length;
	console.log(fingers);
	if (frame.hands && frame.hands.length > 0) {
	      if (fingers==0 ){
	  		
		    arduino.analogWrite(3, 0);	
		    arduino.analogWrite(11, 0);	
}
	       else if(fingers > 0){ 
			//else if main
			var poi=frame.pointables[0];
			var avgVel=Math.pow(poi.tipVelocity[0],2)+Math.pow(poi.tipVelocity[1],2)+Math.pow(poi.tipVelocity[2],2);
			var pwmVal=7*(Math.floor((Math.sqrt(Math.sqrt(avgVel)))));	
			//console.log(pwmVal);
   	 				
		 if (pwmVal <= 50){
			//for(loop=1;loop<1000000;loop++){}for(loop=1;loop<1000;loop++){}for(loop=1;loop<1000;loop++){}	
			arduino.analogWrite(3, 0);	
			arduino.analogWrite(11,255);	
			console.log("open");	
			
}//if

		else if (pwmVal >100 ){
		       arduino.analogWrite(3, 255); 	
		       arduino.analogWrite(11,0);
		       console.log("close");	
		       //for(loop=1;loop<10000000;loop++){}					
		
}//else if ends
}//else if main
}//if main
///////////////////////
        
    });
});
