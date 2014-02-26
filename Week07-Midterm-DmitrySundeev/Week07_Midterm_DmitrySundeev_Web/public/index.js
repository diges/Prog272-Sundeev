var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(loadData);
		$("#btFilter").click(queryFiltered);
		$("#btComboSelect").click(queryFilteredCombo);
		$("#ImportReccords").click(newRecord);
	}

	var displayData = function(Datalength) {
		
		$('#dataDisplay').empty();
		
		//var string="<div id='countTotal'>Total retrived from DB: "+Datalength+"</div>";
		var string="<p id='countTotal'>Total retrived from DB: "+Datalength+"</p>";
		$('#dataDisplay').html(string);
		
		
		for (var i = 0; i < Datalength; i++)
		{
			string=$('#dataDisplay').html();
			string+="<div>";
				string+="<p><span id='author'>"+mongoData[i].author+"</span></p>";
				string+="<p><span id='title'>"+mongoData[i].title+"</span></p>";
				string+="<p><span id='content'>"+mongoData[i].content+"</span></p>";
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
			displayData(data.length);
			$("#resultsDebug").empty();
			for (var i = 0; i < data.length; i++) {
				$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	
	var queryFilteredCombo = function() {
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!=undefined)
		{
			$.getJSON('/mongoid/'+mID, function(data) {
				//mongoData = JSON.parse(data);
				mongoData = data;
				console.log(mongoData);
				var l=1;
				displayData(l);
				$("#resultsDebug").empty();
				for (var i = 0; i < 1; i++) {
					$("#resultsDebug").append('<li>' + JSON.stringify(data[i]) + '</li>');
				}
			});
		}
		
		
		
	};
	

	var newRecord = function() {
		$.getJSON('/import', function(data) {
			alert(data);
		});
	};


	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var mongoData = new MongoData();

});
