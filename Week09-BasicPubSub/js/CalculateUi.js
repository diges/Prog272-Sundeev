/**
 * @author Dmitry
 */

calculate.Publisher =(function(){
	
	function Publisher(){
		
		$("#btAdd").click(addPublish);
		
		var response = {
			message : 'Publisher constructor Called',
			acknowledge : function(value) {
				$("#response").html(value);
			}
		};
		
		$.Topic('Results').publish(response);
		
	}
	
	var addPublish = function() {
		var AddDetails = {
			a: getA(),
			b: getB()
		};
		$.Topic('addModule').publish(AddDetails);
	};
	

	
	var getA  = function(){
		return parseInt($("#numberA").val());
	};
	
	var getB= function(){
		return parseInt($("#numberB").val());
	};
	
	return Publisher;
	
})();


$(document).ready(function() {
	new calculate.Subscriber();
	new calculate.Publisher();
});

