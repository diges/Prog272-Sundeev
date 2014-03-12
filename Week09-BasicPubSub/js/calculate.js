/**
 * @author Dmitry
 */

var calculate = {};
	
calculate.Subscriber = (function() {
	
	function Subscriber() {
		$.Topic('calculate').subscribe(mathAdd);
	}
	
	function mathAdd(data) {
		console.log(data.operation);
		console.log(data.a+", "+data.b);
		
		var result=eval(data.operation)(data.a, data.b);
		data.html(result);
		
	}
	
	function add (A,B) {
		return A+B;
	};
	function substract (A,B) {
		return A-B;
	};
	function multiply(A,B){
		return A*B;
	};
	
	
	return Subscriber;
	
})();


