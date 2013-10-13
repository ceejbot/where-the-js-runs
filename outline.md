# Where does the javascript run, anyway?

## Intro

### Tracking my cat

- use radios? transponder on his collar? triangulate?
- wait, what kind of radio? how do I even figure this out?
- dream of tracking my cat went unfulfilled

Maybe you have a dream like that. Something you've always wanted to do, if only you could.

- run sensors in your garden
- put a video camera on your dog
- turn your lights on when you get home, without paying a lot of money for the fun

Ask the audience what their project is. Get a couple of people to shout it out.

### Why stuff is possible now

### Make the dream reality

Now we're going to get into details.

## Development

### The basics

board with CPU, some flash memory, and electrical contact points for input/ouput, sometimes called GPIO pins

the board will be a bare thing with all the elements hanging out, easy to get at

you'll hook things up to the pins, write software to read from some of them, make decisions & munge the data around, then write output to different pins

This is exactly what you've always been doing, just at a lower level in the computer stack.

examples: 

- reading a moisture sensor, noting that it's below a threshold, then flipping a relay to turn on a sprinkler
- reading incoming data from a GPS module
- streaming in video from a camera, doing some pattern-matching on the image, then turning your nodecopter to a new heading

### Survey of the possibilities

#### the arduino family
  
- 8-bit ATMega processors, 16MHz 
- often not a lot of memory: 32K flash
- lots of easy-to-access pins
- usb usually
- 20 pins

You program it in the Arduino Sketch language, which is C++. You compile sketches with their IDE then download to the flash on the board.

You have heard about programming Arduino with javascript! You can do this! You should do this! it is a great way to get started with a language you already know! But here's the cheat: the javascript does not run on the Arduino. What you run on the Arduino is "Firmata", a protocol for controlling the Arduino as a serial device from a host computer. You run a node implementation of that on your laptop's side, then tether your arduino with usb.

Why do you do this? Because the APIs are so much nicer in JS than they are in C. the Johnny Five library is a lovely way to interact with hardware.

[example]

But if you're going untethered there are all kinds of tiny variations on the arduino you can use. They're small enough to tuck into out of the way places or be carried around by a grumpy cat.

Let's move up a notch.

#### raspberry pi

much more modern ARM processor, 
512MB
HDMI out, ethernet, audio out, 3 usb connectors, a GPU with H264 in hardware, and an SD card slot

8 GPIO pins-- way less spots to hook up to than the Arduino. It's also a lot bigger than the tiny arduino variations. the tradeoff is that it *runs Linux*. You can therefore write code for it in any language you like, untethered.

- run a web server
- run your home automation system with a control UI
- run your home AV system & do DVR

- also in this category is the beaglebone black, one of my personal favorites. it doesn't have the marketing angle the Pi has, but it's got a faster processor and twice as much memory as the Pi. It's what I used for my cat tracker plotting system.

#### the modern wave: Espruino & Tessel


### How to pick a platform

### How to learn how to build things

### An aside on problem solving in new topic areas


### Where to get more help




## Conclusion






