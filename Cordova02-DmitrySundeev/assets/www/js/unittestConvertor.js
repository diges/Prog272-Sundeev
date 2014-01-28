/**
 * @author Dmitry
 */


describe("Prog272 converter test", function() { 'use strict';

	it("expects MilesToKm(50) return 80.467", function() {
		expect(myConverter.MilesToKm(50)).toBe(80.467);
	});

	it("expects FrToCelsius(50) to equal 10", function() {
		expect(myConverter.FrToCelsius(50)).toBe(10);
	});
		
	it("expects sqRoot(50) to equal 2500", function() {
		expect(myConverter.sqRoot(50)).toBe(2500);
	});
}); 
