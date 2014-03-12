/**
 * @author Dmitry
 */

calculate.Publisher =(function(){
	
	function Publisher(){
		
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
	
	/*var addPublish = function() {
		var AddDetails = {
			a: getA(),
			b: getB(),
			func: function(value){
				// alert(value);
				display(value);
				//$("#response").html(value);
			},
		};
		$.Topic('addModule').publish(AddDetails);
	};*/
	
	/*var MultPublish = function() {
		var MultDetails = {
			a: getA(),
			b: getB(),
			func: function(value){
				// alert(value);
				display(value);
				//$("#response").html(value);
			},
		};
		$.Topic('PubModule').publish(MultDetails);
	};*/
	
	
	
	return Publisher;
	
})();


$(document).ready(function() {
	new calculate.Subscriber();
	new calculate.Publisher();
});

