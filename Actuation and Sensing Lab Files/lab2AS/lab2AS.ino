/*

Actuatuion and Sensing in Robotics
Carnegie Mellon University
Closed loop control of pnuematic muscles
Jaghvi, Mitch
*/
int airInPin = 11;
int airOutPin = 3;
unsigned long timer, timer2, timer3, timer4; // the timer
unsigned long interval3 = 3*1000; // t interval 3 seconds
unsigned long interval2 = 2*1000;
int flag=1;
int pwm1 = 127;

// lab 4 variables
int sensorPin=1; //analogRead force value at port 1
float force, offsetForce;
int sensorValue;
void setup()
{  bitClear(TCCR2B, CS22);
   bitClear(TCCR2B, CS21);
   bitClear(TCCR2B, CS20);
   bitSet(TCCR2B, CS22);
   bitSet(TCCR2B, CS21);
   bitSet(TCCR2B, CS20);
 //TCCR2B = (TCCR2B & 0b11111000) | 0b00000111;
 
   pinMode(sensorPin,INPUT);
   pinMode(airInPin, OUTPUT);
   pinMode(airOutPin, OUTPUT);
   Serial.begin(9600);
   //reading the offset force value
    delay(50);
    sensorValue=analogRead(sensorPin);//read force 
    delay(10);
    sensorValue=analogRead(sensorPin);
    offsetForce= (float) 0.134124*sensorValue;//parse force to float
}
 
 
void loop()
{
  //if(flag==1){
    //reading Force Value 
    delay(50);
    sensorValue=analogRead(sensorPin);
    delay(10);
    sensorValue=analogRead(sensorPin);
    force=(float) 0.134124*sensorValue;//value of force in newton
    force=force-offsetForce;
    
    delay(interval2);//wait for 2 seconds
      
    timer=millis();
    while((millis()-timer)<interval3){//contract the muscle for 3 seconds
      analogWrite(airInPin, pwm1);
    }
   
    analogWrite(airInPin, 0);//hold the muscle
    delay(interval3); //for three seconds
    
    timer3=millis();
   
    while((millis()-timer3)<interval3){
     analogWrite(airOutPin, pwm1);//release  the muscle for three seconds
    }
    timer4=millis();
  
    while((millis()-timer4)<interval2){
      analogWrite(airOutPin, 255);//complete release of the muscle
    }
  
    
 //flag=0; //end loop
  //}
  
} 
