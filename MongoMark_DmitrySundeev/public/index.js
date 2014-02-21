/**
 * @author Dmitry
 */

var Func = (function(){
	
	// Constructor
	function Func(){
		$("#btLoad").click(load);
		$("#btRead").click(show);

	}
	
	var load = function() {
		
		var fResult = $('#results');
		
		$.get('/loadfile', function(data) {
			//fResult.html("<strong>" + data.result + "</strong>");
		});
	};
	
	var show = function() {
		
		var fResult = $('#results');
		$.get('/show', function(data) {
			fResult.html(data);
		});
	};
	

	
	return Func;
	
	
}());




$(document).ready(function(){
	new Func();
});

