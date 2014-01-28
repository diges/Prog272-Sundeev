/**
 * @author Dmitry
 */

/* jshint strict:true */


var myConverter = {
	MilesToKm: function(value) {'use strict';
		var kf = 1.60934;
		return value*kf;
	},
	FrToCelsius: function (value) {'use strict';
		return (value-32)*5/9;
	},
	sqRoot: function (value){'use strict';
		return value*value;
	}
};

function display(){
	var fr=parseFloat(document.getElementById("fr").value);
	document.getElementById("cellsius").innerHTML=myConverter.FrToCelsius(fr).toFixed(2);
	
	var milles=parseFloat(document.getElementById("milles").value);
	document.getElementById("km").innerHTML=myConverter.MilesToKm(milles).toFixed(2);
	
	var sq=parseFloat(document.getElementById("sq").value);
	document.getElementById("sqroot").innerHTML=myConverter.sqRoot(sq).toFixed(2);

}

var scale = 100;

var myScale = {
	ZoomIn : function() {
		scale += 100;
		document.body.style.zoom = scale + "%";
	},
	ZoomOut : function() {
		scale -= 100;
		document.body.style.zoom = scale + "%";
	}
};



/* document.addEventListener('DOMContentLoaded', function() { 'use strict';
	document.getElementById('resObf').innerHTML = milesConvert.milesToFeet();
	document.getElementById('resFunc').innerHTML = fnMilesConvert(50);
}, false);
*/