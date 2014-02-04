function MyObj() {
	
	var that=this;
	
	this.bt1= function (){
			that.getData(0);
			that.getHtml(1);
	};
	
	this.bt2= function (){
			that.getData(1);
			that.getHtml(2);
	};
	this.bt3= function (){
			that.getData(2);
			that.getHtml(3);
	};

	this.getData = function(id) {
		$.getJSON('index.json', function(data) {
			var info = "<p>" + data[id].info + "</p>";
			var born = "<p>Born: " + data[id].Born + "</p>";
			var died = "<p>Died: " + data[id].Died + "</p>";
			$("#resultDiv").html(info + born + died);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};

	this.getHtml = function(id) {
		var pr="#pr"+id;
		$('#name').load("MyFile.html "+pr, function() {
			console.log("Load was performed!");
		});
	};

}


$(document).ready(function() {
	var myObj = new MyObj();
	$("#bt1").click(myObj.bt1);
	$("#bt2").click(myObj.bt2);
	$("#bt3").click(myObj.bt3);
	
	myObj.getData(0);
	myObj.getHtml(1);
	

});
