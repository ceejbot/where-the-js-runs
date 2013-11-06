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

### The dream

Maybe you have a dream like that. Something you've always wanted to do, if only you could.

- put a video camera on your dog
- reading a moisture sensor, noting that it's below a threshold, then flipping a relay to turn on a sprinkler
- streaming in video from a camera, doing some pattern-matching on the image, then turning your nodecopter to a new heading
- turn your lights on when you get home, without paying a lot of money for the fun

Ask the audience what their project is. Get a couple of people to shout it out.

### Make the dream reality

Now we're going to get into details. My goal is to spend the next twenty minutes jumpstarting you on hardware hacking with javascript & some other languages. You'll walk away knowing how to get started on your project & where to go to learn what you'll need next.

## Development

You ready? Let's dive.

### The basics

The computers are little boards with tiny low-power processors on them, often older chips. They'll usually have some flash memory where you store the code you're runing, and a whole bunch of *easily accessible* electrical contact points. You'll hear these contact points called `pins`. This is what distinguishes a hackable hardware from ordinary small computers-- the ability to hook up sensors on the pins.

Most of them will also have USB somewhere for easy access from your regular-sized computer. You do serial over USB. This gives you a console-- the ability to see logs, and to send commands.

The boards look like this (shot of arduino), bare things with all the elements hanging out, easy to get at.

You'll wire up input devices to some of the pins. For example, you might hook up a temperature sensor to one of the pins of your Arduino. Output devices get hooked up to other pins. You read data from the input pins, make decisions about it, then write to the output pins to make something happen. Sound familiar? It's just programming. It's just at a lower level in the computer stack than you've done it before.

## Boards

So what are these board things? How do you get them? The most famous one is the Arduino. You've heard of them, I bet. 

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

Why do you do this? Because the APIs are so much nicer in JS than they are in C. the Johnny Five library is a lovely way to interact with hardware.

[example: same code snippet in C++ vs JohnnyFive]

But if you're going untethered there are all kinds of tiny variations on the arduino you can use. They're small enough to tuck into out of the way places or be carried around by a grumpy cat.

Let's move up a notch.

#### raspberry pi

- much more modern ARM processor
- 512MB
- HDMI out, audio out
- ethernet
- 3 usb connectors
- a GPU with H264 in hardware
- an SD card slot

Now how much would you pay? How about $US 35?

8 GPIO pins-- way less spots to hook up to than the Arduino. It's also a lot bigger than the tiny arduino variations. the tradeoff is that it *runs Linux*. You can therefore write code for it in any language you like, untethered.

- run a web server
- run your home automation system with a control UI
- run your home AV system & do DVR

You can compile 

#### Some other names to know

Beaglebone Black

Also in this category is the beaglebone black, one of my personal favorites. it doesn't have the marketing angle the Pi has, but it's got a faster processor and twice as much memory as the Pi. It's what I used for my cat tracker plotting system.

[[ other? ]]

#### the modern wave: Espruino & Tessell

Javascript runs directlly on these! Sort of.

Espruino has its own JS interpreter.

Tessell JITs the js to lua bytecodes & runs that. It is a lot like an Arduino in that you have an initialize routine & then a run-loop that goes forever.

These platforms aren't available yet, but they'll be shipping soon. And they represent the future of hobby hardware development-- we're going to see more high-level languages running in surprising places.

## Putting the parts together



### How to pick a platform

Just getting started? Use an Arduino. Flash it with node-firmata, install Johnny-Five, and learn the basics of setting up circuits. Do this! It reduces the size of the problem space as you're getting started. You already know the language, after all. This lets you concentrate on building circuits that do what you want, and on reading data from sensors. It's easy to debug & fast to run new stuff.


Size: do you need it to be tiny and battery-run? You're probably doing it with an Arduino or a variant.

Lots and lots of sensors and servos? Probably an Arduino.

Heavy processing load, like computer vision? Probably a Beagle.

Need video output? Probably a Raspberry Pi. The Pi is an odd platform but it's easily available & lots of people have written software for it already.



### Power everything

Electricity.

Now we come to one of those intimidating topics. Fear not, I say! There's a lot of stuff to learn here, but mostly you only need the basic principles to get started.

You need complete circuits: the electrons must flow (electrons expand consciousness). 

volts: voltage, or the potential to flow. Think of this as water pressure.

amps: current, or how much water is flowing.

ohms: resistance, or how how wide the water pipe is (wide pipes are lower resistance)

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



### How to learn how to build things

### Where to get more help




## Conclusion


Hardware programming is more accessible than it's ever been before. If you want to learn about it, now is the time. If you've ever had a whacky dream involving robotics, or video cameras pointed at interesting things, or home automation, now is the time. It's cheap, it's available by mail-order, it's programmable in a language that doesn't give you hives. You can do it in javascript. You want to be a maker? Go do it now.



