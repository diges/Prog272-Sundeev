
describe("Asyncfile Unit test", function() {'use strict';
	
	var dataObj = { title: 'Sonnet 146',
					id: '530c00ee76e171c70c84b402'};

	it("Tests that mongoData.readData retrives data from server by /readAll", function() {
		// get is stubbed and never really called
		spyOn($, "get");
		mongoData.readData('/readAll', function(data) {
			console.log(data);
		});
		expect($.get).toHaveBeenCalledWith('/readAll', 	jasmine.any(Function));
	});
	
	it("Tests that mongoData.readData retrives data from server by /readAll", function() {
		// get is stubbed and never really called
		spyOn($, "get").and.callThrough();
		mongoData.readData('/readAll', function(responseText) {
			console.log(responseText);
			//var fineTime = $(responseText).filter('#paragraph04').html();
			console.log(responseText.id);
			expect(responseText.id).toBe('Fine time.');
		});
		expect($.get).toHaveBeenCalledWith('/readAll', 	jasmine.any(Function));
	});
	

});
