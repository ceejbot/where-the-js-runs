where-the-js-runs
=================

my Cascadia JS 2013 speech materials.

The [slides](slides/js_hardware.key) are a Keynote presentation. Some of the sources images are in [the assets folder](assets/).

Links from the presentation:

[Johnny-Five](https://github.com/rwaldron/johnny-five)

[Nodebots](http://nodebots.io)

[Arduino Experimenter's Kit in Node.js](http://node-ardx.org)


process.stdin.setEncoding('utf8');
process.stdin.on('data', function(keypress)
{
	handleKey(keypress);
}
