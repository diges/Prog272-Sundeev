/**
 * @author Dmitry
 */
//var fInMile = require('./logic');


define (
	[
	"logic"
	],
	function(Obj){
		
		describe ("adfasdf", function(){
			var fInMile= new Obj();
			
			it("return 5280", function(){
				expect(fInMile.FeetInMile()).toBe(5280);
				
			});
			
			
		});
		
		
	}
	
);


/*
describe("Prog272 converter test", function() { 'use strict';

	it("expects MilesToKm(50) return 80.467", function() {
		//var myConverter = new MyConverter();
		expect(fInMile.FeetInMile()).toBe(5280);
	});

	/*it("expects FrToCelsius(50) to equal 10", function() {
		var myConverter = new MyConverter();
		expect(myConverter.FrToCelsius(50)).toBe(10);
	});
		
	it("expects sqRoot(50) to equal 2500", function() {
		var myConverter = new MyConverter();
		expect(myConverter.sqRoot(50)).toBe(2500);
	});
}); */
