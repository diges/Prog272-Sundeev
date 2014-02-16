/**
 * @author Dmitry
 */


var MyObj = (function (){
	
	function MyObj (){
		console.log("MyObj.Constructor called");
	}
	
	
	MyObj.prototype.FeetInMile = function (){
		return 5280;
	};
	
	MyObj.prototype.FeetInMileS = function (miles){
		return (this.FeetInMile()*miles);
	};

	MyObj.prototype.circumference  = function (Radius){
		return (2*Radius*Math.PI);
	};	
	
	
	return MyObj;
	
	
})();

exports.myObj = new MyObj();
