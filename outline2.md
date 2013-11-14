Tell the story of looking for Tab.

Tell the story of the hack day. Moore's Law. Everything is smaller & cheaper-- a GPS can fit on a cat collar, with power supply!

I'm writing C++ to run on this Arduino. Where's the javascript?


from cat tracker to "gonna talk about all three"


These are the things you want to do with microcontrollers: move things, turn things on, light things up, read data, write data. Turn an LED on in response to some input. Move a robot arm. To do that, you need to connect those lights or motors to the microcontroller somehow.  That's where these "pins" or General Purpose I/O connectors come in.

The MCs you'll choose for hardhware hacking will have lots of accessible pins.

classic way to connect to microcontrollers is with a breadboard
everything has to share a ground

power, ground, control signal

control signal is done by changing the power on a wire, which we do by connecting the other end of it to a GPIO on a microcontroller. These signals work the other way, too: you read data from sensors by connecting the control signal to a GPIO.

The Arduino is particularly easy to do this with. It has a lot of GPIOs that are easy to reach, and libraries that name them conveniently. This is why everybody says to start with Arduino. It was designed to be easy to start with. It's cheap, too.
