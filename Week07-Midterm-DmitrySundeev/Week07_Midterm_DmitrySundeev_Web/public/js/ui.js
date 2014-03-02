MongoData.interface = new (function() { 'use strict';
	
		
	var readDataToCombo = function() {
		MongoData.routes.readData(function(results) {
			console.log(results);
			//$("#resultsDebug").empty();
			$("#select").empty();
			for (var i = 0; i < results.length; i++) {
					$("#select").append('<option id="'+ results[i]._id + '">' + results[i].title + '</option>');
					//$("#resultsDebug").append('<li>' + JSON.stringify(results[i]) + '</li>');
			}
		});
		
	};
	
	
	var queryFilteredByCombo = function () {
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!==undefined)
		{
			MongoData.routes.queryFilteredCombo(mID, function(data) {
				console.log(data);
				displayData(data);
			});
		}
	};
	
	var DeleteById = function () {
		var mID = $("#select").find('option:selected').attr('id');
		console.log(mID);
		
		if (mID!==undefined)
		{
			MongoData.routes.DeleteByIdRoute(mID, function(data) {
				console.log(data);
				
				$('#dataDisplay').empty();
				console.log("Deleted");
				//readDataToCombo();
			});
		}
	};
	
	
	var queryFilteredByText = function () {
		var url = $("#txtFilter").val();
		console.log(url);
		MongoData.routes.queryFiltered(url,function(data) {
			//MongoData.mongoData = data;
			console.log(data);
			displayData(data);
		});
		
	};
	
	var displayData = function(Data) {
		
		$('#dataDisplay').empty();
		var Datalength=Data.length;
		
		//var string="<div id='countTotal'>Total retrived from DB: "+Datalength+"</div>";
		var string="<p id='countTotal'>Total retrived from DB: "+Datalength+"</p>";
		$('#dataDisplay').html(string);
		
		
		for (var i = 0; i < Datalength; i++)
		{
			string=$('#dataDisplay').html();
			string+="<div>";
				string+="<p><span id='author'>"+Data[i].author+"</span></p>";
				string+="<p><span id='title'>"+Data[i].title+"</span></p>";
				string+="<p><span id='content'>"+Data[i].content+"</span></p>";
			string+="</div>";
			
			$('#dataDisplay').html(string);
		}
				

	};
	
	
	
	
	var addNew = function(){
		$("#AddNewDiv").css("display", "block");
	};
	
	var addNewSubmit = function () {
		if (($("#txtAuthor").val()!=="") && ($("#txtTitle").val()!=="")) MongoData.routes.add(submitNewObj());
		$("#txtAuthor").val("");
		$("#txtTitle").val("");
		$("#txtKeyWords").val("");
		$("#txtContent").val("");
		$("#AddNewDiv").css("display", "none");
		$('#dataDisplay').empty();
		
	};
	
	var submitNewObj = function () {
		var jsonObj="{ " +
			"\"author\":\""+$("#txtAuthor").val()+"\", " +
			"\"title\":\""+$("#txtTitle").val()+"\", " +
			"\"keywords\":["+MongoData.func.wrapInQuotes($("#txtKeyWords").val())+"], " +
			"\"content\":\""+$("#txtContent").val() +
			"\"}";
		console.log(jsonObj);
		return jsonObj;
	};
	
	
	this.init  = function() {		
		$("#readAll").click(readDataToCombo);
		$("#AddNew").click(addNew);
		$("#btSubmitNewPoem").click(addNewSubmit);
		$("#btFilter").click(queryFilteredByText);
		$("#btComboSelect").click(queryFilteredByCombo);
		$("#btComboDelete").click(DeleteById);
		$("#ImportReccords").click(MongoData.routes.addFromFile);
	};
	
})();

$(document).ready(function() {	'use strict';
	MongoData.interface.init();		 
});
