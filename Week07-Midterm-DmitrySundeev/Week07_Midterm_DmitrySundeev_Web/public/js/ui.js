MongoData.interface = new function() { 'use strict';
	
		
	var readDataToCombo = function() {
		MongoData.routes.readData(function(results) {
			console.log(results);
			$("#resultsDebug").empty();
			$("#select").empty();
			for (var i = 0; i < results.length; i++) {
					$("#select").append('<option id="'+ results[i]._id + '">' + results[i].title + '</option>');
					$("#resultsDebug").append('<li>' + JSON.stringify(results[i]) + '</li>');
			}
		});
		
	};
	
	
	
	this.init  = function() {		
		$("#readAll").click(readDataToCombo);
		
	};
	
};

$(document).ready(function() {	
	MongoData.interface.init();		 
});
