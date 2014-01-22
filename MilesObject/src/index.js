/**
 * @author dmitry.sundeev
 */

/* jshint strict:true */

var milesConvert = {
	miles : 3,
	feetPerMile : 5280,
	milesToFeet : function() {'use strict';
		return this.miles * this.feetPerMile;
	}
};

function fnMilesConvert(miles) {'use strict';
	var feetPerMile = 5280;
	var result = miles * feetPerMile;
	return result;
}

document.addEventListener('DOMContentLoaded', function() { 'use strict';
	document.getElementById('resObf').innerHTML = milesConvert.milesToFeet();
	document.getElementById('resFunc').innerHTML = fnMilesConvert(50);
}, false);

