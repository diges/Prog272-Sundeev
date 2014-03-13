/**
 * @author Dmitry
 */


// Publisher
define(['jquery', 'tinyPubSub'], function() {
	
//calculate.Publisher =(function(){
	
	function publisher(){
		
		$("#btAdd").click({x:'add'}, pub);
		$("#btMultiply").click({x:'multiply'}, pub);
		$("#btSubtract").click({x:'substract'}, pub);
		
	}
	
	function display(value) {
		$("#response").html(value);
	}
	
	
	var pub = function(event) {
		var object = {
			a: getA(),
			b: getB(),
			html: function(value){
				display(value);
			},
			operation:event.data.x
		};
		$.Topic('calculate').publish(object);
	};
	
	var getA  = function(){
		return parseInt($("#numberA").val());
	};
	
	var getB= function(){
		return parseInt($("#numberB").val());
	};
	

	return {publisher: publisher};

});
