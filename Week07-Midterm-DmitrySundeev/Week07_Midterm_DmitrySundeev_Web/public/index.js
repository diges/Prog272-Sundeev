var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(loadData);
		$("#btFilter").click(queryFiltered);
		$("#showData").click(showData);
		$("#ImportReccords").click(newRecord);
	}

	var displayData = function() {
		
		$('#dataDisplay').empty();
		
		var string="<div id='countTotal'>Total retrived from DB: "+mongoData.length+"</div>";
		$('#dataDisplay').html(string);
		
		
		for (var index = 0; index < mongoData.length; index++)
		{
			string=$('#dataDisplay').html();
			string+="<div>";
				string+="<p><span id='author'>"+mongoData[index].author+"</span></p>";
				string+="<p><span id='title'>"+mongoData[index].title+"</span></p>";
				string+="<p><span id='content'>"+mongoData[index].content+"</span></p>";
			string+="</div>";
			
			$('#dataDisplay').html(string);
		}
				

	};
	
	var loadData = function() {
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
			displayData(0);
			$("#resultsDebug").empty();
			for (var i = 0; i < data.length; i++) {
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
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
			$("#resultsDebug").empty();
			for (var i = 0; i < data.length; i++) {
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	var queryTwo = function() {
		$.getJSON('/readfilter', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#resultsDebug").empty();
			for (var i = 0; i < data.length; i++) {
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
