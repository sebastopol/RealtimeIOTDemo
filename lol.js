int ldr_val = 0; // variable to store the LDR value

void setup()
{
  // No pinMode Statement required for Analog Pins :)
  Serial.begin(9600); // Initialise Serial Communication
}

void loop()
{
  ldr_val = analogRead(3); // Read the ldr value and store it in the variable
  Serial.println(ldr_val); // print the ldr value to serial monitor
  delay(1000); // a delay - do not remove this delay (you can change it) as otherwise the serial monitor will get flooded with data and might crash
}