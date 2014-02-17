/**
 * @author Dmitry
 */

var Converter = (function(){
	
	// Constructor
	function Converter(){
		$("#btCalc").click(interface);
		$("#l1").html('Foot in one Mile');
		$("#l2").html('Foot in {X} Miles (GET)');
		$("#l3").html('Circumference of a circle by giver radius (POST)');
		$("#r1").attr('checked', true);
		$("#inputBox").val(0);
	}
	
	var interface  = function (){
		
		var id = $("input[name=radio]:checked").attr('id');
		console.log(id);
		if (id=='r1') Feet()
		else if (id=='r2') Miles()
		else if (id=='r3') Circumference();
		
	};
	
	var Feet = function() {
		
		var fResult = $('#results');
		$.get('/feetinmile', function(data) {
			fResult.html("Feet in Mile: <strong>" + data.result + "</strong>");
		});
	};
	
	
	var Miles = function() {
		var miles = $("#inputBox").val();
		if (miles=='') miles=0;

		$.ajax({
			url : "/feetinmiles",
			type : "GET",
			data : {
				"miles" : miles,
			},
			dataType : "json",
			success : function(data) {					
				$("#results").html("Foot in "+miles+" miles: <strong>" + data.result + "</strong>");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	};
	
	var Circumference = function() {
		var radius = $("#inputBox").val();
		if (radius=='') radius=0;

		$.ajax({
			url : "/circumference",
			type : "POST",
			data : {
				"radius" : radius
			},
			dataType : "json",
			success : function(data) {					
				$("#results").html("Circumference of a circle where its diameter is " + radius + " = <strong>" + data.result+ "</strong>");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	};
	
	
	
	return Converter;
	
	
}());




$(document).ready(function(){
	new Converter();
});

