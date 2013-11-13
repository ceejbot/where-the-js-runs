var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function()
{
	// signal goes into arduino pin 8
	var button = new five.Button(8);
	board.repl.inject({ button: button });

	// Fun button facts!
	// https://learn.sparkfun.com/tutorials/pull-up-resistors/what-is-a-pull-up-resistor
	button.on('down', function()
	{
		console.log('on');
	});

	button.on('up', function()
	{
		console.log('off');
	});

	button.on('hold', function()
	{
		console.log('holding');
	});
});
