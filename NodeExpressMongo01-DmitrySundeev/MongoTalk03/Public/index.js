function MyObj() {
	
	var that=this;
	var max=0;
	
	this.bt1= function (){
		var id=parseInt($("#dataID").val());
		if ((id<=0)||(isNaN(id))) {id=1;$("#dataID").val(1)}
		else if (id>(max)) {id=255;$("#dataID").val(255)}
		console.log(parseInt($("#dataID").val()) );
		that.getData(id-1);
	};
	
	this.getData = function (id) {
	  $.getJSON('/read', function(data) {
			var firstName = "<p>First Name: <span>" + data[id].firstName + "</span></p>";
			var lastName = "<p>Last Name: <span>" + data[id].lastName + "</span></p>";
			var address = "<p>Address: <span>" + data[id].Address + "</span></p>";
			$("#output").html(firstName + lastName + address);
		  
			//$("#output").append('<p>' + JSON.stringify(data[id]) + '</p>');
	  });
	};
	
	this.getAllData = function () {
		$.getJSON('/read', function(data) {
			max=data.length;
			//console.log(data);
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
}


$(document).ready(function() {

	var myObj = new MyObj();
	myObj.getAllData();
	myObj.getData(0);
	$("#bt1").click(myObj.bt1);
	
});
