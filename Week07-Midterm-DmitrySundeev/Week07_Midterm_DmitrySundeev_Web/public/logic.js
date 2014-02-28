var MongoData.routes =  new function(data) { 'use strict';

	var mongoData = data;
	
	
	var readData = function() {
		$.getJSON('/readAll', function(data) {
			console.log(data);
			$("#resultsDebug").empty();
			$("#select").empty();
			for (var i = 0; i < data.length; i++) {
				$("#select").append('<option id="'+ data[i]._id + '">' + data[i].title + '</option>');
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	var queryFiltered = function() {
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
	
	
	
	var queryFilteredCombo = function() {
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
	
	
	
	var DeleteById = function() {
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!==undefined)
		{

				$.ajax({
					url : "/mongoid/"+mID,
					type : "DELETE",
					data : {
						"id":mID
					},
					dataType : "json",
					success : function(data) {
						readData();											
						console.log(data);
						//$("#addResultPost").html(operandA + " + " + operandB + " = " + data.result);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(jqXHR.responseText);
						console.log(textStatus);
						console.log(errorThrown);
						readData();
					}
				});
		}
	};
	
	
	

	var newRecord = function() {
		$.getJSON('/import', function(data) {
			alert(data);
		});
	};

};

