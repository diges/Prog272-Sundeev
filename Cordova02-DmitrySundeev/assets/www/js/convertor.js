/**
 * @author Dmitry
 */

/* jshint strict:true */


function MyConverter() {

	var that = this;

	this.MilesToKm = function(value) {'use strict';
		var kf = 1.60934;
		return value * kf;
	};
	this.FrToCelsius = function(value) {'use strict';
		return (value - 32) * 5 / 9;
	};
	this.sqRoot = function(value) {'use strict';
		return value * value;
	};

	this.calc = function() {
		var fr = parseFloat($("#fr").val());
		$("#cellsius").html(that.FrToCelsius(fr).toFixed(2));

		var milles = parseFloat($("#milles").val());
		$("#km").html(that.MilesToKm(milles).toFixed(2));

		var sq = parseFloat($("#sq").val());
		$("#sqroot").html(that.sqRoot(sq).toFixed(2));

	};

	var scale = 100;

	this.ZoomIn = function() {
		scale += 100;
		document.body.style.zoom = scale + "%";
	};
	this.ZoomOut = function() {
		scale -= 100;
		document.body.style.zoom = scale + "%";
	};

};

