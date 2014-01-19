/**
 * @author dmitry.sundeev
 */


/* jshint strict:true */

var milesConvert = {
	miles: 3,
	feetPerMile: 5280,
	milesToFeet: function () { 'use strict';
		return this.miles * this.feetPerMile;
	}
};


function fnMilesConvert(miles){ 'use strict';
	var feetPerMile = 52800;
	var result = miles * feetPerMile;
	document.getElementById('answ').innerHTML=result;
	return result;
}


describe("Prog272 test", function() { 'use strict';

	it("expects milesToFeet return 15840", function() {
		expect(milesConvert.milesToFeet()).toBe(15840);
	});

	it("expects add(3,7) to equal 10", function() {
		var actual=fnMilesConvert(50);
		expect(actual).toBe(2640000);
	});
}); 