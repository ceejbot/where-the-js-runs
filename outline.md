# Where does the javascript run, anyway?

## Intro

About fifteen years ago, I had a cat who liked to wander. He'd vanish off to goodness knows where in the neighborhood. I'd spot him sitting high up on a neighbor's roof, meowing down at me to say hi. I always wondered, where the heck does that cat *go*? Wouldn't it be great if I could track him?

So I set out to figure out how.

- use radios? transponder on his collar? triangulate?
- wait, what kind of radio? how do I even figure this out?
- dream of tracking my cat went unfulfilled and I forgot about it.

### Hardware has changed

I went to an Arduino + node.js hardware hacking day last year out of curiosity. I hadn't heard of Arduinos before, but I was super into Node. Turns out, all this hardware stuff had 


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

Do you need this to run on a battery off somewhere? Do you need it to be small? You're going Arduino.

Do you have lots and lots of sensors and servos to connect up?

### How to learn how to build things

### An aside on problem solving in new topic areas


### Where to get more help




## Conclusion






