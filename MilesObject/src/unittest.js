/**
 * @author Dmitry
 */



describe("Prog272 test", function() { 'use strict';

	it("expects milesToFeet return 15840", function() {
		expect(milesConvert.milesToFeet()).toBe(15840);
	});

	it("expects add(3,7) to equal 10", function() {
		var actual=fnMilesConvert(50);
		expect(actual).toBe(264000);
	});
}); 