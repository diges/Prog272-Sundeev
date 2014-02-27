var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(readData);
		$("#btFilter").click(queryFiltered);
		$("#btComboSelect").click(queryFilteredCombo);
		$("#ImportReccords").click(newRecord);
		$("#AddNew").click(addNew);
		$("#btSubmitNewPoem").click(addNewSubmit);
		$("#btComboDelete").click(DeleteById);
		
	}

	var displayData = function() {
		
		$('#dataDisplay').empty();
		var Datalength=mongoData.length;
		
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
	
	var addNew = function(){
		$("#AddNewDiv").css("display", "block");
	};
	
	var addNewSubmit = function () {
		submitNewItem();
		$("#txtAuthor").val("");
		$("#txtTitle").val("");
		$("#txtKeyWords").val("");
		$("#txtContent").val("");
		$("#AddNewDiv").css("display", "none");
	};
	
	var submitNewItem = function () {
		var jsonObj="{ " +
			"'author':'"+$("#txtAuthor").val()+"', " +
			"'title':'"+$("#txtTitle").val()+"', " +
			"'keywords':["+$("#txtKeyWords").val()+"], " +
			"'content':'"+$("#txtContent").val() +
			"'}";
		console.log(jsonObj);
	};
	
	
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


	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var mongoData = new MongoData();

});
