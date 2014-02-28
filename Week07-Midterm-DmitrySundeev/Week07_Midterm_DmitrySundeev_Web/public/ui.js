var MongoData.routes = (function() { 'use strict';
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
});
