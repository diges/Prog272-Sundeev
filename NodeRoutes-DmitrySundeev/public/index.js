/**
 * @author Dmitry
 */

var Converter = (function(){
	
	// Constructor
	function Converter(){
		$("#btCalc").click(Miles);
	}
	
	var Feet = function() {
		var Result = $('#results');
		Result.load('/Feet', function(response, status, xhr) {
			if (status == "error") {
				nineResult.html("Error: <strong>" + xhr.statusText + "</strong>");
			}
		});
	};
	
	var Miles = function() {
		var miles = $("#inputBox").val();

		$.ajax({
			url : "/miles",
			type : "GET",
			data : {
				"par1" : miles,
			},
			dataType : "json",
			success : function(data) {					
				$("#results").html(data.result);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	};
	
	
});




$(document).ready(function(){
	new Converter();
});

