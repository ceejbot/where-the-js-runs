# Where does the javascript run, anyway?

## Intro

About fifteen years ago, I had a cat who liked to wander. He'd vanish off to goodness knows where in the neighborhood. I'd spot him sitting high up on a neighbor's roof, meowing down at me to say hi. I always wondered, where the heck does that cat *go*? Wouldn't it be great if I could track him?

So I set out to figure out how.

Use radios? transponder on his collar? triangulate?

Wait, what kind of radio? that radio looks way too big to put on the cat. Should I set three up in corners of my yard, but a transponder on him, and triangulate? How can I do this without spending a zillion dollars?

Dream of tracking my cat went unfulfilled and I forgot about it.


### Why stuff is possible now

I went to an Arduino + node.js hardware hacking day last year out of curiosity. I hadn't heard of Arduinos before, but I was super into Node. Turns out, all this hardware stuff had changed in the last fifteen years. Moore's law is still a thing. A computer that cost thousands of dollars in the 80s is now the size of a credit card or smaller, and it costs $30.

GPS modules were the size of a postage stamp. Lithium polymer batteries were even smaller. I realized I'd no longer have to load my cat up with a harness of gear to track her.

My cat tracker dream and your [specific] dream can become reality today. It doesn't take expensive hardware or giant batteries. 

(mention running a hack day)

### The dream

Maybe you have a dream like that. Something you've always wanted to do, if only you could. What do you want to do? Tell me!

- put a video camera on your dog
- reading a moisture sensor, noting that it's below a threshold, then flipping a relay to turn on a sprinkler
- streaming in video from a camera, doing some pattern-matching on the image, then turning your nodecopter to a new heading
- turn your lights on when you get home, without paying a lot of money for the fun

### Make the dream reality

Now we're going to get into details. At that first hack day, I figured out that my cat tracker was theoretically possible, but then I was left on my own. My goal is to spend the next twenty minutes jumpstarting you on hardware hacking with javascript & some other languages. I'm going to tell you everything that I wish somebody had told me. You'll walk away knowing how to get started on your project & where to go to learn what you'll need next.

You ready? Let's dive.

## Development

### The basics

What's making the hardware hacking accessible these days is a new generation of microcontrollers. These things are little boards with tiny low-power processors on them, often older chips. They'll usually have some flash memory where you store the code you're runing, and a whole bunch of *easily accessible* electrical contact points. You'll hear these contact points called `pins`. This is what distinguishes a hackable hardware from ordinary small computers-- the ability to hook up sensors on the pins.

Most of them will also have USB somewhere for easy access from your regular-sized computer. You do serial over USB. This gives you a console-- the ability to see logs, and to send commands.

The boards look like this (shot of arduino), bare things with all the elements hanging out, easy to get at.

You'll wire up input devices to some of the pins. For example, you might hook up a temperature sensor to one of the pins of your Arduino. Output devices get hooked up to other pins. You read data from the input pins, make decisions about it, then write to the output pins to make something happen. Sound familiar? It's just programming. It's just at a lower level in the computer stack than you've done it before.

Software is a back-formation from hardware, after all. It's just melted and squishable hardware.

### Power everything

Electricity.

Now we come to one of those intimidating topics. Fear not, I say! There's a lot of stuff to learn here, but mostly you only need the basic principles to get started.

You need complete circuits: the electrons must flow (electrons expand consciousness). 

But you do need to know a little bit. (diode slide)

### How to do it

Step 1: provide power to the board. Your USB connection to your laptop provides just under 5 volts of power while you're connected. You'll need a battery when you're not. 

Step 2: Next you tap off the board's power supply to feed your I/O devices. Your I/O devices need power too! Generally your board will have two connections: a live *positive* connector, at 5V or 3V typically for these boards, and a *ground* or *negative*. 

Current goes *in* to an input's 5V/+ pin and then *out* through the ground. (Well, actually the electrons flow the other way, but ssshh, don't tell anybody.)

For simpler parts like resistors or buttons, order doesn't matter. Order *does* matter for diodes, which go only one way by definition! Note that an LED is a diode, so this is a fact you'll need to remember for the very first circuit you make in all these workshops.

* positive: longer wire (to 5V)
* negative: shorter wire (to ground)
* put a resistor in there somewhere or it'll pop
Arduinos run at 5V and so do all the gizmos designed to work with them. You'll also get lots of things designed to run at 3.3V, and you'll learn how to change the voltage level of your circuit down. 

To learn more:

Practical Electronics for Inventors
http://www.amazon.com/Practical-Electronics-Inventors-2-E/dp/0071452818


## Boards

So what are these board things? How do you get them? The most famous one is the Arduino, which you've probably heard about.

#### the arduino family

This is the Arduino Uno, responsible for kicking off the current madness.
 
- 8-bit ATMega processors, 16MHz 
- often not a lot of memory: 32K flash on the Uno
- 14 digital IO pins, 6 of which can do PWM (which means variable output levels-- this is how you make an LED pulse easily)
- 6 analog inputs
- a 16 MHz ceramic resonator, which means it has a moderately precise real-time clock for timing operations

You program it in the Arduino Sketch language, which is C++. You compile sketches with their IDE then download to the flash on the board.

You have heard about programming Arduino with javascript! You can do this! You should do this! it is a great way to get started with a language you already know! But here's the cheat: the javascript does not run on the Arduino. What you run on the Arduino is "Firmata", a protocol for controlling the Arduino as a serial device from a host computer. You run a node implementation of that on your laptop's side, then tether your arduino with usb.

https://github.com/jgautier/firmata

Why do you do this? Because the APIs are so much nicer in JS than they are in C. the [Johnny-Five](https://github.com/rwaldron/johnny-five) library is a lovely way to interact with hardware.

```C
int ledPin = 9; // 9 is a PWM pin with a ~ next to it
int direction = 1;
int fade = 0;

void setup() { } 

void loop()
{
	analogWrite(ledPin, fade);

	fade += direction;
	if ((fade >= 255) || (fade <= 0))
		direction = -1 * direction;

	delay(15);
}
```


```javascript
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function()
{
	// using the same PWM pin
	var led = new five.Led({ pin: 9 });
	led.pulse();
});
```

[[ Talk about the differences visible in those two code samples. ]]

The gorgeous thing is that javascript's comfort with async code is perfect here. Hardware is just another source of kinda slow I/O, just like a database or a network request. Data comes in from the sensor *sometimes*, and the callback fires when it does. Here's a button example with JohnnyFive:

```javascript
var five = require("johnny-five");
var board = new five.Board();
board.on("ready", function()
{
	var button = new five.Button(8); // signal goes into arduino pin 8
	button.on('down', function() { console.log('on'); });
	button.on('up', function() { console.log('off'); });
	button.on('hold', function() { console.log('holding'); });
});
```

The downside is that if you want to write Javascript to control an Arduino, you need a host computer to run node. You're tethered. For lots of applications this is fine, but sometimes you want to be mobile. Say, you're building something you're going to attach to a cat collar. Before long you'll be writing C++ for your Arduino. 

Once you're untethered there are all kinds of tiny variations on the Arduino you can use. They're small enough to tuck into out of the way places or be carried around by a grumpy cat. The one I'm using for my project is called the Teensy. I'm writing C++ to control a GPS logger and a Bluetooth module, because I need my cat tracker to be mobile.

Let's suppose we want some more memory. Let's move up a notch to the other computer making this possible.

#### raspberry pi

- much more modern ARM processor
- 512MB
- HDMI out, audio out
- ethernet
- 3 usb connectors
- a GPU with H264 in hardware
- an SD card slot

Now how much would you pay? How about US$35?

8 GPIO pins-- way less spots to hook up to than the Arduino. It's also a lot bigger than the tiny arduino variations. the tradeoff is that it *runs Linux*. You can therefore write code for it in any language you like, untethered.

- run a web server
- run your home automation system with a control UI
- run your home AV system & build your DVR

If you can compile it for ARM, you can do it on the Pi.

Also in this category is the Beaglebone Black, one of my personal favorites. it doesn't have the marketing angle the Pi has, but it's got a faster processor and twice as much memory as the Pi. It's what I'm using for my cat tracker base station. It sits there by the cat door, logging her in & out. Or it will, just as soon as I sort out the bluetooth

#### the modern wave: Espruino & Tessel

Hey, we're finally running javascript on things! But it gets even cooler. The modern wave of boards takes the Arduino and puts the javascript right on it.

The Espruino is a JS interpreter designed for microcontrollers. Compare this with V8, which is designed to be embedded in a browser, which is a very different environment. They ran Kickstarter project for manufacturing boards designed to run this interpreter. It'll be shipping some time next year.

The next one in this category is the Tessel. This is a microcontroller platform with modules-- it also runs Javascript. Sort of. You send it JS, it JITs the js to lua bytecodes & runs that. It is a lot like an Arduino in that you have an initialize routine & then a run-loop that goes forever.

These platforms aren't available yet, but they'll be shipping soon. And they represent the future of hobby hardware development-- we're going to see more high-level languages running in surprising places. If somebody does this talk next year, they'll start with the Tessel.

## Put a project together

Okay, awesome, we know where the javascript runs now. And the answer is: it depends. So how do we pick which one of these to use for our project?

### How to pick a platform

Just getting started? Use an Arduino. Flash it with node-firmata, install Johnny-Five, and learn the basics of setting up circuits. Do this! It reduces the size of the problem space as you're getting started. You already know the language, after all. This lets you concentrate on building circuits that do what you want, and on reading data from sensors. It's easy to debug & fast to run new stuff.

Size: do you need it to be tiny and battery-run? You're probably doing it with an Arduino or a variant.

Lots and lots of sensors and servos? Probably an Arduino.

Heavy processing load, like computer vision? Probably a Beagle.

Need video output? Probably a Raspberry Pi. The Pi is an odd platform but it's easily available & lots of people have written software for it already.

Okay! So you're starting with an Arduino, and you've found a nifty moisture sensor so you can tell when your plant needs watering. How to you get them talking to each other?


## Data must flow too

Most of the things you'll hook up will also have some kind of data that needs transmitting as well. Even something as simple as a button has a signal to send. So you power it, then you run a jumper from the button's signal line to one of the digital pins on your device. Then you write code to read it.

Complicated devices like Bluetooth modules or GPS modules will have more complicated connections. You'll connect receive and transmit lines to the Arduino's digital pins. On my cat tracker, data flows from GPS -> Teensy over the main serial connection. One wire for TX, one wire for RX. The Teensy then talks to a Bluetooth module over another serial connection. Both modules also get powered from the same battery that powers the Teensy.

When in doubt, consult the circuit diagrams on sites like Adafruit or the JohnnyFive docs. You can build circuits slowly, one block at a time, the same way you build software. 

### Where to get more help

My salvation on that first hack day was the Johnny Five docs. I had no idea what was going on with the Arduino, though I did bring some very dusty experience reading circuit diagrams from college days. I knew what serial was, more or less, and I knew I wasn't going to get shocked by anything.

I spent a lot of time reading Adafruit tutorials to figure out how things worked. Surely there is some great mystery to talking to a GSP module, I thought. It's arcane and difficult, right?

Not so much. There's a protocol. It's documented. The hard parts of doing serial communication over the wires are already done for you. All you have to do is decide what the data means, which is exactly what you've always been doing when writing software. The insight here is that there's nothing special going on. It's just another pile of jargon to learn, another set of trivia to store away. And to be honest, the language shift isn't so bad either. You'll step over into C++ when you need to.

## Conclusion

Hardware programming is more accessible than it's ever been before. If you want to learn about it, now is the time. If you've ever had a whacky dream involving robotics, or video cameras pointed at interesting things, or home automation, now is the time. It's cheap, it's available by mail-order, it's programmable in a language that doesn't give you hives. You can do it in javascript. You want to be a maker? Go do it now.



