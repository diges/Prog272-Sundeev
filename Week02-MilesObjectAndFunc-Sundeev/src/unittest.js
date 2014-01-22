/**
 * @author Dmitry
 */



describe("Prog272 test", function() { 'use strict';

	it("expects milesToFeet return 15840", function() {
		expect(milesConvert.milesToFeet()).toBe(15840);
	});

	it("expects fnMilesConvert(50) to equal 264000", function() {
		var actual=fnMilesConvert(50);
		expect(actual).toBe(264000);
	});
}); 