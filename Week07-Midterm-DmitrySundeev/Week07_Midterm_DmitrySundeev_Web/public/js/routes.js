MongoData.routes =  new (function() {'use strict';

	this.readData = function(callback) {
		$.getJSON('/readAll', callback); 
	};
	
	this.queryFiltered = function(url,callback) {
		$.getJSON('/keyword/'+url, callback);
	};
	
	this.queryFilteredCombo = function(mID, callback) {
		$.getJSON('/mongoid/'+mID, callback); 
	};
	
	this.DeleteByIdRoute = function(mID, callback) {
		$.getJSON('/deleteid/'+mID, callback);
	};
	
	this.add = function(obj) {
		$.ajax({
			url : "/add",
			type : "POST",
			data : {"obj" : obj},
			dataType : "json",
			success : function(data) {					
				//response.send({result:"success"});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});		
	};
	
	
	this.addFromFile = function() {
		$.getJSON('/import', function(data) {
			alert(data);
		});
	};

})();



