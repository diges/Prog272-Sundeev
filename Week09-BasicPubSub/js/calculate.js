/**
 * @author Dmitry
 */

var calculate = {};

/*calculate.math = ( function() {
	
	this.add= function(A,B) {
		return A+B;
	};
	this.substract =function(A,B) {
		return A-B;
	};
	this.multiplay=function(A,B){
		return A*B;
	};
	
	return math;
	
})(); */

calculate.Subscriber = (function() {
	
	var result;
	
	function Subscriber() {
		$.Topic('addModule').subscribe(function02);	
		$.Topic('Results').subscribe(funcResults);
				
	}

	function funcResults(data) {
		console.log(data);
		console.log(data.message);

		data.acknowledge(result);
	}
	
	
	

	function function02(data) {
		console.log(data);
		console.log(data.a+data.b);
		result=data.a+data.b;
		
	}
	return Subscriber;
	
})();


