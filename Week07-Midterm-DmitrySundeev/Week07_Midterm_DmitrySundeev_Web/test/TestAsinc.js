
describe("Asyncfile Unit test", function() {'use strict';
	
	/*var dataObj = { title: 'Sonnet 146',
					id: '530c00ee76e171c70c84b402'};*/
					
	it("Tests that 'import' gets called", function() {
		// get is stubbed and never really called
		spyOn($, "get");
		MongoData.routes.addFromFile('/import', null);
		expect($.get).toHaveBeenCalled();
	});
	
	
	it("Tests that 'import' is called with Shakespeare_db.json", function() {
		// get is stubbed and never really called
		spyOn($, "get");
		MongoData.func.loadFile("/sources/Shakespeare_db.json", function(data) {
			console.log(data);
		});
		expect($.get).toHaveBeenCalledWith("/sources/Shakespeare_db.json", jasmine.any(Function));
	});
	
	
	it("Integration test / MongoData.func.loadFile real request to Shakespeare_db.json ", function(done) {
		// Actual call to function
		spyOn($, "get").and.callThrough(); 
		MongoData.func.loadFile("/sources/Shakespeare_db.json", function(responseText) {
			//console.log(responseText[0].title);
			expect(responseText[0].title).toBe('Sonnet 1');			
			done();
		});
		expect($.get).toHaveBeenCalledWith("/sources/Shakespeare_db.json",
				jasmine.any(Function));
	});
	

	it("MongoData.routes.queryFilteredCombo / callback is called", function(done) {
		// Create a fake "get". Don't call real jquery.get, call this one.
		spyOn($, "get").and.callFake(function(options, callbackReference) {
			callbackReference(); // This is the jasmine spy callback
			expect(callback).toHaveBeenCalled(); // Was the spy called?
			done();
		});
		var callback = jasmine.createSpy();
		MongoData.routes.queryFilteredCombo("5312e13f730d42d8141f4d72", callback);
	});
	
	it("MongoData.routes.queryFilteredCombo / callback is called", function(done) {
		// Create a fake "get". Don't call real jquery.get, call this one.
		spyOn($, "get").and.callFake(function(options, callbackReference) {
			callbackReference(); // This is the jasmine spy callback
			expect(callback).toHaveBeenCalled(); // Was the spy called?
			done();
		});
		var callback = jasmine.createSpy();
		MongoData.routes.readData(callback);
	});
	
	it("MongoData.routes.queryFiltered / callback is called", function(done) {
		// Create a fake "get". Don't call real jquery.get, call this one.
		spyOn($, "get").and.callFake(function(options, callbackReference) {
			callbackReference(); // This is the jasmine spy callback
			expect(callback).toHaveBeenCalled(); // Was the spy called?
			done();
		});
		var callback = jasmine.createSpy();
		MongoData.routes.queryFiltered("time",callback);
	});
	
	it("Integration test / request of queryFiltered with filter parameter:time", function(done) {
		MongoData.routes.queryFiltered("time", function(responseText) {
			//console.log(responseText.length);
			expect(responseText.length).toBe(2);
			done();
		});
	});
	
	it("Integration test / request of queryFilteredCombo with ID filter parameter", function(done) {
		MongoData.routes.queryFilteredCombo("5312e13f730d42d8141f4d72", function(responseText) {
			expect(responseText.length).toBe(1);
			done();
		});
	});
	
	

});
