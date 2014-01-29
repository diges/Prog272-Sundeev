/**
 * @author Dmitry
 */


function myObject() {
	$("#pr1").html("This sentence added by jQuery");
	
	$("#bt1").click(foo);
	
	function foo() {
		console.log("foo");
		$("#pr2").html("Hourayyy!!!");
	}
}


$(document).ready(function() { 
    myObject();
});