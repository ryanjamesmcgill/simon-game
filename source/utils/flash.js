var $ = require("jquery");

var flash = function(selector, color, scale, done){
	if(scale === 1.0){
		flash_noScale(selector, color, done);
		return;
	}
	var e = $(selector);
	var originalColor = e.css('background-color');
	e.css('background-color',color)
		.css('transform', 'scale('+scale+')');
	window.setTimeout(function(){
		e.addClass('flashTransition')
			.delay(100)
			.css('background-color',originalColor)
			.css('transform', 'scale(1.0)');
	},100);

	window.setTimeout(function(){
		e.removeClass('flashTransition');
		if(typeof done === "function"){
			done();	
		}
	},600);
};

var flash_noScale = function(selector, color, done){
	var e = $(selector);
	var originalColor = e.css('background-color');
	e.css('background-color',color);
	window.setTimeout(function(){
		e.addClass('flashTransition')
			.delay(100)
			.css('background-color',originalColor);
	},100);

	window.setTimeout(function(){
		e.removeClass('flashTransition');
		if(typeof done === "function"){
			done();	
		}
	},600);	
};

module.exports = flash;

