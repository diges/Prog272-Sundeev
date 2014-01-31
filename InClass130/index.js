function MyObj() {

	this.getData = function() {
		$.getJSON('index.json', function(data) {
			var result = "<p>Result: " + data[0].firstName + "</p>";
			var value = "<p>Value: " + data.value + "</p>";
			$("#resultDiv").html(result + value);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};

	this.getHtml = function() {
		$('#resultDiv02').load("MyFile.html #pr1", function() {
			console.log("Load was performed!");
		});
	};

}


$(document).ready(function() {
	var myObj = new MyObj();
	myObj.getData();
	myObj.getHtml();
});
