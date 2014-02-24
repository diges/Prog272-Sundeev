var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(loadData);
		$("#btFilter").click(queryFiltered);
		$("#showData").click(showData);
		$("#ImportReccords").click(newRecord);
	}

	var displayRecord = function(index) {
		$('#firstName').html(mongoData[index].firstName);
		$('#lastName').html(mongoData[index].lastName);
		$('#address').html(mongoData[index].address);
		$('#city').html(mongoData[index].city);
		$('#state').html(mongoData[index].state);
		$('#zip').html(mongoData[index].zip);
	};
	
	var loadData = function() {
		$.getJSON('/readAll', function(data) {
			//mongoData = data;
			console.log(data);
			$("#results").empty();
			$("#select").empty();
			for (var i = 0; i < data.length; i++) {
				$("#select").append('<option id="'+ data[i]._id + '">' + data[i].title + '</option>');
				$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	var queryFiltered = function() {
		var url = $("#txtFilter").val();
		
		$.getJSON('/keyword/'+url, function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#results").empty();
			for (var i = 0; i < data.length; i++) {
				$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	
	
	

	var showData = function() {
		var index = $("#userIndex").val();
		displayRecord(index);
	};
	
	var newRecord = function() {
		$.getJSON('/import', function(data) {
			alert(data);
		});
	};

	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#results").empty();
			for (var i = 0; i < data.length; i++) {
				$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	var queryTwo = function() {
		$.getJSON('/readfilter', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#results").empty();
			for (var i = 0; i < data.length; i++) {
				$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
