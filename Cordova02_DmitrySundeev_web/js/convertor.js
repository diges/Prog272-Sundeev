/**
 * @author Dmitry
 */

function MyConverter() {

	var that = this;

	this.MilesToKm = function(value) {
		var kf = 1.60934;
		return value * kf;
	};
	this.FrToCelsius = function(value) {
		return (value - 32) * 5 / 9;
	};
	this.sqRoot = function(value) {
		return value * value;
	};

	this.calc = function() {
		var fr = parseFloat($("#fr").val());
		$("#cellsius").html = that.FrToCelsius(fr).toFixed(2);

		var milles = parseFloat($("#milles").val());
		$("#km").html = that.MilesToKm(milles).toFixed(2);

		var sq = parseFloat($("#sq").val());
		$("#sqroot").html = that.sqRoot(sq).toFixed(2);

	};


};


$(document).ready (function (){
	    var myConverter = new MyConverter();
		$("#bt1").click(myConverter.calc);
		//$("#bt1").click(myConverter.FrToCelsius);
});
