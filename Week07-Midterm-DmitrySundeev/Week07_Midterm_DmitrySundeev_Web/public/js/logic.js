MongoData.routes =  new function() {

	var mongoData;
	
	
	this.readData = function(callback) {'use strict';
		
		$.getJSON('/readAll', callback); /*function(data) {
			console.log(data);
			res.send(data);
			//return data; */
		//};
		
	};
	
};
	
	/* this.queryFiltered = function() {'use strict';
		var url = $("#txtFilter").val();
		
		$.getJSON('/keyword/'+url, function(data) {
			mongoData = data;
			console.log(data);
			displayData();
			$("#resultsDebug").empty();
			for (var i = 0; i < data.length; i++) {
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	
	
	this.queryFilteredCombo = function() {'use strict';
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!==undefined)
		{
			$.getJSON('/mongoid/'+mID, function(data) {
				mongoData = data;
				console.log(mongoData);
				displayData();
				$("#resultsDebug").empty();
				for (var i = 0; i < 1; i++) {
					$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
				}
			});
		}
	};
	
	
	
	this.DeleteById = function() {'use strict';
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!==undefined)
		{
			$.getJSON('/deleteid/'+mID, function(data) {
				mongoData = data;
				console.log(mongoData);
				displayData();
				$("#resultsDebug").empty();
				for (var i = 0; i < 1; i++) {
					$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
				}
			});
		}
	};

	this.newRecord = function() {
		$.getJSON('/import', function(data) {
			alert(data);
		});
	};
	*/



