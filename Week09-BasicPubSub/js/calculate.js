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
	
	//var result;
	
	function Subscriber() {
		$.Topic('calculate').subscribe(mathAdd);	
		//$.Topic('Results').subscribe(funcResults);
				
	}

	/*function funcResults(data) {
		console.log(data);
		console.log(data.message);

		//data.acknowledge("test");
		
	} */
	
	
	

	function mathAdd(data) {
		console.log(data.operation);
		console.log(data.a+data.b);
		var result=data.a+data.b;
		data.func(result);
		
	}
	
	return Subscriber;
	
})();


